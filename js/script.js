// alert dialog
document.addEventListener('DOMContentLoaded', function () {
    var menu = document.querySelector('.alert');

    const content = `
                <div class="dialog-content">
                    <span class="close-button" onclick="closealert()">&times;</span>
                    <h2 class="alertTitle">Unitech Conseil</h2>
                    <p class="alertp">Vous etes un ami de Unitech conseil</p>
                    <button onclick="openform()" class="btnconnection">Connectez-vous</button>
                </div>
    `;
    menu.innerHTML = content;
 
});

// le nombre de temps pour faire disparaitre dialog
document.addEventListener('DOMContentLoaded', function () {
    // Fonction pour vÃ©rifier la visibilitÃ© de l'Ã©lÃ©ment
    function checkVisibility() {
        var monDiv = document.querySelector('.alert');
        if (monDiv && monDiv.style.display !== 'none') {
            monDiv.style.display = 'none'; // Cache le div
        }
    }

    // Appelle la fonction toutes les 1000 millisecondes (1 seconde)
    setInterval(checkVisibility, 5000);
});


document.addEventListener('DOMContentLoaded', () => {
    // Charger le contenu de l'aside une fois le DOM chargé
    var menu = document.getElementById('nav');
    var userData = JSON.parse(localStorage.getItem('userData'));
    var isLoggedIn = userData !== null; // VÃ©rifiez si userData est diffÃ©rent de null
    //var amount = isLoggedIn ? userData.Points * 0.005 : 0; // Assurez-vous que userData n'est pas null avant d'accÃ©der Ã  ses propriÃ©tÃ©s

    const content = `
         <!-- Buttons for toggling menu -->
                  <div class="btnMenu">
                <button id="openBtn" onclick="openMenu()"><i class="fa fa-bars"></i></button>
            </div>
            <nav id="menu">
                <button id="closeBtn" onclick="closeMenu()" style="display: none;"><i class="fa fa-close"></i></button>
            <div class="art-myuser">
                <div>
                    <img id="image" src="images/icon.png" alt="">
                </div>
                <div>
                    <div><p id="name"></p><p id="rc"></p></div>
                    <div><p id="nameuser"></p></div>
                    <div><p id="phone"></p></div>
                    <div><p id="email"></p></div>
                </div> 
                 ${isLoggedIn ? `
                    <p id="logout"><a onclick="logout()"><i class="fa fa-unlock"></i> Déconnectez</a></p>
                ` :  `<p id="connecte" onclick="openform()"><i class="fa fa-lock"></i>Connectez</p>
                `}
            </div>
                <ul>
                    <li onclick="button()"><a href="/index.html">Accueil</a></li>
                    <li onclick="button()"><a href="/Blog.html">Blog</a></li>
                    <li onclick="button()"><a href="/index.html#about">A propos</a></li>
                </ul>
            </nav>   
    `;
    menu.innerHTML = content;
    
});
