var exe = require("../model/conn.js");

exports.getHome = async (req, res) => {
  try {
    var sql = `SELECT about_image, about_desc FROM about LIMIT 1`;
    var aboutData = await exe(sql, []);

    var sql2 = `SELECT * FROM achievements`;
    var acheivementsData = await exe(sql2, []);

    var sql3 = `SELECT * FROM faculty LIMIT 3`;
    var facultyData = await exe(sql3, []);

    var sql4 = `SELECT college_image, college_name FROM general_info LIMIT 1`;
    var general_info = await exe(sql4, []);

    var packet = { aboutData, acheivementsData, facultyData, general_info };

    res.render("user/home", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// About
exports.getAbout = async (req, res) => {
  try {
    var sql = `SELECT college_name FROM general_info`;
    var generalData = await exe(sql, []);

    var sql2 = `SELECT * FROM about`;
    var aboutData = await exe(sql2, []);

    var sql3 = `SELECT * FROM accreditations`;
    var accreditationData = await exe(sql3, []);
    
    var packet = { generalData , aboutData , accreditationData };
    res.render("user/about", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// courses
exports.getCourses = async (req, res) => {
  try {
    var sql = `SELECT * FROM courses ORDER BY course_level, course_type, course_name`;
    var coursesData = await exe(sql, []);
    res.render("user/courses", { coursesData });
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Admissions
exports.getAdmissions = async (req, res) => {
  try {
    let sql = `SELECT * FROM admission_steps`;
    let stepsData = await exe(sql, []);

    let sql2 = `SELECT * FROM eligibility_criteria`;
    let eligibilityData = await exe(sql2, []);

    let packet = { stepsData, eligibilityData };
    res.render("user/admissions", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Admission Form
exports.postSaveAdmissions = async (req, res) => {
  try {
    let {
      applicant_full_name,
      applicant_email,
      applicant_mobile,
      highest_qualification,
      course_applied_for,
      academic_score,
      applicant_address,
 
    } = req.body;
    let sql = `INSERT INTO admissions (applicant_full_name, applicant_email, applicant_mobile, highest_qualification , course_applied_for , academic_score , applicant_address) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await exe(sql, [
      applicant_full_name,
      applicant_email,
      applicant_mobile,
      highest_qualification,
      course_applied_for,
      academic_score,
      applicant_address,
    ]);
    res.redirect("/admissions");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Faculty
exports.getFaculty = async (req, res) => {
  try {
    let sql = `SELECT * FROM faculty`;
    let facultyData = await exe(sql, []);
    let packet = { facultyData };
    res.render("user/faculty", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Facilities
exports.getFacilities = async (req, res) => {
  try {
    let sql = `SELECT * FROM facilities`;
    let facilityData = await exe(sql, []);

    let sql2 = `SELECT * FROM gallery`;
    let galleryData = await exe(sql2, []);

    let packet = { facilityData, galleryData };
    res.render("user/facilities", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Contact
exports.getContact = async (req, res) => {
  try {
    let sql = `SELECT * FROM general_info`;
    let generalData = await exe(sql, []);

    let packet = { generalData: generalData[0] };
    res.render("user/contact", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Enquiry
exports.postEnquiry = async (req, res) => {
  try {
    let { fullname, email, message } = req.body;
    let sql = `INSERT INTO enquiries (fullname, email, message) VALUES (?, ?, ?)`;
    await exe(sql, [fullname, email, message]);
    res.redirect("/contact");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};
