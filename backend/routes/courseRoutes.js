const express = require("express");
const courseController = require("../controllers/courseController");

const router = express.Router();

router("/").get(courseController.getAllCourses).post(courseController.createCourse);

router("/:id").get(courseController.getCourse).patch(courseController.updateCourse).delete(courseController.deleteCourse);

module.exports = router;