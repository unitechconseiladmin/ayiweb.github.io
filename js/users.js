/*------------------ formulaire inscription -------------------------*/

let currentSection = 0;
let sections;

function nextSection() {
    sections[currentSection].classList.remove('active');
    currentSection = (currentSection + 1) % sections.length;
    sections[currentSection].classList.add('active');
}

function prevSection() {
    if (sections && sections.length > 0) {
        sections[currentSection].classList.remove('active');
        currentSection = (currentSection - 1 + sections.length) % sections.length;
        sections[currentSection].classList.add('active');
    } else {
        console.error('No sections found or sections not properly initialized.');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('.formulaire');
    const contentForm = `
    <div class="form">
        <div>
             <button class="formClose" onclick="formcClose()">X</button>
        <div class="btninscription">
            <button id="showlogin" onclick="showlogin()">Konekte</button>
            <button id="showsignup" onclick="showsignup()">Enskripsyon</button>
        </div>
        <div id="login">
            <h1 id="displayuser">Konekte</h1>
            <div class="loginsection">
            <div class="input"><input type="text" id="login-phone" placeholder="Nom  itilizatè ou / Email" required/></div>
        <div class="input"><input type="password" id="login-password" placeholder="mot de passe" required/></div>
        <button onclick="login()">Mwen Konekte</button>
            </div>
        </div>
        <div id="signup">
        <h1>Enskripsyon</h1>
        <p id="result">Votre code</p>
            <section class="form-section active">
                <div class="input"><input type="text" id="names" placeholder="Kijan ou rele" required/></div>
                <div class="input"><input type="email" id="emails" placeholder="Mete email ou" required/></div>
                <div class="input"><input type="text" id="utilisateur" placeholder="Nom itilizatè" required/></div>
                <div class="logbtn">
                <button type="button" class="first" onclick="nextSection()">Swivan</button>
                </div>
            </section>
            <section class="form-section">
                <div class="input select">
                    <select id="country" onchange="updateFlag()">
                        <option value="">Selectionnez votre pays</option>
                        <option value="ht" title="+509">Haiti</option>
                        <option value="us" title="+1">United States</option>
                        <option value="do" title="+1">Republique dominicaine</option>
                        <option value="ca" title="+1">Canada</option>
                        <option value="fr" title="+33">France</option>
                        <option value="uk" title="+44">United Kingdom</option>
                        <!-- Add more countries as needed -->
                        <option value="bf" title="+226">Burkina Faso</option>
                        <option value="bi" title="+257">Burundi</option>
                        <option value="cm" title="+237">Cameroon</option>
                        <option value="cf" title="+236">Central African Republic</option>
                        <option value="dz" title="+213">Algeria</option>
                        <option value="ao" title="+244">Angola</option>
                        <option value="bj" title="+229">Benin</option>
                        <option value="bw" title="+267">Botswana</option>
                        <option value="cv" title="+238">Cape Verde</option>
                        <option value="cf" title="+236">Central African Republic</option>
                        <option value="td" title="+235">Chad</option>
                        <option value="km" title="+269">Comoros</option>
                        <option value="cg" title="+242">Congo</option>
                        <option value="dj" title="+253">Djibouti</option>
                        <option value="eg" title="+20">Egypt</option>
                        <option value="gq" title="+240">Equatorial Guinea</option>
                        <option value="er" title="+291">Eritrea</option>
                        <option value="et" title="+251">Ethiopia</option>
                    </select>
                    <span id="selected-flag" class="flag flag-icon"></span>
                </div>
                <div class="input phone">
                    <p id="p"></p>
                    <input type="text" id="phones" placeholder="Nimewo telefòn ou" required/>
                </div>
                <div class="logbtn">
                    <button type="button" onclick="prevSection()">Dèyè</button>
                    <button type="button" onclick="nextSection()">Swivan</button>
                </div>
            </section>
            <section class="form-section">
                <div class="input"><input type="password" id="passwords" placeholder="Antre yon kòd" required/></div>
                <div class="input"> <input type="text" id="codePromo" placeholder="Kod moun ki refere ou" required/></div>
                <input type="number" id="pointss" value="0" style="display: none;" disabled />
                <p id="showimg"></p>
                <div class="logbtn">
                    <button type="button" onclick="prevSection()">Dèyè</button>
                    <button onclick="signup()" id="signupBtn">Enskri</button>
                </div>            
            </section>
            <div id="user-data-container" style="display: none;">
                <h2>Signed Up User Data</h2>
                <p>Email: <span id="user-email"></span></p>
                <p>Username: <span id="user-username"></span></p>
                <p>Points: <span id="user-points"></span></p>
            </div>
        </div>
        </div>
    </div>
    `;
    form.innerHTML = contentForm;

    form.innerHTML = contentForm;
    sections = document.querySelectorAll('.form-section');
    if (sections.length > 0) {
        sections[0].classList.add('active');
    } else {
        console.error('No form sections found.');
    }
});
/*------------------Fin formulaire inscription -------------------------*/



function displayUserDetails(userData) {
    var image = document.getElementById('image');
    var name = document.getElementById('name');
    var nameuser = document.getElementById('nameuser');
    var phone = document.getElementById('phone');
    var email = document.getElementById('email');
    var rcElement = document.getElementById('rc'); // Renommé pour plus de clarté

    // Format rc pour afficher en K ou M
    var rcFormatted = formatPoints(userData.Points);

    // Vérifier si une image est disponible, sinon utiliser une image par défaut
    if(userData.Image) {
        image.src = userData.Image;
    } else {
        // Image par défaut
        image.src = '/images/icon.png';
    }

    // Affichage des détails de l'utilisateur
    name.textContent = `${userData.Name}`;
    nameuser.textContent = `${userData.Username}`;
    phone.textContent = `${userData.Phone}`;
    email.textContent = `${userData.Email}`;
    rcElement.textContent = rcFormatted;
}

function formatPoints(points) {
    if (points >= 1000000) {
        // Si les points sont supérieurs ou égaux à 1 million, affiche "xM" (1 million)
        return (points / 1000000).toFixed(1) + 'M';
    } else if (points >= 1000) {
        // Si les points sont supérieurs ou égaux à 1000, affiche "xK" (1 millier)
        return (points / 1000).toFixed(1) + 'K';
    } else {
        // Sinon, affiche simplement le nombre de points
        return points.toString();
    }
}


// Événement au chargement du DOM
document.addEventListener('DOMContentLoaded', function () {
    // Récupérer les données utilisateur depuis le stockage local
    var userData = JSON.parse(localStorage.getItem('userData'));
    
    function fetchUserDataFromFirebase(email) {
        var usersRef = firebase.database().ref("users");

        usersRef.orderByChild('Email').equalTo(email).once('value')
            .then(function (snapshot) {
                if (snapshot.exists()) {
                    var userDataSnapshot = snapshot.val();
                    var userId = Object.keys(userDataSnapshot)[0];

                    if (userId) {
                        // Mise à jour des données utilisateur dans le stockage local
                        var updatedUserData = userDataSnapshot[userId];
                        localStorage.setItem('userData', JSON.stringify(updatedUserData));

                        // Affichage des détails de l'utilisateur sur la page de profil
                        displayUserDetails(updatedUserData);
                        document.getElementById('connecte').style.display='block';
                        document.getElementById('logout').style.display='none';
                        
                    } else {
                        console.log('User ID not found.');
                        document.getElementById('creatacount').style.color='gray';
                    }
                } else {
                    console.log("No user found with email:", email);
                }
            })
            .catch(function (error) {
                console.error('Error fetching user data from Firebase:', error);
            });
    }

    // Vérifier si l'utilisateur est connecté
    var isLoggedIn = userData !== null && userData !== undefined;
    
    if (isLoggedIn) {
        var email = userData.Email;
        fetchUserDataFromFirebase(email);
        document.getElementById('creataccount').style.display='none';
        document.getElementById('creatacount').style.color='orangered';
    } else {
        // Utilisateur non connecté, afficher un message ou rediriger vers la page de connexion
        console.log("User is not logged in. Show a message or redirect to login page.");
        document.getElementById('creataccount').style.display='block';
    }
});





/*-----------------------------login--------------*/



// Define the saveUserDataLocally function
function saveUserDataLocally(userData) {
  localStorage.setItem('userData', JSON.stringify(userData));
}
// Fonction de connexion mise à jour
function login() {
    var emailOrUsername = document.getElementById('login-phone').value; // Email ou nom d'utilisateur
    var password = document.getElementById('login-password').value;
    var dialog = document.querySelector(".alert");
    var load = document.querySelector(".load");
    var alertTitle = document.querySelector(".alertTitle");
    var alertp = document.querySelector(".alertp");

    // Vérifiez si email/nom d'utilisateur et mot de passe sont fournis
    if (emailOrUsername && password) {
        var queryByEmail = database.ref('users').orderByChild('Email').equalTo(emailOrUsername);
        var queryByUsername = database.ref('users').orderByChild('Username').equalTo(emailOrUsername);

        // Rechercher d'abord par email
        queryByEmail.once('value')
            .then((snapshot) => {
                if (snapshot.exists()) {
                    handleLogin(snapshot);
                } else {
                    // Si pas trouvé par email, essayer avec le nom d'utilisateur
                    return queryByUsername.once('value');
                }
            })
            .then((snapshot) => {
                if (snapshot && snapshot.exists()) {
                    handleLogin(snapshot);
                } else {
                    // Aucun utilisateur trouvé
                    console.error('User not found');
                    dialog.style.display = 'block';
                    alertTitle.textContent = 'Unitech Conseil';
                    alertp.textContent = 'Cet utilisateur n\'existe pas. Cliquez sur le bouton rouge pour vous inscrire.';
                }
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    } else {
        // Email/nom d'utilisateur et mot de passe requis
        console.error('Email/Username and password are required for login');
        dialog.style.display = 'block';
        alertTitle.textContent = 'Unitech Conseil';
        alertp.textContent = 'L\'adresse e-mail/nom d\'utilisateur et le mot de passe sont requis pour se connecter.';
    }
}

function handleLogin(snapshot) {
    var userData = null;
    snapshot.forEach((userSnapshot) => {
        userData = userSnapshot.val();
    });

    // Comparer les mots de passe
    if (userData.Password.toString() === document.getElementById('login-password').value) {
        // Mot de passe correct
        console.log('Login successful');
        var dialog = document.querySelector(".alert");
        var alertTitle = document.querySelector(".alertTitle");
        var alertp = document.querySelector(".alertp");
        dialog.style.display = 'block';
        alertTitle.textContent = 'Bienvenue ' + userData.Name;
        alertp.textContent = 'Merci!!';
        window.location.reload();
        // Sauvegarder les données utilisateur dans le stockage local
        saveUserDataLocally(userData);
    } else {
        // Mot de passe incorrect
        console.error('Incorrect password');
        var dialog = document.querySelector(".alert");
        var alertTitle = document.querySelector(".alertTitle");
        var alertp = document.querySelector(".alertp");
        dialog.style.display = 'block';
        alertTitle.textContent = 'Unitech Conseil';
        alertp.textContent = 'Mot de passe incorrect.';
    }
}

  
  
  



  function signup() {
    // Generate a random number between 10 and 10009
    var randomNumber = Math.floor(Math.random() * 10000) + 10;

    // Generate a random alphanumeric string
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var randomAlpha = '';
    for (var i = 0; i < 3; i++) {
        randomAlpha += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Display the random result on the page
    var result = 'uc-' + randomAlpha + randomNumber;
    document.getElementById('result').textContent = result;

    var name = document.getElementById('names').value;
    var username = document.getElementById('utilisateur').value; // Nom d'utilisateur
    var email = document.getElementById('emails').value;
    var phone = document.getElementById('phones').value;
    var password = document.getElementById('passwords').value;
    var codePromo = document.getElementById('codePromo').value;
    var p = document.getElementById('p').innerText; // Add this line

    // Variables
    var dialog = document.querySelector(".alert");
    var alertTitle = document.querySelector(".alertTitle");
    var alertp = document.querySelector(".alertp");

    // Check if email exists
    firebase.database().ref('users').orderByChild('Email').equalTo(document.getElementById('emails').value).once('value')
        .then(function(emailSnapshot) {
            if (emailSnapshot.exists()) {
                dialog.style.display='block';
                alertTitle.textContent='Email existe deja';
                alertp.textContent='essayez un autre';
                console.error('Email already exists');
                // You can handle the error accordingly, display a message to the user, etc.
                return;
            }

            // Check if phone number exists
            firebase.database().ref('users').orderByChild('Name').equalTo(name).once('value')
                .then(function(phoneSnapshot) {
                    if (phoneSnapshot.exists()) {
                        dialog.style.display='block';
                        alertTitle.textContent='Nom existe deja';
                        alertp.textContent='essayez un autre';
                        console.error('Name already exists');
                        // You can handle the error accordingly, display a message to the user, etc.
                        return;
                    }

                    firebase.database().ref('users').orderByChild('CodeReference').equalTo(codePromo).once('value')
                    .then(function(snapshot) {
                        if (snapshot.exists()) {
                            // If the promo code exists, add points to the referred user
                            snapshot.forEach(function(childSnapshot) {
                                var referredUserId = childSnapshot.key;
                                var referredUserPoints = childSnapshot.val().Points || 0;
                                var referredUserReferrals = childSnapshot.val().NbRef || 0;
                
                                // Add 10 points
                                var updatedPoints = referredUserPoints + 100;
                                var updatedRef = referredUserReferrals + 1;
                
                                // Update the referred user's points and number of referrals
                                firebase.database().ref('users/' + referredUserId).update({
                                    Points: updatedPoints,
                                    NbRef: updatedRef
                                });
                
                                console.log('Points added to referred user');
                            });
                        } else {
                            console.log('Invalid promo code');
                        }
                    })
                    .catch(function(error) {
                        console.error('Error checking promo code:', error);
                    });
                
                    // Save user details
                    firebase.database().ref('users/' +name).set({
                        Email: email,
                        Password: password,
                        Name: name,
                        Username: username,
                        Phone: p + phone, // Include the country code in the phone number
                        Points: 100,
                        CodePromo: codePromo,
                        CodeReference: result
                    });
                    
                    console.log('Signup successful');
                    document.getElementById('login').style.display='block';
                    document.getElementById('signup').style.display='none';
                    dialog.style.display='block';
                    alertTitle.textContent='Unitech Conseil';
                    alertp.textContent='Connexion réussie.';
                    window.location.reload;
                
                })
                .catch(function (error) {
                    console.error('Signup failed', error);
                });
        })
        .catch(function (error) {
            console.error('Signup failed', error);
        });
}



  function updateFlag() {
    var countrySelect = document.getElementById('country');
    var selectedCountry = countrySelect.value;
    var flagElement = document.getElementById('selected-flag');
    flagElement.className = 'flag flag-icon flag-icon-' + selectedCountry;
    
    var selectedCountryTitle = countrySelect.options[countrySelect.selectedIndex].title;
    document.getElementById('p').textContent = selectedCountryTitle;
    
     // Ajoutez votre condition pour ne prendre en compte que les pays francophones
     var frenchSpeakingCountries = ['ht', 'fr']; // Ajoutez d'autres codes de pays francophones au besoin
    var isFrenchSpeaking = frenchSpeakingCountries.includes(selectedCountry);
    
    if (isFrenchSpeaking) {
        document.getElementById('msg').textContent = 'Vous devez parler francais au moins';
    }
    // Set the phone input value to the selected country code
    //document.getElementById('phone').value = parseInt(selectedCountryTitle); // Add parseInt here
    }
    
    // Initial call to updateFlag when the page loads
    updateFlag();
