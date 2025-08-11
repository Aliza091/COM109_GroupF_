$(document).ready(function () {
  // Password toggle for Password
  $("#passwordToggle").on("click", function () {
    const input = $("#password");
    const icon = $("#eyeIcon");
    const type = input.attr("type") === "password" ? "text" : "password";
    input.attr("type", type);
    icon.text(type === "password" ? "👁️" : "🙈");
  });

  // Password toggle for Confirm Password
  $("#confirmPasswordToggle").on("click", function () {
    const input = $("#confirmPassword");
    const icon = $("#eyeIconConfirm");
    const type = input.attr("type") === "password" ? "text" : "password";
    input.attr("type", type);
    icon.text(type === "password" ? "👁️" : "🙈");
  });

  // Handle signup form submit
  $("#signupForm").on("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    $(".error-message").text("");
    $("#generalError").hide();

    // Get values
    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    const confirmPassword = $("#confirmPassword").val().trim();
    let hasError = false;

    // Validate email
    if (!email) {
      $("#emailError").text("Email is required.");
      hasError = true;
    } else if (!validateEmail(email)) {
      $("#emailError").text("Please enter a valid email.");
      hasError = true;
    }

    // Validate password
    if (!password) {
      $("#passwordError").text("Password is required.");
      hasError = true;
    } else if (password.length < 6) {
      $("#passwordError").text("Password must be at least 6 characters.");
      hasError = true;
    }

    // Validate confirm password
    if (!confirmPassword) {
      $("#confirmPasswordError").text("Please confirm your password.");
      hasError = true;
    } else if (password !== confirmPassword) {
      $("#confirmPasswordError").text("Passwords do not match.");
      hasError = true;
    }

    if (hasError) return;

    // Show loading spinner
    $(".btn-text").hide();
    $(".loading-spinner").show();

    // Simulate async signup (replace with real signup logic)
    setTimeout(function () {
      $(".btn-text").show();
      $(".loading-spinner").hide();

      // For demo, just alert success and redirect to login
      alert("Account created successfully!");
      window.location.href = "dashboard.html"; // your login page
    }, 1500);
  });

  // Email validation regex
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
