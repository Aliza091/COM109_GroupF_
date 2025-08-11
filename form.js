$(document).ready(function () {
  // Form submission success animation
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    $("#formSuccess").fadeIn(500).delay(3000).fadeOut(500);
    $(this).trigger("reset");
  });

  // Show/Hide Back to Top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $("#backToTop").fadeIn();
    } else {
      $("#backToTop").fadeOut();
    }
  });

  // Scroll back to top smoothly
  $("#backToTop").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
    return false;
  });
});
