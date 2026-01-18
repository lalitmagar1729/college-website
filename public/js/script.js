// Add subtle animation to cards on page load
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".course-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, 100 + index * 200);
  });
});

// Auto Counter Animation

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".stat-number");
  let started = false; // prevent repeat animation

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          counters.forEach((counter) => startCount(counter));
        }
      });
    },
    { threshold: 0.5 }
  );

  counterObserver.observe(document.querySelector(".achievements-section"));

  function startCount(counter) {
    const target = +counter.getAttribute("data-target");
    const suffix = counter.innerText.replace(/\d/g, "");
    let count = 0;
    const speed = target / 100;

    const updateCount = () => {
      if (count < target) {
        count += speed;
        counter.innerText = Math.ceil(count) + suffix;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = target + suffix;
      }
    };

    updateCount();
  }
});

// Courses

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const courseLevel = document.getElementById("course_level");
  const courseTypeContainer = document.getElementById("courseTypeContainer");
  const courseType = document.getElementById("course_type");
  const courseNameContainer = document.getElementById("courseNameContainer");
  const courseName = document.getElementById("course_name");
  const courseForm = document.getElementById("courseForm");
  const resetBtn = document.getElementById("resetBtn");

  // Course type options for all levels
  const courseTypeOptions = {
    Diploma: [{ value: "Diploma", text: "Diploma" }],
    Undergraduate: [
      {
        value: "Bachelor of Engineering (B.E.)",
        text: "Bachelor of Engineering (B.E.)",
      },
      { value: "Bachelor's Degree", text: "Bachelor's Degree" },
    ],
    Postgraduate: [
      {
        value: "Master of Engineering (M.E.)",
        text: "Master of Engineering (M.E.)",
      },
      { value: "Master's Degree", text: "Master's Degree" },
    ],
  };

  // Course level change handler
  courseLevel.addEventListener("change", handleCourseLevelChange);

  // Course type change handler
  courseType.addEventListener("change", handleCourseTypeChange);

  // Reset button handler
  resetBtn.addEventListener("click", resetForm);

  // Form submission handler
  courseForm.addEventListener("submit", handleFormSubmit);

  // Functions
  function handleCourseLevelChange() {
    const selectedLevel = this.value;

    // Reset and hide dynamic fields
    courseTypeContainer.style.display = "none";
    courseNameContainer.style.display = "none";
    courseType.innerHTML = '<option value="">-- Select Type --</option>';
    courseName.value = "";
    courseName.placeholder = "";

    if (selectedLevel) {
      // Show course type for all levels
      showCourseTypeField(selectedLevel);

      // Show course name field
      courseNameContainer.style.display = "block";

      // Set initial placeholder based on level
      if (selectedLevel === "Diploma") {
        courseName.placeholder = "Enter diploma course name";
      } else {
        courseName.placeholder = `Enter ${selectedLevel.toLowerCase()} course name`;
      }
    }
  }

  function handleCourseTypeChange() {
    const selectedType = this.value;
    const selectedLevel = courseLevel.value;

    // Update placeholder based on both level and type
    if (selectedLevel === "Diploma") {
      if (selectedType === "Diploma") {
        courseName.placeholder =
          "Enter diploma program (e.g., Computer Engineering, Mechanical Engineering)";
      } else if (selectedType === "Advanced Diploma") {
        courseName.placeholder = "Enter advanced diploma program";
      } else if (selectedType === "Post Graduate Diploma") {
        courseName.placeholder =
          "Enter post graduate diploma program (e.g., PG Diploma in Management)";
      } else if (selectedType === "Diploma Certification") {
        courseName.placeholder = "Enter diploma certification program";
      }
    } else if (selectedLevel === "Undergraduate") {
      if (selectedType === "Bachelor of Engineering (B.E.)") {
        courseName.placeholder =
          "Enter BE specialization (e.g., Computer Engineering, Cyber Security)";
      } else if (selectedType === "Bachelor's Degree") {
        courseName.placeholder =
          "Enter bachelor's degree (e.g., B.Sc. Computer Science, BCA, BBA)";
      }
    } else if (selectedLevel === "Postgraduate") {
      if (selectedType === "Master of Engineering (M.E.)") {
        courseName.placeholder =
          "Enter ME specialization (e.g., Computer Engineering, Cyber Security)";
      } else if (selectedType === "Master's Degree") {
        courseName.placeholder =
          "Enter master's degree (e.g., MCA, M.Sc., MBA)";
      }
    }
  }

  function showCourseTypeField(level) {
    courseTypeContainer.style.display = "block";

    // Clear existing options
    courseType.innerHTML = '<option value="">-- Select Type --</option>';

    // Populate options based on level
    if (courseTypeOptions[level]) {
      courseTypeOptions[level].forEach((option) => {
        const optElement = document.createElement("option");
        optElement.value = option.value;
        optElement.textContent = option.text;
        courseType.appendChild(optElement);
      });
    }
  }

  function resetForm() {
    // Hide dynamic fields
    courseTypeContainer.style.display = "none";
    courseNameContainer.style.display = "none";

    // Reset form values
    courseForm.reset();
    courseType.innerHTML = '<option value="">-- Select Type --</option>';
    courseName.placeholder = "";
    courseLevel.focus();
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const selectedLevel = courseLevel.value;
    const selectedType = courseType.value;
    const enteredName = courseName.value.trim();

    // Validation
    if (!selectedLevel) {
      alert("Please select a course level");
      courseLevel.focus();
      return;
    }

    if (!selectedType) {
      alert("Please select a course type");
      courseType.focus();
      return;
    }

    if (!enteredName) {
      alert("Please enter a course name");
      courseName.focus();
      return;
    }

    // Prepare data for submission
    const formData = {
      course_level: selectedLevel,
      program_type: selectedType,
      course_name: enteredName,
      course_status: "Active", // Default value as per your table
    };

    // Display success message
    alert(
      `Course saved successfully!\n\nLevel: ${formData.course_level}\nType: ${formData.program_type}\nName: ${formData.course_name}`
    );

    // Reset form after successful submission
    resetForm();
  }
});
