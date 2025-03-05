document.addEventListener("DOMContentLoaded", function () {
    // SLIDER
    var textContainer = document.getElementById("textContainer");
    var loginText = document.getElementById("loginText");
    var registerText = document.getElementById("registerText");
    // FORMS CONTAINERS
    var loginContainer = document.getElementById("LoginFormContainer");
    var registerContainer = document.getElementById("RegisterFormContainer");
    // FORMS
    var loginForm = document.getElementById("loginForm");
    var registerForm = document.getElementById("registerForm");
    // LINKS
    var loginLink = document.getElementById("switchRegisterMobile");
    var registerLink = document.getElementById("switchLoginMobile");
    //INPUTS
    var emailLogin = document.getElementById('loginEmail');
    var pswLogin = document.getElementById('loginPassword');
    //--------------------------------------------------------------------------------------------------------------------------------//
    var name = document.getElementById('name');
    var surname = document.getElementById('surname');
    var sex = document.getElementById('sex');
    var nation = document.getElementById('nation');
    var birthDate = document.getElementById('birthDate');
    var emailRegister = document.getElementById('registerEmail');
    var pswRegister = document.getElementById('registerPassword');
    //FEEDBACKLOGIN
    var emailFeedback = document.getElementById('feedbackEmail');
    var passwordFeedback = document.getElementById('feedbackPsw');
    //FEEDBACKREGISTER
    var credentialsFeedback = document.getElementById('feedbackAnagraphicData');
    //############################################################################################################
    // SUBMIT BOTTONS
    var switchToRegisterButton = document.getElementById("switchToRegister");
    var switchToLoginButton = document.getElementById("switchToLogin");
    //############################################################################################################ 
    //DA TABLET IN POI per evitare il bug di visualizzazione nei devTools
    window.addEventListener("resize", function () {
        if (window.innerWidth >= 767) {
            loginContainer.style.transform = "translateX(0%)";
            loginContainer.style.display = "flex";
            loginContainer.style.opacity = "1";
            registerContainer.style.transform = "translateX(0%)";
            registerContainer.style.display = "flex";
            registerContainer.style.opacity = "1";
        }
        if (window.innerWidth < 767) {
            loginContainer.style.transform = "translateX(0%)";
            loginContainer.style.display = "flex";
            loginContainer.style.opacity = "1";
            registerContainer.style.display = "none";
        }
    });
    //################################################################################################
    // ANIMAZIONE DA TABLET IN POI
    switchToRegisterButton.addEventListener("click", function () {
        textContainer.classList.add("move-left");
        loginText.style.display = "none";
        registerText.style.display = "flex";
    });
    switchToLoginButton.addEventListener("click", function () {
        textContainer.classList.remove("move-left");
        loginText.style.display = "flex";
        registerText.style.display = "none";
    });
    //--------------------------------------------------------------------------------------------------------------------------------//
    // ANIMAZIONE DA MOBILE
    loginLink.addEventListener("click", function () {
        // Animazione di uscita per il form di login
        loginContainer.style.transition = "opacity 0.5s, transform 0.5s";
        loginContainer.style.opacity = "0";
        loginContainer.style.transform = "translateX(-80%)";
        // Dopo 0.5 secondi, nascondi il form di login e mostra quello di registrazione
        setTimeout(function () {
            loginContainer.style.display = "none";
            // Mostra il form di registrazione
            registerContainer.style.display = "flex";
            registerContainer.style.transition = "opacity 0.3s, transform 0.5s";
            registerContainer.style.opacity = "1";
            // Imposta l'entrata: inizia fuori a destra
            registerContainer.style.transform = "translateX(80%)";
            // Subito dopo, porta il form nella sua posizione finale
            setTimeout(function () {
                registerContainer.style.transform = "translateX(0)";
            }, 10);
        }, 500);
    });
    registerLink.addEventListener("click", function () {
        registerContainer.style.transition = "opacity 0.5s, transform 0.5s";
        registerContainer.style.opacity = "0";
        registerContainer.style.transform = "translateX(80%)";
        setTimeout(function () {
            registerContainer.style.display = "none";
            loginContainer.style.display = "flex";
            loginContainer.style.transition = "opacity 0.3s, transform 0.5s";
            loginContainer.style.opacity = "1";
            loginContainer.style.transform = "translateX(-80%)";
            setTimeout(function () {
                loginContainer.style.transform = "translateX(0)";
            }, 10);
        }, 500);
    });
    //############################################################################################################
    // VALIDAZIONE FORM LOGIN
    emailLogin.addEventListener("input", function () {
        CLogin.checkEmail(emailLogin);
    });
    pswLogin.addEventListener("input", function () {
        CLogin.checkPassword(pswLogin);
    });
    loginForm.addEventListener("submit", function (e) {
        if (!CLogin.checkEmail(emailLogin)) {
            e.preventDefault();
        }
        if (!CLogin.checkPassword(pswLogin)) {
            e.preventDefault();
        }
        else {
            var loginData = {
                email: emailLogin.value,
                password: pswLogin.value
            };
            console.log("Login JSON:", JSON.stringify(loginData));
            e.preventDefault(); //rimuovilo per inviare i dati
        }
    });
    // // VALIDAZIONE FORM REGISTRAZIONE
    name.addEventListener("input", function () {
        CRegister.checkName(name);
    });
    surname.addEventListener("input", function () {
        CRegister.checkSurname(surname);
    });
    sex.addEventListener('input', function () {
        CRegister.checkSex(sex);
    });
    birthDate.addEventListener('input', function () {
        CRegister.checkData(birthDate);
    });
    nation.addEventListener('input', function () {
        CRegister.checkNation(nation);
    });
    emailRegister.addEventListener("input", function () {
        CLogin.checkEmail(emailRegister);
    });
    pswRegister.addEventListener("input", function () {
        CLogin.checkPassword(pswRegister);
    });
    registerForm.addEventListener("submit", function (e) {
        // Variabile per tracciare il numero di errori
        var errorCount = 0;
        // Esegui i controlli per per i messaggi di errore
        var NameValid = CRegister.checkName(name);
        var SurnameValid = CRegister.checkSurname(surname);
        var SexValid = CRegister.checkSex(sex);
        var BirthDateValid = CRegister.checkData(birthDate);
        var NationValid = CRegister.checkNation(nation);
        var EmailValid = CLogin.checkEmail(emailRegister);
        var PasswordValid = CLogin.checkPassword(pswRegister);
        if (!NameValid)
            errorCount++;
        if (!SurnameValid)
            errorCount++;
        if (!SexValid)
            errorCount++;
        if (!BirthDateValid)
            errorCount++;
        if (!NationValid)
            errorCount++;
        if (!EmailValid)
            errorCount++;
        if (!PasswordValid)
            errorCount++;
        // Se ci sono errori, mostra i messaggi generali
        if (errorCount > 1) {
            e.preventDefault();
            credentialsFeedback.textContent = "".concat(errorCount, " campi non validi");
        }
        if (errorCount === 1) {
            credentialsFeedback.textContent = "".concat(errorCount, " campo non valido");
        }
        if (NameValid && SurnameValid && SexValid && BirthDateValid && NationValid && EmailValid && PasswordValid) {
            var registerData = {
                nome: name.value,
                cognome: surname.value,
                sesso: sex.value,
                idNazione: nation.value,
                dataNascita: birthDate.value,
                email: emailRegister.value,
                password: pswRegister.value
            };
            console.log("Registrazione JSON:", JSON.stringify(registerData));
            e.preventDefault(); // Rimuovilo per inviare i dati
        }
    });
    //############################################################################################################//
    // ENUM
    var Sesso;
    (function (Sesso) {
        Sesso[Sesso["Maschile"] = 0] = "Maschile";
        Sesso[Sesso["Femminile"] = 1] = "Femminile";
    })(Sesso || (Sesso = {}));
    //LOGIN CLASS
    var CLogin = /** @class */ (function () {
        function CLogin(email, password) {
            this.email = email;
            this.password = password;
        }
        CLogin.checkEmail = function (emailInput) {
            if (!emailInput) {
                return false;
            }
            var email = emailInput.value;
            if (!email) {
                emailInput.style.border = "1px solid red";
                emailFeedback.textContent = "Email non fornita.";
                return false;
            }
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                emailInput.style.border = "1px solid red";
                emailFeedback.textContent = "Formato email non valido.";
                return false;
            }
            if (email.trim() !== email) {
                emailInput.style.border = "1px solid red";
                emailFeedback.textContent = "L'email non può contenere spazi all'inizio o alla fine.";
                return false;
            }
            if (email.length > 254) {
                emailInput.style.border = "1px solid red";
                emailFeedback.textContent = "L'email è troppo lunga.";
                return false;
            }
            var invalidChars = /[(),:;<>[\] ]/;
            if (invalidChars.test(email)) {
                emailInput.style.border = "1px solid red";
                emailInput.style.color = "red";
                emailFeedback.textContent = "L'email contiene caratteri non validi.";
                return false;
            }
            // Se tutte le condizioni sono soddisfatte
            emailInput.style.border = "1px solid green";
            emailFeedback.textContent = ""; // Pulisce il messaggio d'errore in caso di successo
            return true;
        };
        CLogin.checkPassword = function (passwordInput) {
            if (!passwordInput) {
                passwordFeedback.textContent = "Elemento password non fornito.";
                return false;
            }
            var password = passwordInput.value;
            if (!password) {
                passwordInput.style.border = "1px solid red";
                passwordFeedback.textContent = "Password non fornita.";
                return false;
            }
            // Lunghezza tra 8 e 128 caratteri
            if (password.length < 8 || password.length > 128) {
                passwordInput.style.border = "1px solid red";
                passwordFeedback.textContent = "La password deve essere tra 8 e 128 caratteri.";
                return false;
            }
            // Deve contenere almeno una lettera maiuscola
            if (!/[A-Z]/.test(password)) {
                passwordInput.style.border = "1px solid red";
                passwordFeedback.textContent = "La password deve contenere almeno una lettera maiuscola.";
                return false;
            }
            // Deve contenere almeno una lettera minuscola
            if (!/[a-z]/.test(password)) {
                passwordInput.style.border = "1px solid red";
                passwordFeedback.textContent = "La password deve contenere almeno una lettera minuscola.";
                return false;
            }
            // Deve contenere almeno un numero
            if (!/\d/.test(password)) {
                passwordInput.style.border = "1px solid red";
                passwordFeedback.textContent = "La password deve contenere almeno un numero.";
                return false;
            }
            // Deve contenere almeno un carattere speciale
            if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                passwordInput.style.border = "1px solid red";
                passwordFeedback.textContent = "La password deve contenere almeno un carattere speciale.";
                return false;
            }
            // Non deve contenere spazi
            if (/\s/.test(password)) {
                passwordInput.style.border = "1px solid red";
                passwordFeedback.textContent = "La password non può contenere spazi.";
                return false;
            }
            // Se tutte le condizioni sono soddisfatte
            passwordInput.style.border = "1px solid green";
            passwordFeedback.textContent = ""; // Pulisce il messaggio d'errore in caso di successo
            return true;
        };
        return CLogin;
    }());
    //REGISTER CLASS
    var CRegister = /** @class */ (function () {
        function CRegister(nome, cognome, sesso, idNazione, dataNascita, email, password) {
            this.nome = nome;
            this.cognome = cognome;
            this.sesso = sesso;
            this.idNazione = idNazione;
            this.dataNascita = dataNascita;
            this.email = email;
            this.password = password;
        }
        CRegister.checkName = function (nome) {
            if (!nome || nome.value.trim() === "") { // Controlla se è nullo o vuoto
                if (nome)
                    nome.style.border = "1px solid red";
                credentialsFeedback.textContent = "Il nome è obbligatorio";
                return false;
            }
            // Rimuove gli spazi prima e dopo il nome
            var nomeTrimmed = nome.value.trim();
            // Controlla la lunghezza del nome
            if (nomeTrimmed.length < 2 || nomeTrimmed.length > 50) {
                nome.style.border = "1px solid red";
                credentialsFeedback.textContent = "Il nome deve essere compreso tra 2 e 50 caratteri.";
                return false;
            }
            // Definisci un pattern che consente lettere latine, arabe, giapponesi e altri caratteri Unicode
            var pattern = /^[A-Za-z\u0600-\u06FF\u4e00-\u9faf\u0800-\u4e00]+$/;
            // Verifica se il valore del campo rispetta il pattern
            if (!pattern.test(nomeTrimmed)) {
                nome.style.border = "1px solid red";
                credentialsFeedback.textContent = 'Inserire un nome valido';
                return false;
            }
            nome.style.border = "1px solid green";
            credentialsFeedback.textContent = "";
            return true;
        };
        CRegister.checkSurname = function (cognome) {
            if (!cognome || cognome.value.trim() === "") { // Controlla se è nullo o vuoto
                if (cognome)
                    cognome.style.border = "1px solid red";
                credentialsFeedback.textContent = "Il cognome è obbligatorio";
                return false;
            }
            // Rimuove gli spazi prima e dopo il cognome
            var cognomeTrimmed = cognome.value.trim();
            // Controlla la lunghezza del cognome
            if (cognomeTrimmed.length < 2 || cognomeTrimmed.length > 50) {
                cognome.style.border = "1px solid red";
                credentialsFeedback.textContent = "Il cognome deve essere compreso tra 2 e 50 caratteri.";
                return false;
            }
            // Definisci un pattern che consente lettere latine, arabe, giapponesi e altri caratteri Unicode
            var pattern = /^[A-Za-z\u0600-\u06FF\u4e00-\u9faf\u0800-\u4e00]+$/;
            // Verifica se il valore del campo rispetta il pattern
            if (!pattern.test(cognomeTrimmed)) {
                cognome.style.border = "1px solid red";
                credentialsFeedback.textContent = 'Inserire un cognome valido';
                return false;
            }
            cognome.style.border = "1px solid green";
            credentialsFeedback.textContent = "";
            return true;
        };
        CRegister.checkSex = function (sesso) {
            // Verifica se l'elemento sesso è null o non selezionato
            if (!sesso || sesso.value === "") {
                if (sesso)
                    sesso.style.border = "1px solid red";
                credentialsFeedback.textContent = "Il sesso è obbligatorio";
                return false;
            }
            sesso.style.border = "1px solid green";
            credentialsFeedback.textContent = "";
            return true;
        };
        CRegister.checkData = function (dataNascita) {
            if (!dataNascita || dataNascita.value === "") {
                if (dataNascita)
                    dataNascita.style.border = "1px solid red";
                credentialsFeedback.textContent = "La data di nascita è obbligatoria";
                return false;
            }
            // Confronta la data con la data di oggi
            var today = new Date();
            var selectedDate = new Date(dataNascita.value);
            // Se la data di nascita è nel futuro
            if (selectedDate > today) {
                dataNascita.style.border = "1px solid red";
                credentialsFeedback.textContent = "La data di nascita non può essere nel futuro";
                return false;
            }
            dataNascita.style.border = "1px solid green";
            credentialsFeedback.textContent = "";
            return true;
        };
        CRegister.checkNation = function (idNazione) {
            if (!idNazione || idNazione.value === "" || idNazione.value === "0") {
                if (idNazione)
                    idNazione.style.border = "1px solid red";
                credentialsFeedback.textContent = "La nazione è obbligatoria";
                return false;
            }
            idNazione.style.border = "1px solid green";
            credentialsFeedback.textContent = "";
            return true;
        };
        return CRegister;
    }());
});
