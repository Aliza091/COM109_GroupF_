$(document).ready(function () {
  // Password toggle button
  $("ul li").hover(
    function () {
      $(this).css("background-color", "#eef5ff");
    },
    function () {
      $(this).css("background-color", "" );
    }
  $("#passwordToggle").on("click", function () {
    const passwordInput = $("#password");
    const eyeIcon = $("#eyeIcon");

    const type = passwordInput.attr("type") === "password" ? "text" : "password";
    passwordInput.attr("type", type);
    eyeIcon.text(type === "password" ? "👁️" : "🙈");
  });

  // Email validation helper
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Login form submit handler
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    // Clear previous errors and hide general error
    $(".error-message").text("");
    $("#generalError").hide();

    const email = $("#email").val().trim();
    const password = $("#password").val().trim();
    let hasError = false;

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

    // Show spinner, hide button text
    $(".btn-text").hide();
    $(".loading-spinner").show();

    // Simulate login delay
    setTimeout(() => {
      $(".btn-text").show();
      $(".loading-spinner").hide();

      if (email === "admin@example.com" && password === "password123") {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "dashboard.html";
      } else {
        $("#generalError p").text("Invalid email or password.");
        $("#generalError").show();
      }
    }, 1500);
  });

  // Signup link click handler
  $("#signupLink").on("click", function (e) {
    e.preventDefault();
    window.location.href = "signup.html";
  });
});
