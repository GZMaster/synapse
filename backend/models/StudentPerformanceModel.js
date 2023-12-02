const mongoose = require("mongoose");

const studentPerformanceSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: [true, "Please tell us your score!"],
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
})

const StudentPerformance = mongoose.model("StudentPerformance", studentPerformanceSchema);

module.exports = StudentPerformance;