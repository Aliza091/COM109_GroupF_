$(document).ready(function () {
  // Toggle password visibility
  $("#passwordToggle").on("click", function () {
    const passwordInput = $("#password");
    const eyeIcon = $("#eyeIcon");

    const type = passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);

    // Toggle eye icon (optional)
    eyeIcon.text(type === "password" ? "👁️" : "🙈");
  });

  // Handle form submission
  $("#loginForm").on("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    // Clear previous error messages
    $(".error-message").text("");
    $("#generalError").hide();

    // Get form values
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    let hasError = false;

    // Basic validation
    if (!email) {
      $("#emailError").text("Email is required.");
      hasError = true;
    } else if (!validateEmail(email)) {
      $("#emailError").text("Please enter a valid email.");
      hasError = true;
    }

    if (!password) {
      $("#passwordError").text("Password is required.");
      hasError = true;
    }

    if (hasError) return;

    // Show loading spinner
    $(".btn-text").hide();
    $(".loading-spinner").show();

    // Simulate async login (e.g., AJAX request)
    setTimeout(function () {
      $(".btn-text").show();
      $(".loading-spinner").hide();

      // Demo check (you can replace with actual AJAX logic)
      if (email === "admin@example.com" && password === "password123") {
        alert("Login successful!");
        // Redirect or load dashboard
        window.location.href = "dashboard.html"; // Replace with real page
      } else {
        $("#generalError p").text("Invalid email or password.");
        $("#generalError").show();
      }
    }, 1500);
  });

  // Email validation helper
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  $("#signupLink").on("click", function (e) {
    e.preventDefault();  // Prevent default anchor behavior
    window.location.href = "signup.html";  // Redirect to signup page
  });
});
