// Dependencies
const express = require("express");
const app = express();
const PORT = 4001; //UPDATE YOUR PORT NUMBER
const mongoose = require("mongoose");
const Tweet = require("./models/tweet.js");

// Database configuration
// UPDATE YOUR URL WITH YOUR USERNAME AND PASSWORD
const DATABASE_URL = "mongodb+srv://admin:abc1234@cluster1.wyo9mrs.mongodb.net/?retryWrites=true&w=majority";
const db = mongoose.connection;

// Connect to MongoDB Atlas
mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database Connection Error/Success
// Define callback functions for various events
db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongo connected"));
db.on("disconnected", () => console.log("mongo disconnected"));

// Middleware
// Body parser middleware: it creates req.body
app.use(express.urlencoded({ extended: false }));

// Routes / Controllers
// Index
app.get("/tweets", (req, res) => {
  Tweet.find({}, (error, foundTweets) => {
    res.send(foundTweets);
  });
});

// New

// Delete
app.delete("/tweets/:id", (req, res) => {
  Tweet.findByIdAndDelete(req.params.id, (error, deletedTweet) => {
    res.send({ success: true });
  });
});

// Update
app.put("/tweets/:id", (req, res) => {
  Tweet.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (error, updatedTweet) => {
      res.send(updatedTweet);
    }
  );
});

// Create
app.post("/tweets", (req, res) => {
  Tweet.create(req.body, (error, createdTweet) => {
    res.send(createdTweet);
  });
});

// Show
app.get("/tweets/:id", (req, res) => {
  Tweet.findById(req.params.id, (error, foundTweet) => {
    res.send(foundTweet);
  });
});

// Listener
app.listen(PORT, () => console.log(`express is listening on port: ${PORT}`));
