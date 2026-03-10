/**
 * Registreringssida för att skapa nya användarkonton
 * Innehåller validering av formulärfält och lösenordsstyrka
 * Sparar användare i localStorage och omdirigerar till medlemssidan
 */
document.addEventListener('DOMContentLoaded', function () {
  // Hämta referenser till formulärelement
  const form = document.getElementById('signupForm');
  const signupTitle = document.querySelector('.signupMain h2');
  const signupCard = document.querySelector('.signup-card');
  const usernameInput = document.getElementById('username');
  const firstNameInput = document.getElementById('firstName');
  const lastNameInput = document.getElementById('lastName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Hämta referenser till felmeddelande-element
  const usernameError = document.getElementById('usernameError');
  const firstNameError = document.getElementById('firstNameError');
  const lastNameError = document.getElementById('lastNameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  // Hämta referenser till lösenordsstyrka-element och övriga knappar
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');
  const successMessage = document.getElementById('successMessage');
  const cancelBtn = document.getElementById('cancelBtn');

  /**
   * Validerar e-postformat med regex och extra kontroller
   * @param {string} email - E-postadressen som ska valideras
   * @returns {boolean} - True om e-posten är giltig, annars false
   */
  function isValidEmail(email) {
    // Regex för grundläggande e-postformat: text@domän.tld
    const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailPattern.test(email)) {
      return false;
    }

    // Extra validering för att förhindra ogiltiga punktplaceringar
    const parts = email.split('@');
    const localPart = parts[0]; // Delen före @
    const domainPart = parts[1]; // Domändelen efter @

    // E-postens lokala del får inte börja eller sluta med punkt
    if (localPart.startsWith('.') || localPart.endsWith('.')) {
      return false;
    }

    // Dubbla punkter är inte tillåtna
    if (localPart.includes('..') || domainPart.includes('..')) {
      return false;
    }

    // Domänen får inte börja eller sluta med bindestreck
    if (domainPart.startsWith('-') || domainPart.endsWith('-')) {
      return false;
    }

    // Domänen får inte börja eller sluta med punkt
    if (domainPart.startsWith('.') || domainPart.endsWith('.')) {
      return false;
    }

    return true;
  }

  /**
   * Beräknar lösenordets styrka baserat på olika kriterier
   * @param {string} password - Lösenordet som ska bedömas
   * @returns {number} - Poäng mellan 0-6, där högre är starkare
   */
  function getPasswordScore(password) {
    let score = 0;

    if (password.length >= 8) score += 1;  // Minst 8 tecken
    if (password.length >= 12) score += 1; // Minst 12 tecken (extra poäng)
    if (/[a-z]/.test(password)) score += 1; // Innehåller små bokstäver
    if (/[A-Z]/.test(password)) score += 1; // Innehåller stora bokstäver
    if (/\d/.test(password)) score += 1;    // Innehåller siffror
    if (/[^A-Za-z0-9]/.test(password)) score += 1; // Innehåller specialtecken

    return score;
  }

  /**
   * Kontrollerar om lösenordet är tillräckligt starkt
   * @param {string} password - Lösenordet som ska kontrolleras
   * @returns {boolean} - True om lösenordet har minst 5 poäng
   */
  function isStrongPassword(password) {
    const score = getPasswordScore(password);
    return score >= 5; // Kräver minst 5 av 6 möjliga poäng
  }

  /**
   * Uppdaterar den visuella indikatorn för lösenordsstyrka
   * @param {string} password - Lösenordet som ska visas styrka för
   */
  function updatePasswordIndicator(password) {
    // Om lösenordsfältet är tomt, visa ingen styrka
    if (password.length === 0) {
      strengthBar.className = 'progress-bar';
      strengthBar.style.width = '0%';
      strengthText.className = 'mt-2 d-inline-block';
      strengthText.textContent = 'Losenordsstyrka: -';
      return;
    }

    // Beräkna styrka och uppdatera progress bar
    const score = getPasswordScore(password);
    const width = Math.round((score / 6) * 100); // Omvandla poäng till procent
    strengthBar.style.width = width + '%';

    // Visa olika färg och text beroende på styrka
    if (score <= 2) { // 0-2 poäng = Svagt (rött)
      strengthBar.className = 'progress-bar bg-danger';
      strengthText.className = 'mt-2 d-inline-block text-danger';
      strengthText.textContent = 'Losenordsstyrka: Svagt';
    } else if (score <= 4) { // 3-4 poäng = Okej (gult)
      strengthBar.className = 'progress-bar bg-warning';
      strengthText.className = 'mt-2 d-inline-block text-warning';
      strengthText.textContent = 'Losenordsstyrka: Okej';
    } else if (score === 5) { // 5 poäng = Starkt (grönt)
      strengthBar.className = 'progress-bar bg-success';
      strengthText.className = 'mt-2 d-inline-block text-success';
      strengthText.textContent = 'Losenordsstyrka: Starkt';
    } else { // 6 poäng = Mycket starkt (grönt)
      strengthBar.className = 'progress-bar bg-success';
      strengthText.className = 'mt-2 d-inline-block text-success';
      strengthText.textContent = 'Losenordsstyrka: Mycket starkt';
    }
  }

  /**
   * Rensar alla felmeddelanden och tar bort invalid-klasser
   * Används innan ny validering körs
   */
  function clearErrors() {
    // Töm alla felmeddelanden
    usernameError.textContent = '';
    firstNameError.textContent = '';
    lastNameError.textContent = '';
    emailError.textContent = '';
    passwordError.textContent = '';

    // Ta bort röda ramar från alla input-fält
    usernameInput.classList.remove('is-invalid');
    firstNameInput.classList.remove('is-invalid');
    lastNameInput.classList.remove('is-invalid');
    emailInput.classList.remove('is-invalid');
    passwordInput.classList.remove('is-invalid');
  }

  // Event listener: Uppdatera lösenordsstyrka vid varje tangentryckning
  passwordInput.addEventListener('input', function () {
    updatePasswordIndicator(passwordInput.value);
    passwordError.textContent = ''; // Rensa felmeddelande när användaren skriver
    passwordInput.classList.remove('is-invalid');
  });

  // Event listener: Rensa felmeddelande när användaren skriver i e-postfältet
  emailInput.addEventListener('input', function () {
    emailError.textContent = '';
  });

  // Event listener: Rensa felmeddelande när användaren skriver i användarnamn-fältet
  usernameInput.addEventListener('input', function () {
    usernameError.textContent = '';
    usernameInput.classList.remove('is-invalid');
  });

  // Event listener: Validera e-post när användaren lämnar fältet (blur)
  emailInput.addEventListener('blur', function () {
    const email = emailInput.value.trim();

    if (email === '') {
      emailError.textContent = 'E-post är obligatoriskt';
      return;
    }

    if (!isValidEmail(email)) {
      emailError.textContent = 'Ogiltig e-postadress, skriv t.ex. namn@mail.com';
      return;
    }

    emailError.textContent = ''; // E-posten är giltig
  });

  // Event listener: Hantera avbryt-knappen
  cancelBtn.addEventListener('click', function () {
    // Gå tillbaka i historiken om möjligt, annars till startsidan
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = 'index.html';
    }
  });

  // Event listener: Hantera formulärinlämning
  form.addEventListener('submit', function (event) {
    event.preventDefault(); // Förhindra standardformulärinlämning
    clearErrors(); // Rensa alla tidigare felmeddelanden

    // Hämta värden från alla fält
    const username = usernameInput.value.trim();
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    let formIsValid = true; // Flagga för att spåra om formuläret är giltigt

    // Validera användarnamn
    if (username === '') {
      usernameError.textContent = 'Användarnamn är obligatoriskt';
      usernameInput.classList.add('is-invalid');
      formIsValid = false;
    }

    // Validera förnamn
    if (firstName === '') {
      firstNameError.textContent = 'Förnamn är obligatoriskt';
      firstNameInput.classList.add('is-invalid');
      formIsValid = false;
    }

    // Validera efternamn
    if (lastName === '') {
      lastNameError.textContent = 'Efternamn är obligatoriskt';
      lastNameInput.classList.add('is-invalid');
      formIsValid = false;
    }

    // Validera e-post
    if (email === '') {
      emailError.textContent = 'E-post är obligatoriskt';
      emailInput.classList.add('is-invalid');
      formIsValid = false;
    } else if (!isValidEmail(email)) {
      emailError.textContent = 'Ange en giltig e-postadress';
      emailInput.classList.add('is-invalid');
      formIsValid = false;
    }

    // Validera lösenord
    if (password === '') {
      passwordError.textContent = 'Lösenord är obligatoriskt';
      passwordInput.classList.add('is-invalid');
      formIsValid = false;
    } else if (!isStrongPassword(password)) {
      passwordError.textContent = 'Lösenordet måste vara starkt';
      passwordInput.classList.add('is-invalid');
      formIsValid = false;
    }

    updatePasswordIndicator(password);

    // Avbryt om något fält är ogiltigt
    if (!formIsValid) {
      return;
    }

    // Skapa ett nytt användarobjekt
    const newUser = {
      username: username,
      firstName: firstName,
      lastName: lastName,
      fullName: firstName + ' ' + lastName,
      email: email,
      password: password,
      createdAt: new Date().toISOString(), // Tidsstämpel för när kontot skapades
    };

    // Hämta befintliga användare från localStorage (eller tom array om ingen finns)
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Kolla om användarnamnet redan finns (case-insensitive)
    const usernameExists = users.some(function (user) {
      return user.username && user.username.toLowerCase() === username.toLowerCase();
    });

    // Kolla om e-postadressen redan är registrerad
    const emailExists = users.some(function (user) {
      return user.email === email;
    });

    // Förhindra dubbla användarnamn
    if (usernameExists) {
      usernameError.textContent = 'Användarnamnet är redan använt';
      usernameInput.classList.add('is-invalid');
      return;
    }

    // Förhindra dubbla e-postadresser
    if (emailExists) {
      emailError.textContent = 'E-postadressen ar redan registrerad';
      emailInput.classList.add('is-invalid');
      return;
    }

    // Lägg till den nya användaren i listan och spara i localStorage
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Spara som inloggad användare
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    // Dölj formuläret och visa framgångsmeddelande
    if (signupTitle) {
      signupTitle.classList.add('d-none');
    }

    if (signupCard) {
      signupCard.classList.add('d-none');
    }

    form.classList.add('d-none');
    successMessage.classList.remove('d-none');

    // Omdirigera till medlemssidan efter 2 sekunder
    setTimeout(function () {
      window.location.href = 'memberpage.html';
    }, 2000);
  });
});
