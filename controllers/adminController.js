// Database
var fs = require("fs");
var path = require("path");
var exe = require("../model/conn.js");
var nodemailer = require("nodemailer");
const { error } = require("console");

// Admin Login Page
exports.getLogin = async (req, res) => {
  try {
    res.render("admin/login");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Admin Login Post
exports.postLogin = async (req, res) => {
  try {
    var { email, password } = req.body;
    
    var sql = "SELECT * FROM admin WHERE email=? ";
    var adminData = await exe(sql, [email]);

    if (adminData.length > 0) {
      if (adminData[0].password === password) {
        req.session.admin = adminData[0];
      } else {
        return res.render("admin/login", { err: "Invalid Password" });
      }
    } else {
      return res.render("admin/login", { err: "Invalid Email" });
    }
    res.redirect("/admin");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Admin Dashboard
exports.getDashboard = async (req, res) => {
  try {
    res.render("admin/dashboard");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Information
exports.getInformation = async (req, res) => {
  try {
    var sql = `SELECT * FROM general_info`;
    var infoData = await exe(sql);
    var packet = { infoData };
    res.render("admin/information", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Edit Information
exports.getEditInformation = async (req, res) => {
  try {
    var info_id = req.params.id;
    var sql = `SELECT * FROM general_info WHERE info_id=?`;
    var infoData = await exe(sql, [info_id]);
    var packet = { infoData };
    res.render("admin/edit-information", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

exports.postUpdateInformation = async (req, res) => {
  try {
    var {
      info_id,
      college_name,
      college_phone,
      college_email,
      college_address,
      college_map,
      college_facebook,
      college_instagram,
      college_youtube,
    } = req.body;

    var replacemap = college_map
      .replace(/\sheight="[^"]*"/gi, "")
      .replace(/\swidth="[^"]*"/gi, "");

    let filename = null;

    if (req.files && req.files.college_image) {
      const oldImageData = await exe(
        `SELECT college_image FROM general_info WHERE info_id=?`,
        [info_id]
      );

      const oldFilename = oldImageData[0]?.college_image;

      if (oldFilename) {
        const oldPath = path.join("public/images", oldFilename);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      filename = Date.now() + "-" + req.files.college_image.name;
      await req.files.college_image.mv("public/images/" + filename);
    }

    let sql = `
      UPDATE general_info SET
        college_name=?,
        college_phone=?,
        college_email=?,
        college_address=?,
        college_map=?,
        college_facebook=?,
        college_instagram=?,
        college_youtube=?
    `;

    let values = [
      college_name,
      college_phone,
      college_email,
      college_address,
      replacemap,
      college_facebook,
      college_instagram,
      college_youtube,
    ];

    if (filename) {
      sql += ", college_image=?";
      values.push(filename);
    }

    sql += " WHERE info_id=?";
    values.push(info_id);

    await exe(sql, values);

    res.redirect("/admin/information");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// About
exports.getAbout = async (req, res) => {
  try {
    var sql = `SELECT * FROM about ORDER BY about_id DESC LIMIT 1`;
    var aboutData = await exe(sql);
    var packet = { aboutData };
    res.render("admin/about", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Edit About
exports.getEditAbout = async (req, res) => {
  try {
    var sql = `SELECT about_image, about_title, about_desc FROM about ORDER BY about_id ASC LIMIT 1`;
    var aboutone = await exe(sql);
    var packet = { aboutone };
    res.render("admin/edit-about", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Update About
exports.postUpdateAbout = async (req, res) => {
  try {
    var { about_title, about_desc } = req.body;

    if (req.files && req.files.about_image) {
      let filename = Date.now() + "-" + req.files.about_image.name;
      req.files.about_image.mv("public/images/" + filename);
      var sql = `UPDATE about SET about_image=?, about_title=?, about_desc=? WHERE about_id=19`;
      await exe(sql, [filename, about_title, about_desc]);
    } else {
      var sql = `UPDATE about SET about_title=?, about_desc=? WHERE about_id=19`;
      await exe(sql, [about_title, about_desc]);
    }
    res.redirect("/admin/about");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Edit About Vision Mission
exports.getEditAboutVisionMission = async (req, res) => {
  try {
    var sql = `SELECT vision, mission FROM about WHERE about_id=19`;
    var aboutData = await exe(sql);
    var packet = { aboutData };
    res.render("admin/edit-about-vision-mission", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Update About Vision Mission
exports.postUpdateAboutVisionMission = async (req, res) => {
  try {
    var { vision, mission } = req.body;
    var sql = `UPDATE about SET vision=?, mission=? WHERE about_id=19`;
    await exe(sql, [vision, mission]);
    res.redirect("/admin/about");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Edit About Principal
exports.getEditAboutPrincipal = async (req, res) => {
  try {
    var sql = `SELECT principal_image, principal_name, principal_msg FROM about WHERE about_id=19`;
    var aboutData = await exe(sql);
    var packet = { aboutData };
    res.render("admin/edit-about-principal", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Update About Principal
exports.postUpdateAboutPrincipal = async (req, res) => {
  try {
    var { principal_name, principal_msg } = req.body;

    if (req.files && req.files.principal_image) {
      let filename = Date.now() + "-" + req.files.principal_image.name;
      req.files.principal_image.mv("public/images/" + filename);
      var sql = `UPDATE about SET principal_image=?, principal_name=?, principal_msg=? WHERE about_id=19`;
      await exe(sql, [filename, principal_name, principal_msg]);
    } else {
      var sql = `UPDATE about SET principal_name=?, principal_msg=? WHERE about_id=19`;
      await exe(sql, [principal_name, principal_msg]);
    }
    res.redirect("/admin/about");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Courses
exports.getCourses = async (req, res) => {
  try {
    var sql = `SELECT * FROM courses`;
    var coursesData = await exe(sql);
    var packet = { coursesData };
    res.render("admin/courses", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Save Courses
exports.postCourses = async (req, res) => {
  try {
    var { course_level, course_type, course_name } = req.body;
    var sql = `INSERT INTO courses (course_level, course_type, course_name) VALUES (?, ?, ?)`;
    await exe(sql, [course_level, course_type, course_name]);
    res.redirect("/admin/courses");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Edit Courses
exports.getEditCourses = async (req, res) => {
  try {
    var course_id = req.params.id;
    var sql = `SELECT * FROM courses WHERE course_id=?`;
    var courseData = await exe(sql, [course_id]);
    var packet = { courseData };
    res.render("admin/edit-courses", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Update Courses
exports.postUpdateCourses = async (req, res) => {
  try {
    var { course_id, course_type, course_name } = req.body;
    var sql = `UPDATE courses SET course_type=?, course_name=? WHERE course_id=?`;
    await exe(sql, [course_type, course_name, course_id]);
    res.redirect("/admin/courses");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Delete Courses
exports.getDeleteCourses = async (req, res) => {
  try {
    var course_id = req.params.id;
    var sql = `DELETE FROM courses WHERE course_id=?`;
    await exe(sql, [course_id]);
    res.redirect("/admin/courses");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Admission Process
exports.getProcess = async (req, res) => {
  try {
    var sql = `SELECT * FROM admission_steps`;
    var stepsData = await exe(sql);

    var sql = `SELECT * FROM eligibility_criteria`;
    var eligibilityData = await exe(sql);

    var packet = { stepsData, eligibilityData };
    res.render("admin/process", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Save Process
exports.postSaveProcess = async (req, res) => {
  try {
    var { step_title, step_icon, step_description } = req.body;
    var sql = `INSERT INTO admission_steps (step_title, step_icon, step_description) VALUES (?, ?, ?)`;
    await exe(sql, [step_title, step_icon, step_description]);
    res.redirect("/admin/process");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Edit Process
exports.getEditProcess = async (req, res) => {
  try {
    var step_id = req.params.id;
    var sql = `SELECT * FROM admission_steps WHERE step_id=?`;
    var stepsData = await exe(sql, [step_id]);
    var packet = { stepsData };
    res.render("admin/edit-process", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Update Process
exports.postUpdateProcess = async (req, res) => {
  try {
    var { step_id, step_title, step_icon, step_description } = req.body;
    var sql = `UPDATE admission_steps SET step_title=?, step_icon=?, step_description=? WHERE step_id=?`;
    await exe(sql, [step_title, step_icon, step_description, step_id]);
    res.redirect("/admin/process");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Delete Process
exports.getDeleteProcess = async (req, res) => {
  try {
    var step_id = req.params.id;
    var sql = `DELETE FROM admission_steps WHERE step_id=?`;
    await exe(sql, [step_id]);
    res.redirect("/admin/process");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Save Eligibility
exports.postSaveEligibility = async (req, res) => {
  try {
    var { criteria_type, criteria_icon, criteria_text } = req.body;
    var sql = `INSERT INTO eligibility_criteria (criteria_type, criteria_icon, criteria_text) VALUES (?, ?, ?)`;
    await exe(sql, [criteria_type, criteria_icon, criteria_text]);
    res.redirect("/admin/process");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Admissions List
exports.getAdmissions = async (req, res) => {
  try {
    var sql = `SELECT * FROM admissions`;
    var admissionlist = await exe(sql);
    var packet = { admissionlist };
    res.render("admin/admissions", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Achievements
exports.getAchievements = async (req, res) => {
  try {
    var sql = `SELECT * FROM achievements`;
    var achievementsData = await exe(sql);

    var sql = `SELECT * FROM accreditations`;
    var accreditationsData = await exe(sql);

    var packet = { achievementsData, accreditationsData };
    res.render("admin/achievements", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Save Acheievements
exports.postSaveAchievement = async (req, res) => {
  try {
    var { achievement_title, achievement_counter, achievement_icon } = req.body;
    var sql = `INSERT INTO achievements (achievement_title, achievement_counter, achievement_icon) VALUES (?, ?, ?)`;
    await exe(sql, [achievement_title, achievement_counter, achievement_icon]);
    res.redirect("/admin/achievements");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Edit Achievement
exports.getEditAchievement = async (req, res) => {
  try {
    var { id } = req.params;
    var sql = `SELECT * FROM achievements WHERE achievement_id=?`;
    var achievementData = await exe(sql, [id]);
    var packet = { achievementData };
    res.render("admin/edit-achievement", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Update Achievement
exports.postUpdateAchievement = async (req, res) => {
  try {
    var {
      achievement_id,
      achievement_title,
      achievement_counter,
      achievement_icon,
    } = req.body;
    var sql = `UPDATE achievements SET achievement_title=?, achievement_counter=?, achievement_icon=? WHERE achievement_id=?`;
    await exe(sql, [
      achievement_title,
      achievement_counter,
      achievement_icon,
      achievement_id,
    ]);
    res.redirect("/admin/achievements");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Delete Achievement
exports.getDeleteAchievement = async (req, res) => {
  try {
    var { id } = req.params;
    var sql = `DELETE FROM achievements WHERE achievement_id=?`;
    await exe(sql, [id]);
    res.redirect("/admin/achievements");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Save Accreditations
exports.postSaveAccreditation = async (req, res) => {
  try {
    var { accreditation_title, accreditation_icon } = req.body;
    var sql = `INSERT INTO accreditations (accreditation_title, accreditation_icon) VALUES (?, ?)`;
    await exe(sql, [accreditation_title, accreditation_icon]);
    res.redirect("/admin/achievements");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Edit Accreditation
exports.getEditAccreditation = async (req, res) => {
  try {
    var accreditation_id = req.params.id;
    var sql = `SELECT * FROM accreditations WHERE accreditation_id=?`;
    var accreditationData = await exe(sql, [accreditation_id]);
    var packet = { accreditationData };
    res.render("admin/edit-accreditation", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Update Accreditation
exports.postUpdateAccreditation = async (req, res) => {
  try {
    var { accreditation_id, accreditation_title, accreditation_icon } =
      req.body;
    var sql = `UPDATE accreditations SET accreditation_title=?, accreditation_icon=? WHERE accreditation_id=?`;
    await exe(sql, [accreditation_title, accreditation_icon, accreditation_id]);
    res.redirect("/admin/achievements");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Delete Accreditation
exports.getDeleteAccreditation = async (req, res) => {
  try {
    var accreditation_id = req.params.id;
    var sql = `DELETE FROM accreditations WHERE accreditation_id=?`;
    await exe(sql, [accreditation_id]);
    res.redirect("/admin/achievements");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Faculty
exports.getFaculty = async (req, res) => {
  try {
    var sql = `SELECT * FROM faculty`;
    var facultyData = await exe(sql);
    var packet = { facultyData };
    res.render("admin/faculty", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Save Faculty
exports.postSaveFaculty = async (req, res) => {
  try {
    var {
      faculty_name,
      faculty_designation,
      faculty_dept,
      faculty_qual,
      faculty_exp,
    } = req.body;

    if (req.files && req.files.faculty_photo) {
      let filename = Date.now() + "-" + req.files.faculty_photo.name;
      req.files.faculty_photo.mv("public/images/" + filename);

      var sql = `INSERT INTO faculty ( faculty_name, faculty_photo, faculty_designation, faculty_dept, faculty_qual, faculty_exp) VALUES (?, ?, ?, ?, ?, ?)`;
      await exe(sql, [
        faculty_name,
        filename,
        faculty_designation,
        faculty_dept,
        faculty_qual,
        faculty_exp,
      ]);
    } else {
      var sql = `INSERT INTO faculty ( faculty_name, faculty_qual, faculty_exp, faculty_designation, faculty_dept) VALUES (?, ?, ?, ?, ?)`;
      await exe(sql, [
        faculty_name,
        faculty_qual,
        faculty_exp,
        faculty_designation,
        faculty_dept,
      ]);
    }
    res.redirect("/admin/faculty");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Edit Faculty
exports.getEditFaculty = async (req, res) => {
  try {
    var faculty_id = req.params.id;
    var sql = `SELECT * FROM faculty WHERE faculty_id=?`;
    var facultyData = await exe(sql, [faculty_id]);
    var packet = { facultyData };
    res.render("admin/edit-faculty", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Update Faculty
exports.postUpdateFaculty = async (req, res) => {
  try {
    var {
      faculty_id,
      faculty_name,
      faculty_designation,
      faculty_dept,
      faculty_qual,
      faculty_exp,
    } = req.body;
    if (req.files && req.files.faculty_photo) {
      var sql = `SELECT faculty_photo FROM faculty WHERE faculty_id=?`;
      var facultyData = await exe(sql, [faculty_id]);
      if (facultyData[0].faculty_photo) {
        await fs.unlinkSync("public/images/" + facultyData[0].faculty_photo);
      }

      let filename = Date.now() + "-" + req.files.faculty_photo.name;
      req.files.faculty_photo.mv("public/images/" + filename);

      var sql = `UPDATE faculty SET faculty_name=?, faculty_photo=?, faculty_designation=?, faculty_dept=?, faculty_qual=?, faculty_exp=? WHERE faculty_id=?`;
      await exe(sql, [
        faculty_name,
        filename,
        faculty_designation,
        faculty_dept,
        faculty_qual,
        faculty_exp,
        faculty_id,
      ]);
    } else {
      var sql = `UPDATE faculty SET faculty_name=?, faculty_designation=?, faculty_dept=?, faculty_qual=?, faculty_exp=? WHERE faculty_id=?`;
      await exe(sql, [
        faculty_name,
        faculty_designation,
        faculty_dept,
        faculty_qual,
        faculty_exp,
        faculty_id,
      ]);
    }
    res.redirect("/admin/faculty");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Delete Faculty
exports.getDeleteFaculty = async (req, res) => {
  try {
    var faculty_id = req.params.id;
    var sql = `SELECT faculty_photo FROM faculty WHERE faculty_id=?`;
    var facultyData = await exe(sql, [faculty_id]);
    if (facultyData[0].faculty_photo) {
      await fs.unlinkSync("public/images/" + facultyData[0].faculty_photo);
    }
    var sql = `DELETE FROM faculty WHERE faculty_id=?`;
    await exe(sql, [faculty_id]);
    res.redirect("/admin/faculty");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Facilities
exports.getFacilities = async (req, res) => {
  try {
    var sql = `SELECT * FROM facilities`;
    var facilitiesData = await exe(sql);
    var packet = { facilitiesData };
    res.render("admin/facilities", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Save Facility
exports.postSaveFacility = async (req, res) => {
  try {
    var { facility_title, facility_desc } = req.body;

    if (req.files && req.files.facility_photo) {
      let filename = Date.now() + "-" + req.files.facility_photo.name;
      req.files.facility_photo.mv("public/images/" + filename);

      var sql = `INSERT INTO facilities ( facility_title, facility_photo, facility_desc) VALUES (?, ?, ?)`;
      await exe(sql, [facility_title, filename, facility_desc]);
    } else {
      var sql = `INSERT INTO facilities ( facility_title, facility_desc) VALUES (?, ?)`;
      await exe(sql, [facility_title, facility_desc]);
    }
    res.redirect("/admin/facilities");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Edit Facility
exports.getEditFacility = async (req, res) => {
  try {
    var facility_id = req.params.id;
    var sql = `SELECT * FROM facilities WHERE facility_id=?`;
    var facilityData = await exe(sql, [facility_id]);
    var packet = { facilityData };
    res.render("admin/edit-facility", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Update Facility
exports.postUpdateFacility = async (req, res) => {
  try {
    var { facility_id, facility_title, facility_desc } = req.body;
    if (req.files && req.files.facility_photo) {
      var oldImageSql = `SELECT facility_photo FROM facilities WHERE facility_id=?`;
      var oldImageData = await exe(oldImageSql, [facility_id]);
      var oldImage = oldImageData[0].facility_photo;
      await fs.unlinkSync("public/images/" + oldImage);

      let filename = Date.now() + "-" + req.files.facility_photo.name;
      req.files.facility_photo.mv("public/images/" + filename);

      var sql = `UPDATE facilities SET facility_title=?, facility_photo=?, facility_desc=? WHERE facility_id=?`;
      await exe(sql, [facility_title, filename, facility_desc, facility_id]);
    } else {
      var sql = `UPDATE facilities SET facility_title=?, facility_desc=? WHERE facility_id=?`;
      await exe(sql, [facility_title, facility_desc, facility_id]);
    }
    res.redirect("/admin/facilities");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Delete Facility
exports.getDeleteFacility = async (req, res) => {
  try {
    var facility_id = req.params.id;

    var oldImageSql = `SELECT facility_photo FROM facilities WHERE facility_id=?`;
    var oldImageData = await exe(oldImageSql, [facility_id]);
    var oldImage = oldImageData[0].facility_photo;
    await fs.unlinkSync("public/images/" + oldImage);

    var sql = `DELETE FROM facilities WHERE facility_id=?`;
    await exe(sql, [facility_id]);

    res.redirect("/admin/facilities");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Gallery
exports.getGallery = async (req, res) => {
  try {
    var sql = `SELECT * FROM gallery`;
    var galleryData = await exe(sql);
    var packet = { galleryData };
    res.render("admin/gallery", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Save Gallery
exports.postSaveGallery = async (req, res) => {
  try {
    if (req.files && req.files.gallery_image) {
      let filename = Date.now() + "-" + req.files.gallery_image.name;
      req.files.gallery_image.mv("public/images/" + filename);
      var sql = `INSERT INTO gallery (gallery_image) VALUES (?)`;
      await exe(sql, [filename]);
    }
    res.redirect("/admin/gallery");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Delete Gallery
exports.getDeleteGallery = async (req, res) => {
  try {
    var gallery_id = req.params.id;
    var oldImageSql = `SELECT gallery_image FROM gallery WHERE gallery_id=?`;
    var oldImageData = await exe(oldImageSql, [gallery_id]);
    var oldImage = oldImageData[0].gallery_image;
    await fs.unlinkSync("public/images/" + oldImage);

    var sql = `DELETE FROM gallery WHERE gallery_id=?`;
    await exe(sql, [gallery_id]);
    res.redirect("/admin/gallery");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Enquiry
exports.getEnquiry = async (req, res) => {
  try {
    var sql = `SELECT * FROM enquiries`;
    var enquiryData = await exe(sql);
    var packet = { enquiryData };
    res.render("admin/enquiry", packet);
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};

// Admin Logout
exports.getLogout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/admin/login");
  } catch (err) {
    console.error(err);
    res.status(500).render("err", { err: err.message });
  }
};