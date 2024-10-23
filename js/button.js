function openMenu(){
    // Get the buttons and menu element
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");
    const menu = document.getElementById("menu");
    menu.style.display = "block";  // Make the menu visible
    setTimeout(() => {  // Delay to ensure the display change takes effect before animation
        menu.classList.remove('fade-out');
        menu.classList.add('fade-in');
    }, 10);
    openBtn.style.display = "none";  // Hide the open button
    closeBtn.style.display = "inline-block";  // Show the close button
}

function closeMenu(){
    // Get the buttons and menu element
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");
    const menu = document.getElementById("menu");
    menu.classList.remove('fade-in');
    menu.classList.add('fade-out');
    setTimeout(() => {
        menu.style.display = "none";  // Hide the menu after fade-out completes
    }, 500);  // Delay equal to transition time
    openBtn.style.display = "inline-block";  // Show the open button
    closeBtn.style.display = "none";  // Hide the close button
}

function button(){
    // Get the buttons and menu element
    const openBtn = document.getElementById("openBtn");
    const closeBtn = document.getElementById("closeBtn");
    const menu = document.getElementById("menu");
    menu.classList.remove('fade-in');
    menu.classList.add('fade-out');
    setTimeout(() => {
        menu.style.display = "none";  // Hide the menu after fade-out completes
    }, 500);  // Delay equal to transition time
    openBtn.style.display = "inline-block";  // Show the open button
    closeBtn.style.display = "none";  // Hide the close button
}


function openform(){
    document.querySelector('.formulaire').style.display='block';
    document.querySelector('.formulairechaine').style.display='none';
    document.querySelector('.alert').style.display='none';
}

function showlogin(){
    document.getElementById('login').style.display='block';
    document.getElementById('signup').style.display='none';
}

function showsignup(){
    document.getElementById('login').style.display='none';
    document.getElementById('signup').style.display='block';
}

function alertbtn(){
    window.location='/users/user.html';
}



function closeDialog(){
    document.querySelector('.alert').style.display='none';
    //document.querySelector('.formulaire').style.display='none';
}
function formcClose(){
    document.querySelector('.formulaire').style.display="none";
}

// Fonction de dÃ©connexion
function logout() {
    // Effacer les donnÃ©es utilisateur du stockage local
    localStorage.removeItem('userData');

    // Recharger la page aprÃ¨s la dÃ©connexion
    console.log("Logging out...");
    window.location.reload();
}