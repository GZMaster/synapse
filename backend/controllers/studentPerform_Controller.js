const dotenv = require("dotenv");
const { promisify } = require("util");
const Cohort = require("../models/CohortModel");
const User = require("../models/UserModel");
const Course = require("../models/CourseModel");

dotenv.config({ path: "./config.env" });