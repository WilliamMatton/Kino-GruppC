


// --- . Hantera inloggning ---
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Förhindrar sidan från att laddas om

    // Hämta input-värden
    const inputUser = document.getElementById('username').value;
    const inputPass = document.getElementById('password').value;
    const messageEl = document.getElementById('responseMessage');

    // Hämta sparad data från local storage
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
   
    // Jämför inmatning med sparad data

        if ( inputUser === storedUser.username && inputPass === storedUser.password) {
        // Lyckad inloggning
        messageEl.textContent = "Inloggning lyckades! Välkommen.";
        messageEl.style.color = "green";
    } else {
        // Misslyckad inloggning
        messageEl.textContent = "Fel användarnamn eller lösenord.";
        messageEl.style.color = "red";
    }

});


