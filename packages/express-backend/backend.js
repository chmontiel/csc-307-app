import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/users.js"; // Import the User model

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/users_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log(err));

// Endpoint to retrieve a user by their ID
app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to retrieve users
app.get("/users", async (req, res) => {
  try {
    const { name, job } = req.query;
    let query = {};
    if (name) query.name = name;
    if (job) query.job = job;

    const users = await User.find(query);
    res.send(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Endpoint to add a new user
app.post("/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Endpoint to delete a user by their ID
app.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).send("User not found");
    }
    res.send(deletedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
