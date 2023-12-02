const { promisify } = require("util");
const Course = require("../models/Course");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllCourses = catchAsync(async (req, res, next) => {
    const courses = await Course.find();
    
    res.status(200).json({
        status: "success",
        results: courses.length,
        data: {
        courses,
        },
    });
});

exports.createCourse = catchAsync(async (req, res, next) => {
    const { courseName, SpecInd } = req.body;

    const newCourse = await Course.create({
        courseName,
        SpecInd,
    });
    
    res.status(201).json({
        status: "success",
        data: {
        course: newCourse,
        },
    });
});

exports.getCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }
    
    res.status(200).json({
        status: "success",
        data: {
        course,
        },
    });
});

exports.updateCourse = catchAsync(async (req, res, next) => {
    const { courseName, SpecInd } = req.body;

    const course = await Course.findByIdAndUpdate(req.params.id, {
        courseName,
        SpecInd,
    }, {
        new: true,
        runValidators: true,
    });

    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
        course,
        },
    });

});

const deleteCourse = catchAsync(async (req, res, next) => {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (!course) {
        return next(new AppError("No course found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});


