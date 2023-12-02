const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, "Please tell us your course name!"],
        trim: true,
    },
    SpecInd: {
        type: Number,
        required: [true, "Please tell us your specialization!"],
    },
})

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;