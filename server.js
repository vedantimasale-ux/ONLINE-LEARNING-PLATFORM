const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
const quizzes = [
    {
        question:"What is HTML?",
        options:["Programming","Markup","Database"],
        answer:"Markup"
    }
];

app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose.connect("mongodb://127.0.0.1:27017/onlineLearning")
.then(()=> console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/course", require("./routes/course"));
app.get("/api/quiz", (req, res) => {
    res.json(quizzes);
});

app.listen(5000, ()=> {
    console.log("Server running on port 5000");
});
