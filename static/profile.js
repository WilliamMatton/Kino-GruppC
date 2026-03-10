document.addEventListener("DOMContentLoaded", function () {

  const user = JSON.parse(localStorage.getItem("currentUser"));

  if (!user) {
    // Om ingen användare finns → tillbaka till signup
    window.location.href = "signup.html";
    return;
  }

  document.getElementById("profileUsername").textContent = user.username;
  document.getElementById("profileFullname").textContent = user.fullName;
  document.getElementById("profileEmail").textContent = user.email;

});

document.getElementById("logoutBtn").addEventListener("click", function(){
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
});