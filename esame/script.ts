document.addEventListener("DOMContentLoaded", () => {
    // SLIDER
    const textContainer = document.getElementById("textContainer") as HTMLElement;
    const loginText = document.getElementById("loginText") as HTMLDivElement;
    const registerText = document.getElementById("registerText") as HTMLDivElement;
    // FORMS CONTAINERS
    const loginContainer = document.getElementById("LoginFormContainer") as HTMLDivElement;
    const registerContainer = document.getElementById("RegisterFormContainer") as HTMLDivElement;
    // FORMS
    const loginForm = document.getElementById("loginForm") as HTMLFormElement;
    const registerForm = document.getElementById("registerForm") as HTMLFormElement;
    // LINKS
    const loginLink = document.getElementById("switchRegisterMobile") as HTMLAnchorElement;
    const registerLink = document.getElementById("switchLoginMobile") as HTMLAnchorElement;
    //INPUTS
    const emailLogin = document.getElementById('loginEmail') as HTMLInputElement;
    const pswLogin = document.getElementById('loginPassword') as HTMLInputElement;
    //--------------------------------------------------------------------------------------------------------------------------------//
    const name = document.getElementById('name') as HTMLInputElement;
    const surname = document.getElementById('surname') as HTMLInputElement
    const sex = document.getElementById('sex') as HTMLSelectElement
    const nation = document.getElementById('nation') as HTMLSelectElement
    const birthDate = document.getElementById('birthDate') as HTMLSelectElement;
    const emailRegister = document.getElementById('registerEmail') as HTMLInputElement
    const pswRegister = document.getElementById('registerPassword') as HTMLInputElement
    //FEEDBACKLOGIN
    const emailFeedback = document.getElementById('feedbackEmail') as HTMLDivElement;
    const passwordFeedback = document.getElementById('feedbackPsw') as HTMLDivElement;
    //FEEDBACKREGISTER
    const credentialsFeedback = document.getElementById('feedbackAnagraphicData') as HTMLDivElement;
    //############################################################################################################
    // SUBMIT BOTTONS
    const switchToRegisterButton = document.getElementById("switchToRegister") as HTMLButtonElement;
    const switchToLoginButton = document.getElementById("switchToLogin") as HTMLButtonElement;
    //############################################################################################################ 
    //DA TABLET IN POI per evitare il bug di visualizzazione nei devTools
    window.addEventListener("resize", (): void => {
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
    switchToRegisterButton.addEventListener("click", (): void => {
        textContainer.classList.add("move-left");
        loginText.style.display = "none";
        registerText.style.display = "flex";
    });
    switchToLoginButton.addEventListener("click", (): void => {
        textContainer.classList.remove("move-left");
        loginText.style.display = "flex";
        registerText.style.display = "none";
    });
    //--------------------------------------------------------------------------------------------------------------------------------//
    // ANIMAZIONE DA MOBILE
    loginLink.addEventListener("click", (): void => {
        // Animazione di uscita per il form di login
        loginContainer.style.transition = "opacity 0.5s, transform 0.5s";
        loginContainer.style.opacity = "0";
        loginContainer.style.transform = "translateX(-80%)";

        // Dopo 0.5 secondi, nascondi il form di login e mostra quello di registrazione
        setTimeout(() => {
            loginContainer.style.display = "none";

            // Mostra il form di registrazione
            registerContainer.style.display = "flex";
            registerContainer.style.transition = "opacity 0.3s, transform 0.5s";
            registerContainer.style.opacity = "1";
            // Imposta l'entrata: inizia fuori a destra
            registerContainer.style.transform = "translateX(80%)";

            // Subito dopo, porta il form nella sua posizione finale
            setTimeout(() => {
                registerContainer.style.transform = "translateX(0)";
            }, 10);
        }, 500);
    });
    registerLink.addEventListener("click", (): void => {
        registerContainer.style.transition = "opacity 0.5s, transform 0.5s";
        registerContainer.style.opacity = "0";
        registerContainer.style.transform = "translateX(80%)";

        setTimeout(() => {
            registerContainer.style.display = "none";
            loginContainer.style.display = "flex";
            loginContainer.style.transition = "opacity 0.3s, transform 0.5s";
            loginContainer.style.opacity = "1";
            loginContainer.style.transform = "translateX(-80%)";
            setTimeout(() => {
                loginContainer.style.transform = "translateX(0)";
            }, 10);
        }, 500);
    });
    //############################################################################################################
    // VALIDAZIONE FORM LOGIN
    emailLogin.addEventListener("input", (): void => {
        CLogin.checkEmail(emailLogin);
    });
    pswLogin.addEventListener("input", (): void => {
        CLogin.checkPassword(pswLogin);
    });

    loginForm.addEventListener("submit", (e: Event): void => {
        if (!CLogin.checkEmail(emailLogin)) {
            e.preventDefault();
        }
        if (!CLogin.checkPassword(pswLogin)) {
            e.preventDefault();
        } else {
            const loginData = {
                email: emailLogin.value,
                password: pswLogin.value
            };
            console.log("Login JSON:", JSON.stringify(loginData));
            e.preventDefault();//rimuovilo per inviare i dati
        }

    });
    // // VALIDAZIONE FORM REGISTRAZIONE

    name.addEventListener("input", (): void => {
        CRegister.checkName(name);
    });
    surname.addEventListener("input", (): void => {
        CRegister.checkSurname(surname)
    });
    sex.addEventListener('input', (): void => {
        CRegister.checkSex(sex)
    });
    birthDate.addEventListener('input', (): void => {
        CRegister.checkData(birthDate)
    });
    nation.addEventListener('input', (): void => {
        CRegister.checkNation(nation)
    });
    emailRegister.addEventListener("input", (): void => {
        CLogin.checkEmail(emailRegister);
    });
    pswRegister.addEventListener("input", (): void => {
        CLogin.checkPassword(pswRegister);
    });


    registerForm.addEventListener("submit", (e: Event): void => {
        // Variabile per tracciare il numero di errori
        let errorCount = 0;

        // Esegui i controlli per per i messaggi di errore
        const NameValid = CRegister.checkName(name);
        const SurnameValid = CRegister.checkSurname(surname);
        const SexValid = CRegister.checkSex(sex)
        const BirthDateValid = CRegister.checkData(birthDate);
        const NationValid = CRegister.checkNation(nation);
        const EmailValid = CLogin.checkEmail(emailRegister);
        const PasswordValid = CLogin.checkPassword(pswRegister);

        if (!NameValid) errorCount++;
        if (!SurnameValid) errorCount++;
        if (!SexValid) errorCount++;
        if (!BirthDateValid) errorCount++;
        if (!NationValid) errorCount++;
        if (!EmailValid) errorCount++;
        if (!PasswordValid) errorCount++;

        // Se ci sono errori, mostra i messaggi generali
        if (errorCount > 1) {
            e.preventDefault();
            credentialsFeedback.textContent = `${errorCount} campi non validi`;
        }
        if (errorCount === 1) {

            credentialsFeedback.textContent = `${errorCount} campo non valido`;
        }

        if (NameValid && SurnameValid && SexValid && BirthDateValid && NationValid && EmailValid && PasswordValid) {
            const registerData = {
                nome: name.value,
                cognome: surname.value,
                sesso: sex.value,
                idNazione: nation.value,
                dataNascita: birthDate.value,
                email: emailRegister.value,
                password: pswRegister.value
            };
            console.log("Registrazione JSON:", JSON.stringify(registerData));
            e.preventDefault();  // Rimuovilo per inviare i dati
        }

    });
    //############################################################################################################//
    // ENUM
    enum Sesso {
        Maschile = 0,
        Femminile = 1
    }
    // INTERFACE
    interface IUtente {
        nome: string;
        cognome: string;
        sesso: Sesso;
        idNazione: number;
        dataNascita: string;
        email: string;
        password: string;
    }

    //LOGIN CLASS
    class CLogin implements Pick<IUtente, 'email' | 'password'> {
        email: string;
        password: string;

        constructor(email: string, password: string) {
            this.email = email;
            this.password = password;
        }

        public static checkEmail(emailInput: HTMLInputElement | null): boolean {
            if (!emailInput) {
                return false;
            }
            const email = emailInput.value;
            if (!email) {
                emailInput.style.border = "1px solid red";
                emailFeedback.textContent = "Email non fornita.";
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

            const invalidChars = /[(),:;<>[\] ]/;
            if (invalidChars.test(email)) {
                emailInput.style.border = "1px solid red";
                emailInput.style.color = "red";
                emailFeedback.textContent = "L'email contiene caratteri non validi.";
                return false;
            }

            // Se tutte le condizioni sono soddisfatte
            emailInput.style.border = "1px solid green";
            emailFeedback.textContent = "";  // Pulisce il messaggio d'errore in caso di successo
            return true;
        }
        public static checkPassword(passwordInput: HTMLInputElement | null): boolean {
            if (!passwordInput) {
                passwordFeedback.textContent = "Elemento password non fornito.";
                return false;
            }
            const password = passwordInput.value;
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
            passwordFeedback.textContent = "";  // Pulisce il messaggio d'errore in caso di successo
            return true;
        }
    }
    //REGISTER CLASS
    class CRegister implements Required<IUtente> {

        nome: string;
        cognome: string;
        sesso: Sesso;
        idNazione: number;
        dataNascita: string;
        email: string;
        password: string;

        constructor(nome: string, cognome: string, sesso: number, idNazione: number, dataNascita: string, email: string, password: string) {
            this.nome = nome;
            this.cognome = cognome;
            this.sesso = sesso;
            this.idNazione = idNazione;
            this.dataNascita = dataNascita;
            this.email = email;
            this.password = password;
        }

        public static checkName(nome: HTMLInputElement | null): boolean {
            if (!nome || nome.value.trim() === "") {  // Controlla se è nullo o vuoto
                if (nome) nome.style.border = "1px solid red";
                credentialsFeedback.textContent = "Il nome è obbligatorio";
                return false;
            }

            // Rimuove gli spazi prima e dopo il nome
            const nomeTrimmed = nome.value.trim();

            // Controlla la lunghezza del nome
            if (nomeTrimmed.length < 2 || nomeTrimmed.length > 50) {
                nome.style.border = "1px solid red";
                credentialsFeedback.textContent = "Il nome deve essere compreso tra 2 e 50 caratteri.";
                return false;
            }

            // Definisci un pattern che consente lettere latine, arabe, giapponesi e altri caratteri Unicode
            const pattern: RegExp = /^[A-Za-z\u0600-\u06FF\u4e00-\u9faf\u0800-\u4e00]+$/;

            // Verifica se il valore del campo rispetta il pattern
            if (!pattern.test(nomeTrimmed)) {
                nome.style.border = "1px solid red";
                credentialsFeedback.textContent = 'Inserire un nome valido';
                return false;
            }

            nome.style.border = "1px solid green";
            credentialsFeedback.textContent = "";
            return true;
        }
        public static checkSurname(cognome: HTMLInputElement | null): boolean {
            if (!cognome || cognome.value.trim() === "") {  // Controlla se è nullo o vuoto
                if (cognome) cognome.style.border = "1px solid red";
                credentialsFeedback.textContent = "Il cognome è obbligatorio";
                return false;
            }

            // Rimuove gli spazi prima e dopo il cognome
            const cognomeTrimmed = cognome.value.trim();

            // Controlla la lunghezza del cognome
            if (cognomeTrimmed.length < 2 || cognomeTrimmed.length > 50) {
                cognome.style.border = "1px solid red";
                credentialsFeedback.textContent = "Il cognome deve essere compreso tra 2 e 50 caratteri.";
                return false;
            }

            // Definisci un pattern che consente lettere latine, arabe, giapponesi e altri caratteri Unicode
            const pattern: RegExp = /^[A-Za-z\u0600-\u06FF\u4e00-\u9faf\u0800-\u4e00]+$/;

            // Verifica se il valore del campo rispetta il pattern
            if (!pattern.test(cognomeTrimmed)) {
                cognome.style.border = "1px solid red";
                credentialsFeedback.textContent = 'Inserire un cognome valido';
                return false;
            }

            cognome.style.border = "1px solid green";
            credentialsFeedback.textContent = "";
            return true;
        }
        public static checkSex(sesso: HTMLSelectElement | null): boolean {
            // Verifica se l'elemento sesso è null o non selezionato
            if (!sesso || sesso.value === "") {
                if (sesso) sesso.style.border = "1px solid red";
                credentialsFeedback.textContent = "Il sesso è obbligatorio";
                return false;
            }

            sesso.style.border = "1px solid green";
            credentialsFeedback.textContent = "";
            return true;
        }
        public static checkData(dataNascita: HTMLSelectElement | null): boolean {
            if (!dataNascita || dataNascita.value === "") {
                if (dataNascita) dataNascita.style.border = "1px solid red";
                credentialsFeedback.textContent = "La data di nascita è obbligatoria";
                return false;
            }
            // Confronta la data con la data di oggi
            const today = new Date();
            const selectedDate = new Date(dataNascita.value);

            // Se la data di nascita è nel futuro
            if (selectedDate > today) {
                dataNascita.style.border = "1px solid red";
                credentialsFeedback.textContent = "La data di nascita non può essere nel futuro";
                return false;
            }

            dataNascita.style.border = "1px solid green";
            credentialsFeedback.textContent = "";
            return true;
        }
        public static checkNation(idNazione: HTMLSelectElement | null): boolean {
            if (!idNazione || idNazione.value === "" || idNazione.value === "0") {
                if (idNazione) idNazione.style.border = "1px solid red";
                credentialsFeedback.textContent = "La nazione è obbligatoria";
                return false;
            }

            idNazione.style.border = "1px solid green";
            credentialsFeedback.textContent = "";
            return true;
        }

    }
});
