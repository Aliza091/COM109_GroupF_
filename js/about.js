$(document).ready(function () {
  // Simple fade-in for the whole page content
  $("main").css("display", "none").fadeIn(500);

  // Subtle hover highlight for list items
  $("ul li").hover(
    function () {
      $(this).css("background-color", "#eef5ff");
    },
    function () {
      $(this).css("background-color", "");
    }
  );
});
