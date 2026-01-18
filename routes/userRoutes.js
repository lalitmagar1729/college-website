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

// Save Admissions
router.post("/save-admissions", userController.postSaveAdmissions);

// Faculty
router.get("/faculty", userController.getFaculty);

// Facilities
router.get("/facilities", userController.getFacilities);

// Contact
router.get("/contact", userController.getContact);

// Enquiry
router.post("/enquiry", userController.postEnquiry);



module.exports = router;
