
const menuToggle = document.getElementById("menuToggle");
const drawer = document.getElementById("mobileDrawer");
const overlay = document.getElementById("mobileOverlay");
const drawerClose = document.getElementById("drawerClose");

menuToggle.addEventListener("click", () => {
  drawer.classList.add("open");
  overlay.classList.add("active");
});

overlay.addEventListener("click", closeDrawer);
drawerClose.addEventListener("click", closeDrawer);

function closeDrawer() {
  drawer.classList.remove("open");
  overlay.classList.remove("active");
}

