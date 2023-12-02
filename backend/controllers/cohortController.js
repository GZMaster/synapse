const Cohort = require("../models/CohortModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllCohorts = catchAsync(async (req, res, next) => {
    const cohorts = await Cohort.find();
    res.status(200).json({
        status: "success",
        results: cohorts.length,
        data: {
        cohorts,
        },
    });
    });

exports.getCohort = catchAsync(async (req, res, next) => {
    const cohort = await Cohort.findById(req.params.id);
    if (!cohort) {
        return next(new AppError("No cohort found with that ID", 404));
    }
    res.status(200).json({
        status: "success",
        data: {
        cohort,
        },
    });
    }
);

exports.createCohort = catchAsync(async (req, res, next) => {
    const newCohort = await Cohort.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
        cohort: newCohort,
        },
    });
    });

exports.updateCohort = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { cohortName, cohortNumber, Course_Id } = req.body;

    const cohort = await Cohort.findByIdAndUpdate(
        id,
        { cohortName, cohortNumber, Course_Id },
        { new: true, runValidators: true }
    );

    if (!cohort) {
        return next(new AppError("No cohort found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
        cohort,
        },
    });
    });

exports.deleteCohort = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const cohort = await Cohort.findByIdAndDelete(id);
    if (!cohort) {
        return next(new AppError("No cohort found with that ID", 404));
    }
    res.status(204).json({
        status: "success",
        data: null,
    });
    });

