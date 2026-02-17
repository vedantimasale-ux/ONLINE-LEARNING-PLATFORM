const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title: String,
    video: String
});

module.exports = mongoose.model("Course", CourseSchema);
