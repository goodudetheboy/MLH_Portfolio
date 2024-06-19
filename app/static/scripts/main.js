function toggle_accordion(button) {
  /* Toggle between adding and removing the "active" class,
  to highlight the button that controls the panel */
  button.classList.toggle("active");

  /* Toggle between hiding and showing the active panel */
  var panel = button.nextElementSibling;
  if (panel.style.display === "block") {
    panel.style.display = "none";
  } else {
    panel.style.display = "block";
  }
}
