const express = require("express");
const cohortController = require("../controllers/cohortController");

const router = express.Router();

router("/").get(cohortController.getAllCohorts).post(cohortController.createCohort);

router("/:id").get(cohortController.getCohort).patch(cohortController.updateCohort).delete(cohortController.deleteCohort);

module.exports = router;