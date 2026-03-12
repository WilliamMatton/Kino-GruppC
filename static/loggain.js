


// --- 2. Hantera inloggning ---
/*document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Förhindrar sidan från att laddas om

    // Hämta input-värden
    const inputUser = document.getElementById('username').value;
    const inputPass = document.getElementById('password').value;
    const messageEl = document.getElementById('responseMessage');

    // Hämta sparad data från local storage
    //const storedUser = JSON.parse(localStorage.getItem("users"));
   const storedUser = localStorage.getItem("users");

    // Jämför inmatning med sparad data
    if (storedUser && inputUser === storedUser.username && inputPass === storedUser.password) {
        // Lyckad inloggning
        messageEl.textContent = "Inloggning lyckades! Välkommen.";
        messageEl.style.color = "green";
    } else {
        // Misslyckad inloggning
        messageEl.textContent = "Fel användarnamn eller lösenord.";
        messageEl.style.color = "red";
    }

});
//var entry = localStorage.getItem("entry");
//andra function
// --- 1. Sätt upp exempeldata i localStorage vid sidladdning ---
// Detta görs bara en gång för att ha något att jämföra med.
localStorage.setItem('user', 'admin');
localStorage.setItem('pass', 'hemligt123');*/

// --- 2. Inloggningsfunktion ---
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Förhindrar sidan från att laddas om
    // Hämta värden från inmatningsfälten
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const message = document.getElementById('responseMessage');

    // Hämta sparade uppgifter från local storage
    const storedUser = localStorage.getItem('username');
    const storedPass = localStorage.getItem('password');

    // Jämför inmatning med sparade uppgifter
    if (user === storedUser && pass === storedPass) {
        // Lyckad inloggning
        message.style.color = 'green';
        message.innerText = 'Inloggningen lyckades! Välkommen.';
      //  console.log("Inloggning lyckades");
    } else {
        // Misslyckad inloggning
        message.style.color = 'red';
        message.innerText = 'Fel användarnamn eller lösenord.';
       // console.log("Inloggning misslyckades");
    }
});
