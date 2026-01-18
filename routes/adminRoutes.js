var express = require('express');
const router = express.Router();

var adminController = require('../controllers/adminController.js');

// Middleware to check if admin is logged in
function isLoggIn(req, res, next) {
    if (req.session.admin) {
        next();
    } else {
        res.redirect('/admin/login');
    }
  }

// Admin Login Page
router.get("/login", adminController.getLogin);

// Admin Login Post
router.post("/login", adminController.postLogin);

// Dashboard
router.get("/", isLoggIn, adminController.getDashboard);

// Information
router.get("/information", isLoggIn, adminController.getInformation);

// Edit Information
router.get("/edit-information/:id", isLoggIn, adminController.getEditInformation);

// Update Information
router.post("/update-information", isLoggIn, adminController.postUpdateInformation);

// About
router.get("/about", isLoggIn, isLoggIn, adminController.getAbout);

// Edit About
router.get("/edit-about", isLoggIn, adminController.getEditAbout);

// Update About
router.post("/update-about", isLoggIn, adminController.postUpdateAbout);

// Edit About Vision Mission
router.get("/edit-about-vision-mission", isLoggIn, adminController.getEditAboutVisionMission);

// Update About Vision Mission
router.post("/update-about-vision-mission", isLoggIn, adminController.postUpdateAboutVisionMission);

// Edit About Principal
router.get("/edit-about-principal", isLoggIn, adminController.getEditAboutPrincipal);

// Update About Principal
router.post("/update-about-principal", isLoggIn, adminController.postUpdateAboutPrincipal);

// Courses
router.get("/courses", isLoggIn, adminController.getCourses);

// Save Courses
router.post("/save-courses", isLoggIn, adminController.postCourses);

// Edit Courses
router.get("/edit-courses/:id", isLoggIn, adminController.getEditCourses);

// Update Courses
router.post("/update-courses", isLoggIn, adminController.postUpdateCourses);

// Delete Courses
router.get("/delete-courses/:id", isLoggIn, adminController.getDeleteCourses);

// Admission Process
router.get("/process", isLoggIn, adminController.getProcess);

// Save Process
router.post("/save-process", isLoggIn, adminController.postSaveProcess);

// Edit Process
router.get("/edit-process/:id", isLoggIn, adminController.getEditProcess);

// Update Process
router.post("/update-process", isLoggIn, adminController.postUpdateProcess);

// Delete Process
router.get("/delete-process/:id", isLoggIn, adminController.getDeleteProcess);

// Save Eligibility
router.post("/save-eligibility", isLoggIn, adminController.postSaveEligibility);

// Admissions List
router.get("/admissions", isLoggIn, adminController.getAdmissions);

// Achievements and Accreditations
router.get("/achievements", isLoggIn, adminController.getAchievements);

// Save Achievement
router.post("/save-achievement", isLoggIn, adminController.postSaveAchievement);

// Edit Achievement
router.get("/edit-achievement/:id", isLoggIn, adminController.getEditAchievement);

// Update Achievement
router.post("/update-achievement", isLoggIn, adminController.postUpdateAchievement);

// Delete Achievement
router.get("/delete-achievement/:id", isLoggIn, adminController.getDeleteAchievement);

// Save Accreditations
router.post("/save-accreditation", isLoggIn, adminController.postSaveAccreditation);

// Edit Accreditation
router.get("/edit-accreditation/:id", isLoggIn, adminController.getEditAccreditation);

// Update Accreditation
router.post("/update-accreditation", isLoggIn, adminController.postUpdateAccreditation);

// Delete Accreditation
router.get("/delete-accreditation/:id", isLoggIn, adminController.getDeleteAccreditation);

// Faculty
router.get("/faculty", isLoggIn, adminController.getFaculty);

// Save Faculty
router.post("/save-faculty", isLoggIn, adminController.postSaveFaculty);

// Edit Faculty
router.get("/edit-faculty/:id", isLoggIn, adminController.getEditFaculty);

// Update Faculty
router.post("/update-faculty", isLoggIn, adminController.postUpdateFaculty);

// Delete Faculty
router.get("/delete-faculty/:id", isLoggIn, adminController.getDeleteFaculty);

// Facilities
router.get("/facilities", isLoggIn, adminController.getFacilities);

// Save Facility
router.post("/save-facility", isLoggIn, adminController.postSaveFacility);

// Edit Facility
router.get("/edit-facility/:id", isLoggIn, adminController.getEditFacility);

// Update Facility
router.post("/update-facility", isLoggIn, adminController.postUpdateFacility);

// Delete Facility
router.get("/delete-facility/:id", isLoggIn, adminController.getDeleteFacility);

// Gallery
router.get("/gallery", isLoggIn, adminController.getGallery);

// Save Gallery
router.post("/save-gallery", isLoggIn, adminController.postSaveGallery);

// Delete Gallery
router.get("/delete-gallery/:id", isLoggIn, adminController.getDeleteGallery);

// Enquiry
router.get("/enquiry", isLoggIn, adminController.getEnquiry);

// Admin Logout
router.get("/logout", adminController.getLogout);


module.exports = router;
