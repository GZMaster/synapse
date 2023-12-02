    const mongoose = require("mongoose");

const cohortSchema = new mongoose.Schema({
    cohortName: {
        type: String,
        required: [true, "Please tell us your cohort name!"],
        trim: true,
    },
    cohortNumber: {
        type: Number,
        required: [true, "Please tell us your cohort number!"],
    },
    Course_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
})

const Cohort = mongoose.model("Cohort", cohortSchema);

module.exports = Cohort;