const root = document.querySelector("html");

const bistroPlaceholderTableMapButton = document.querySelector(".bistroPlaceholderTableMapButton");
const bistroTableModalCloseBtn = document.querySelector(".bistroTableModalCloseBtn");

const bistroTableMapModal = document.querySelector(".bistroTableMapModal");
const bistroModalOverlay = document.querySelector(".bistroModalOverlay");

bistroPlaceholderTableMapButton.addEventListener("click", function() {
  bistroModalOverlay.classList.add("bistroModalActive");
  root.classList.add("scrollLock");
});

bistroTableModalCloseBtn.addEventListener("click", function() {
  bistroModalOverlay.classList.remove("bistroModalActive");
  root.classList.remove("scrollLock");
});