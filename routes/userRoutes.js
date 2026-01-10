var express = require('express');
const router = express.Router();

var userController = require("../controllers/userController");


// Home
router.get("/", userController.getHome);

// About
router.get("/about", userController.getAbout);

// Courses
router.get("/courses", userController.getCourses);

// Admissions
router.get("/admissions", userController.getAdmissions);

// Faculty
router.get("/faculty", userController.getFaculty);

// College Life
router.get("/collegelife", userController.getCollegeLife);

// Contact
router.get("/contact", userController.getContact);



module.exports = router;
