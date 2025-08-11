$(document).ready(function () {
  // Check login status
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    // Not logged in, redirect to signin page
    window.location.href = 'signin.html';
  }


  // Example old profiles (pre-existing users)
  const oldProfiles = [
    {
      name: "Kabita",
      modules: ["COM161", "COM115", "COM123"],
      studyTime: "Morning",
      studyStyle: "2",
      photo: "css/Ksaud.jpg"
    },
    {
      name: "Aron",
      modules: ["COM188", "COM120", "COM240"],
      studyTime: "Evening",
      studyStyle: "3",
      photo: "css/Aron.jpg"
    },
    {
      name: "Tara",
      modules: ["COM130", "COM125", "COM325"],
      studyTime: "Afternoon",
      studyStyle: "Solo",
      photo: "css/Tara.jpg"
    }
  ];

  // Handle form submit
  $("#profile-form").on("submit", function (e) {
    e.preventDefault();

    const name = $("#name").val().trim();
    const modules = $("#modules").val() || [];
    const studyTime = $("#studyTime").val();
    const studyStyle = $("#studyStyle").val();
    const photoFile = $("#photo")[0].files[0];

    if (!name || modules.length === 0 || !studyTime || !studyStyle || !photoFile) {
      alert("Please fill in all fields and upload a photo.");
      return;
    }

    // Show verification message
    $("#verification-message").html(`<p>✅ Profile for <strong>${name}</strong> created successfully!</p>`);

    // Create new profile
    const newProfile = {
      name,
      modules,
      studyTime,
      studyStyle,
      photo: URL.createObjectURL(photoFile)
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
          </div>
        `;
      });
      $("#matches-container").html(html);
    } else {
      $("#matches-container").html("<p>No matches found. Try adjusting your preferences.</p>");
    }
  });
  $('#logoutBtn').on('click', function() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'signin.html';
});
});
