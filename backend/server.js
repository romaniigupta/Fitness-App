import "dotenv/config";
import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import Data from "../Model/Registerdata.js";
import Foods from "../Model/Foods.js";

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
let primaryEmail = "";
let secretkey = "izhanbhaikasecret";
let refreshkey = "oneandonlyIzhankirefreshsecretkey";

app.use(
  cors({
    origin: ["http://localhost:5173"], // Allow both production & local development
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

mongoose
  .connect(
    'mongodb+srv://anshika:anshi0903@mern-blog.9mdyusk.mongodb.net/mern-blog?retryWrites=true&w=majority&appName=mern-blog'
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Failed to connect with database: ", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No Token, Access denied" });
  }

  jwt.verify(token, secretkey, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = decodedToken;
    req.email = decodedToken.email; // ✅ Attach email to request
    next();
  });
};


app.post("/refresh-token", async (req, res) => {
  const refresh = req.body.refreshtoken;
  console.log("token : ", refresh);
  if (!refresh) {
    return res.status(401).json({ message: "No refresh token provided" });
  } else {
    jwt.verify(refresh, refreshkey, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      } else {
        const user = await Data.findOne({ email: decoded.email });
        if (!user || user.refreshtoken !== refresh) {
          return res.status(403).json({ message: "Invalid refresh token" });
        } else {
          let token = jwt.sign(
            {
              userId: user.id,
              email: user.email,
            },
            secretkey,
            { expiresIn: "24h" }
          );
          // console.log("worked");
          return res.status(200).json({ token });
        }
      }
    });
  }
});

app.get("/getdata", verifyToken, async (req, res) => {
  try {
    const email = req.email;
    const user = await Data.findOne({ email: email });
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro while fetching data ERROR: ", err });
  }
});

app.get("/store", verifyToken, async (req, res) => {
  try {
    const email = req.email;
    // const array = req.body.array;
    // console.log(array);

    // Make sure we correctly await the findOne method
    const user = await Data.findOne({ email });

    if (user) {
      console.log("User found");

      // Ensure save completes before moving on
      return res.status(200).json(user.array);
    } else {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error storing data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/store", verifyToken, async (req, res) => {
  try {
    const email = req.email;
    const array = req.body.array;
    console.log(array);

    // Make sure we correctly await the findOne method
    const user = await Data.findOne({ email });

    if (user) {
      console.log("User found");
      user.array = array;

      // Ensure save completes before moving on
      await user.save();

      console.log("Data saved successfully");
      return res.status(200).json(array);
    } else {
      console.log("User not found");
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error storing data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const Exercise = mongoose.model(
  "Exercise",
  new mongoose.Schema({
    email: String,
    points: { type: Number, default: 0 }, // ✅ Points added to model
    exercises: {
      squats: { type: Number, default: 0 },
      pushups: { type: Number, default: 0 },
      jumpingJacks: { type: Number, default: 0 },
      crunches: { type: Number, default: 0 },
      lunges: { type: Number, default: 0 },
    },
  })
);

app.post("/api/exercises", verifyToken, async (req, res) => {
  try {
    const email = req.email;
    const { exercise, reps, challengeCompleted } = req.body;

    console.log("Received Data:", { email, exercise, reps, challengeCompleted });

    let user = await Exercise.findOne({ email });

    if (!user) {
      user = new Exercise({ email });
    }

    // ✅ Make sure exercise exists in the schema
    if (!(exercise in user.exercises)) {
      return res.status(400).json({ error: "Invalid exercise type" });
    }

    // ✅ Update reps only if reps > 0
    if (reps > 0) {
      user.exercises[exercise] += reps;
    }

    // ✅ Add points ONLY if reps > 0
    if (challengeCompleted && reps > 0) {
      user.points += 10;
    }

    await user.save();
    res.json({ success: true, message: `${exercise} count updated` });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "Error saving exercise data" });
  }
});




app.get("/api/leaderboard", async (req, res) => {
  try {
    const users = await Exercise.find().sort({ points: -1, "exercises.squats": -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching leaderboard" });
  }
});




app.get("/getfood", verifyToken, async (req, res) => {
  try {
    const foodItems = await Foods.find();
    return res.status(200).json(foodItems);
  } catch (err) {
    return res.status(500).json({ message: "Error occured: ", err });
  }
});

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  Data.findOne({ email })
    .then((user) => {
      try {
        if (!user) {
          return res
            .status(401)
            .json({ message: "The information you entered is not correct" });
        } else {
          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              return res.status(500).send({
                message: "An error occurred during password comparison ERROR: ",
                err,
              });
            }
            if (isMatch) {
              try {
                let token = jwt.sign(
                  {
                    userId: user.id,
                    email: user.email,
                  },
                  secretkey,
                  { expiresIn: "24h" }
                );
                let refreshToken = jwt.sign(
                  {
                    userId: user.id,
                    email: user.email,
                  },
                  refreshkey,
                  { expiresIn: "24h" }
                );
                user.refreshtoken = refreshToken;
                user.save();
                if (!user.height || !user.weight) {
                  return res.status(302).json({
                    success: true,
                    data: {
                      userId: user.id,
                      email: user.email,
                      token: token,
                      refresh: refreshToken,
                    },
                  });
                }
                return res.status(200).json({
                  success: true,
                  data: {
                    userId: user.id,
                    email: user.email,
                    token: token,
                    refresh: refreshToken,
                  },
                });
              } catch (JWSerr) {
                return res.status(500).json({
                  message: "Error occured while generation JWS Token ERROR: ",
                  JWSerr,
                });
              }
            } else {
              return res
                .status(401)
                .send({ message: "The password you entered is incorrect" });
            }
          });
        }
      } catch {
        return res.status(600).json({ message: "A Problem occured" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: "An error occurred", err });
    });
});

app.post("/data", verifyToken, async (req, res) => {
  const email = req.user.email; // from JWT
  const { name, date, gender, weight, weightScale, height, lengthScale } =
    req.body;

  // return res.status(200).json({ email });
  try {
    const user = await Data.findOne({ email: email });

    if (user) {
      console.log("User found");
      user.name = name;
      user.date = date;
      user.gender = gender;
      user.weight = weight;
      user.weightScale = weightScale;
      user.height = height;
      user.lengthScale = lengthScale;

      await user.save();
      return res.status(200).json({ message: "Data saved in DB collection" });
    } else {
      console.log("User not found");
      return res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.error("Unexpected error occurred:", err);
    return res.status(500).json({ message: "Unexpected error occurred", err });
  }
});

app.post("/mode", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await Data.findOne({ email: email });
    if (user) {
      user.mode = req.body.mode;
      await user.save();
      return res.status(200).json({ message: "Saved in DB" });
    } else {
      console.log("User not found");
      return res.status(400).json({ message: "Could not save in DB" });
    }
  } catch (err) {
    return res.status(402).json({ message: "Error occurred: ", err });
  }
});

app.post("/activity", verifyToken, async (req, res) => {
  const email = req.user.email;
  const user = await Data.findOne({ email: email });
  if (user) {
    if (user) {
      user.activity = req.body.activity;
      user.save();
      return res.status(200).json({ message: "Saved in DB" });
    } else {
      console.log("User not found");
      return res.status(400).json({ message: "Could not save in DB" });
    }
  } else {
    return res.status(402).json({ message: "Error occured: ", err });
  }
});

app.post("/goals", verifyToken, async (req, res) => {
  try {
    const email = req.user.email;
    const user = await Data.findOne({ email: email });
    if (user) {
      user.goal = req.body.goal;
      await user.save();
      return res.status(200).json({ message: "Saved in DB" });
    } else {
      console.log("User not found");
      return res.status(400).json({ message: "Could not save in DB" });
    }
  } catch (err) {
    return res.status(402).json({ message: "Error occurred: ", err });
  }
});

app.post("/register", async (req, res) => {
  try {
    const primaryEmail = req.body.email;
    const existingUser = await Data.findOne({ email: primaryEmail });

    if (existingUser) {
      return res.status(503).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(req.body.password, 10);

    const newData = new Data({
      email: req.body.email,
      password: hashpassword,
    });

    await newData.save(); // ✅ Wait for data to be saved

    res.status(201).json({ success: true, email: req.body.email }); // ✅ Send email in response
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ message: "Error saving user", error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
