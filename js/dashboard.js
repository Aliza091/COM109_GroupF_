$(document).ready(function () {
  console.log("Dashboard loaded");

  // Date and Time display
  function updateDateTime() {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const dateStr = now.toLocaleDateString(undefined, options);
    const timeStr = now.toLocaleTimeString();

    $("#dateTimeDisplay").text(`📅 ${dateStr} ⏰ ${timeStr}`);
  }

  updateDateTime();
  setInterval(updateDateTime, 20000);

  // Cookie helper functions
  function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/";
  }

  function getCookie(name) {
    return document.cookie.split("; ").reduce((res, c) => {
      const [k, v] = c.split("=");
      return k === name ? decodeURIComponent(v) : res;
    }, "");
  }

  // Show welcome if userName cookie exists
  let userName = getCookie("userName");
  if (userName) {
    $("<p>")
      .text(`👋 Welcome back, ${userName}!`)
      .css({ "font-weight": "bold", "margin-bottom": "10px" })
      .insertBefore("#profile-form");
  }

  // Get login status from localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  console.log("isLoggedIn:", isLoggedIn);
  alert("isLoggedIn value: " + isLoggedIn);

  // Redirect if not logged in
  if (isLoggedIn !== 'true') {
    console.log("Redirecting to signin.html because user is not logged in.");
    window.location.replace('html/index.html'); 
    return;
  }

  // Example old profiles (pre-existing users)
  const oldProfiles = [
    {
      name: "Kabita",
      modules: ["COM161", "COM115", "COM123"],
      studyTime: "Morning",
      studyStyle: "2",
      photo: "jpg/Ksaud.jpg",
      email: "ksaud@gmail.com"
    },
    {
      name: "Aron",
      modules: ["COM188", "COM120", "COM240"],
      studyTime: "Evening",
      studyStyle: "3",
      photo: "jpg/Aron.jpg",
      email: "aronshav@gmail.com"
    },
    {
      name: "Tara",
      modules: ["COM130", "COM125", "COM325"],
      studyTime: "Afternoon",
      studyStyle: "2",
      photo: "jpg/Tara.jpg",
      email: "tara12@gmail.com"
    },
    {
      name: "Aliza",
      modules: ["COM250", "COM260", "COM325"],
      studyTime: "Afternoon",
      studyStyle: "4",
      photo: "jpg\Aliza.jpg",
      email: "alizaad0@gmail.com"
    },
    {
      name: "Aana",
      modules: ["COM310", "COM315", "COM320"],
      studyTime: "Afternoon",
      studyStyle: "4",
      photo: "jpg/Aana.jpg",
      email: "aanaa1@gmail.com"
    }
  ];

  // Handle form submit
  $("#profile-form").on("submit", function (e) {
    e.preventDefault();

    const name = $("#name").val().trim();
    const modules = $("#modules").val() || [];
    const studyTime = $("#studyTime").val();
    const studyStyle = $("#studyStyle").val();
    const email = $("#email").val().trim();
    const photoFile = $("#photo")[0].files[0];

    if (!name || modules.length === 0 || !studyTime || !studyStyle || !photoFile) {
      alert("Please fill in all fields and upload a photo.");
      return;
    }

    // Save userName in cookie for 5 days
    setCookie("userName", name, 5);

    // Show verification message
    $("#verification-message").html(`<p>✅ Profile for <strong>${name}</strong> created successfully!</p>`);

    // Create new profile
    const newProfile = {
      name,
      modules,
      studyTime,
      studyStyle,
      email,
      photo: URL.createObjectURL(photoFile),
    };

    // Match with old profiles
    const matches = oldProfiles.filter(profile => {
      return (
        profile.studyTime === studyTime &&
        profile.studyStyle === studyStyle &&
        profile.modules.some(m => modules.includes(m))
      );
    });

    // Add new profile to the list (optional, to be matched by future users)
    oldProfiles.push(newProfile);

    // Display matches
    const container = $("#matches-container");
    container.empty();

    if (matches.length > 0) {
      let html = "";
      matches.forEach(match => {
        html += `
          <div class="match-card">
            <img src="${match.photo}" alt="${match.name}" width="100"/>
            <p><strong>${match.name}</strong></p>
            <p>Modules: ${match.modules.join(", ")}</p>
            <p>Study Time: ${match.studyTime}</p>
            <p>Study Style: ${match.studyStyle}</p>
            <p>Email: ${match.email}</p>
          </div>
        `;
      });
      $("#matches-container").html(html);
    } else {
      $("#matches-container").html("<p>No matches found. Try adjusting your preferences.</p>");
    }
  });

  // Logout button
  $('#logoutBtn').on('click', function () {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'html/index.html';
  });
});
