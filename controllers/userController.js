var exe = require('../model/conn.js');

exports.getHome = async (req, res) => {
    try {
        res.render("user/home");
    } catch (err) {
        console.error(err);
        res.status(500).render("err",{err:err.message});
    }
}

// About
exports.getAbout = async (req, res) => {
    try {
        res.render("user/about");
    } catch (err) {
        console.error(err);
        res.status(500).render("err",{err:err.message});
    }
}

// courses 
exports.getCourses = async (req, res) => {
    try {
        res.render("user/courses");
    } catch (err) {
        console.error(err);
        res.status(500).render("err",{err:err.message});
    }
}

// Faculty
exports.getFaculty = async (req, res) => {
    try {
        res.render("user/faculty");
    } catch (err) {
        console.error(err);
        res.status(500).render("err",{err:err.message});
    }
}

// Admissions
exports.getAdmissions = async (req, res) => {
    try {
        res.render("user/admissions");
    } catch (err) {
        console.error(err);
        res.status(500).render("err",{err:err.message});
    }
}

// College Life

exports.getCollegeLife = async (req, res) => {
    try {
        res.render("user/collegelife");
    } catch (err) {
        console.error(err);
        res.status(500).render("err",{err:err.message});
    }
}


// Contact
exports.getContact = async (req, res) => {
    try {
        res.render("user/contact");
    } catch (err) {
        console.error(err);
        res.status(500).render("err",{err:err.message});
    }
}



