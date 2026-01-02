const root = document.querySelector("html");

const bistroPlaceholderTableMapButton = document.querySelector(".bistroPlaceholderTableMapButton");
const bistroTableModalCloseBtn = document.querySelector(".bistroTableModalCloseBtn");

const bistroTableMapModal = document.querySelector(".bistroTableMapModal");
const bistroModalOverlay = document.querySelector(".bistroModalOverlay");

const bistroTableMapTables = document.querySelectorAll(".bistroTableMapTable");

bistroPlaceholderTableMapButton.addEventListener("click", openTableModal);
bistroTableModalCloseBtn.addEventListener("click", closeTableModal);

function openTableModal() {
  bistroModalOverlay.classList.add("bistroModalActive");
  root.classList.add("scrollLock");
}

function closeTableModal() {
  bistroModalOverlay.classList.remove("bistroModalActive");
  root.classList.remove("scrollLock");
}

bistroTableMapTables.forEach(table => {
  if(!table.classList.contains("bistroTableBooked")) {
    table.addEventListener("click", function() {
      chooseTable(table.children);
    });
  }
});

function chooseTable(table) {
  bistroPlaceholderTableMapButton.value = table[0].innerText;
  closeTableModal();
}