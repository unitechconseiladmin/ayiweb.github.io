let decodedTitle = ''; // Déclarez une variable pour stocker decodedTitle
let storedTitle;       // Variable pour stocker le titre de l'article

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const title = urlParams.get('l'); // Récupération du paramètre "l"

    if (title) {
        // Remplacer les underscores par des espaces et les tirets par des apostrophes
const decodedTitle = title
.replace(/_/g, " ")  // Remplacer les underscores par des espaces
.replace(/-/g, "'"); // Remplacer les tirets par des apostrophes


        // Mise à jour du titre de la page
        const titleElement = document.getElementById('title');
        if (titleElement) {
            titleElement.innerHTML = decodedTitle;
        }

        // Récupération des données Firebase
        const presentationsRef = database.ref('Livres/' + decodedTitle);
        presentationsRef.once('value', function (snapshot) {
            const presentationsData = snapshot.val();
            if (presentationsData) {
                for (const currentKey in presentationsData) {
                    const presentationData = presentationsData[currentKey];

                    if (presentationsData.Title === decodedTitle) {
                        // Cache l'écran de chargement et affiche les données
                        document.getElementById('splash-screen').style.display = 'none';

                        // Mise à jour des éléments avec les données récupérées
                        document.getElementById('img').src = presentationsData.Images;
                        document.getElementById('soustitle').textContent = presentationsData.SousTitre || '';
                        document.getElementById('prix').textContent = presentationsData.Prix || '';
                        document.getElementById('details').textContent = presentationsData.Details;
                        document.getElementById('lien').textContent = presentationsData.Telecharger || '0';
                        document.getElementById('likecount').textContent = presentationsData.likes || '0';
                        document.getElementById('download').textContent = presentationsData.downloadCount || '0';
                        document.getElementById('commentcount').textContent = (presentationsData.Comments ? Object.keys(presentationsData.Comments).length : 0) || '0';

                        // Met à jour le lien de l'image
                        document.getElementById('imageshow').href = presentationsData.Images;

                        // Mise à jour des balises meta
                        const ogImageMeta = document.getElementById('ogImage');
                        if (ogImageMeta) {
                            ogImageMeta.setAttribute('content', presentationsData.Images);
                        }
                    }
                }
            } else {
                console.log("Aucune donnée trouvée pour ce titre.");
            }
        });
    } else {
        console.log('Paramètre "l" non trouvé dans l\'URL.');
    }
});


function telecharger() {
    var userData = JSON.parse(localStorage.getItem('userData'));
    var formulaire = document.querySelector('.formulaire');
    var iconSpan = document.getElementById('icon');
    
    // Récupérer le prix à chaque clic
    var prix = parseFloat(document.querySelector('#prix').innerHTML);
    var link = document.querySelector('#lien').textContent;
    var title = document.querySelector('#title').textContent;

    console.log('Prix:', title);
    
    if (userData) {
        console.log('Points avant déduction:', userData.Points);

        // Vérifier si l'utilisateur a suffisamment de points pour télécharger
        if (userData.Points >= prix) {
            // Déduire le prix des points de l'utilisateur
            userData.Points -= prix;
            console.log('Nouveaux points après déduction:', userData.Points);

            // Mettre à jour localStorage
            localStorage.setItem('userData', JSON.stringify(userData));

            // Mettre à jour les points de l'utilisateur dans Firebase
            var userRef = firebase.database().ref('users/' + userData.Name);
            userRef.update({
                Points: userData.Points
            }).then(() => {
                console.log('Points mis à jour dans Firebase');

                // Incrémenter le nombre de téléchargements
                var bookRef = firebase.database().ref('Livres/' + title);
                bookRef.child('downloadCount').transaction(function (currentDownloadCount) {
                    return (currentDownloadCount || 0) + 1;
                }).then(() => {
                    console.log('Nombre de téléchargements incrémenté pour ' + title);
                    window.location = link; // Redirection vers le lien de téléchargement
                }).catch((error) => {
                    console.error('Erreur lors de l\'incrémentation du nombre de téléchargements :', error);
                    window.location();
                });
            }).catch((error) => {
                console.error('Erreur lors de la mise à jour des points :', error);
            });
        } else {
            alert('Vous n\'avez pas assez de points pour télécharger cet élément.');
        }
    } else {
        if (formulaire.style.display === 'block') {
            formulaire.style.display = 'none';
            iconSpan.innerHTML = 'Profile';
        } else {
            formulaire.style.display = 'block';
            iconSpan.innerHTML = 'Profile &#10006;';
        }
    }
}




// Fonction d'ajout de commentaire
function addComment() {
    var username = document.getElementById('name').textContent; // Utilisez textContent plutôt qu'innerHTML pour récupérer du texte

    var titleElement = document.getElementById('title'); // Récupérez l'élément avec l'ID 'title'
    var title = titleElement ? titleElement.textContent : ''; // Vérifiez si l'élément existe et récupérez le texte

    // Vérifiez si le titre est valide
    if (title) {
        // Décoder le titre
        const decodedTitle = title
            .replace(/_/g, " ")  // Remplacer les underscores par des espaces
            .replace(/-/g, "'"); // Remplacer les tirets par des apostrophes

        // Incrémentez la valeur de 'compte' dans le localStorage
        var compte = localStorage.getItem('compte') ? parseInt(localStorage.getItem('compte')) : 0;
        compte++;
        localStorage.setItem('compte', compte);

        // Référence Firebase
        var articleRef = firebase.database().ref('Livres/' + decodedTitle);
        var commentsRef = articleRef.child('Comments/' + username + compte);

        // Enregistrer le commentaire
        var timestamp = new Date().toISOString();
        var commentText = document.getElementById('comment').value;

        if (commentText) {
            articleRef.once('value', function (snapshot) {
                // Si l'article n'existe pas, initialisez-le avec un titre
                if (!snapshot.exists()) {
                    articleRef.set({ title: decodedTitle });
                }

                // Ajoutez le commentaire sous l'utilisateur avec 'compte'
                commentsRef.set({
                    username: username,
                    text: commentText,
                    timestamp: timestamp
                });

                // Effacez le champ de commentaire après l'ajout
                document.getElementById('comment').value = '';
            });
        } else {
            console.error('Erreur : le champ commentaire est vide.');
        }
    } else {
        console.error('Erreur : titre non défini ou vide.');
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Vérifiez si la variable 'title' est définie
     // Supposons que 'title' soit un élément avec un ID
    var titleElement = document.getElementById('title'); // Récupérez l'élément avec l'ID 'title'
    var title = titleElement ? titleElement.textContent : ''; // Récupérez le texte de l'élément

    if (typeof title !== 'undefined') {
        // Décoder le titre
        const decodedTitle = title
            .replace(/_/g, " ")  // Remplacer les underscores par des espaces
            .replace(/-/g, "'"); // Remplacer les tirets par des apostrophes

        // Utiliser decodedTitle pour l'élément titre
        var articleRef = firebase.database().ref('Livres/' + decodedTitle);
        var commentsRef = articleRef.child('Comments');

        // Écouter les nouveaux commentaires et mettre à jour l'interface utilisateur
        commentsRef.on('value', function(snapshot) {
            var commentsData = snapshot.val();
            console.log(commentsData);
            if (commentsData) {
                // Convertir les données de commentaires en tableau
                var commentsArray = Object.values(commentsData);

                // Inverser le tableau pour afficher le dernier commentaire en premier
                commentsArray.reverse();

                // Mettre à jour l'interface utilisateur avec le tableau inversé de commentaires
                var commentsContainer = document.getElementById('comments');
                commentsContainer.innerHTML = ''; // Effacer les commentaires existants

                commentsArray.forEach(function(comment) {
                    var commentElement = document.createElement('div');
                    commentElement.classList.add('comment'); // Ajout d'une classe pour le style

                    // Afficher le nom d'utilisateur et le texte du commentaire
                    commentElement.innerHTML = `
                        <div>
                            <i class="fa fa-user"></i>
                            <span class="userComment">${comment.username}</span>
                        </div>
                        <p>${comment.text}</p>
                    `;

                    // Afficher la marque de temps du commentaire
                    var timestampElement = document.createElement('p');
                    var timestamp = new Date(comment.timestamp);

                    // Calculer la différence de temps
                    var now = new Date();
                    var timeDifference = now - timestamp;
                    var hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

                    if (hoursDifference >= 24) {
                        // Si plus de 24 heures, afficher le nombre de jours
                        var daysDifference = Math.floor(hoursDifference / 24);
                        timestampElement.textContent = `Commenté il y a ${daysDifference} jour(s) à ${timestamp.toLocaleTimeString()}`;
                    } else {
                        // Sinon, afficher le nombre d'heures écoulées
                        timestampElement.textContent = `Commenté il y a ${hoursDifference} heure(s) à ${timestamp.toLocaleTimeString()}`;
                    }

                    // Ajouter le commentaire et la marque de temps au conteneur
                    commentsContainer.appendChild(commentElement);
                    commentsContainer.appendChild(timestampElement);
                });
            } else {
                console.log("Aucun commentaire trouvé.");
            }
        });
    } else {
        console.error('Le titre n\'est pas défini.');
    }

    // Reste de votre code existant...
});


// Fonction pour partager sur WhatsApp
function share() {
    var userData = JSON.parse(localStorage.getItem('userData'));
    var urlDeLaPage = window.location.href;
    var encodedUrl = encodeURIComponent(urlDeLaPage);

    // Récupération du titre
    var titleElement = document.getElementById('title');
    var title = titleElement ? titleElement.textContent.trim() : '';
    console.log(title);

    // Récupération du sous-titre
    var stitreElement = document.querySelector('#soustitle');
    var stitre = stitreElement ? stitreElement.textContent.trim() : '';

    // Récupération des détails
    var detailsElement = document.getElementById('details');
    var details = detailsElement ? detailsElement.textContent.trim() : '';

    // Récupération des messages
    var msgs ='Cliquez sur lien pour telecharger le livre';

    var msgs2 ='Partager avec vos amis aussi, ou dans d"autres groupes';

    // Construction de l'URL pour WhatsApp
    url = `https://wa.me/?text=${title}%0a%0a${stitre}%0a%0a${details}%0a%0a_${msgs}_%0a%0a${encodedUrl}%0a%0a_${msgs2}_%0a`;

    // Ouverture de la fenêtre WhatsApp
    window.open(url, '_blank');

    // Ajouter 10 points à l'utilisateur dans Firebase
    var userRef = firebase.database().ref('users/' + userData.Name);

    // Récupère les points actuels de Firebase
    userRef.child('Points').once('value').then(function(snapshot) {
        var currentPoints = snapshot.val() || 0; // Si aucun point, initialise à 0
        var newPoints = currentPoints + 10; // Ajoute 10 points
       
        // Mise à jour des points dans Firebase
        userRef.update({
            Points: newPoints
        }).then(function() {
            console.log(`Les points ont été mis à jour avec succès. L'utilisateur a maintenant ${newPoints} points.`);

            // Mettre à jour localStorage pour conserver les points localement
            localStorage.setItem('userPoints', newPoints);

            // Met à jour les points dans userData pour l'utilisation future
            userData.Points = newPoints;
            localStorage.setItem('userData', JSON.stringify(userData));
        }).catch(function(error) {
            console.error("Erreur lors de la mise à jour des points dans Firebase :", error);
        });
    }).catch(function(error) {
        console.error("Erreur lors de la récupération des points actuels :", error);
    });
}

// Fonction pour écouter les mises à jour en temps réel des points
function listenToPointsUpdate() {
    var userData = JSON.parse(localStorage.getItem('userData'));
    var userRef = firebase.database().ref('users/' + userData.Name);

    // Écouter les changements de points en temps réel
    userRef.child('Points').on('value', function(snapshot) {
        var updatedPoints = snapshot.val() || 0;
        console.log(`Points mis à jour en temps réel: ${updatedPoints}`);

        // Mettre à jour l'interface utilisateur avec les nouveaux points
        document.getElementById('rc').textContent = updatedPoints;
    });
}

// Appeler la fonction pour écouter les mises à jour en temps réel au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    listenToPointsUpdate();
});




function likebtn() {
    // Supposons que 'title' soit un élément avec un ID
    var titleElement = document.getElementById('title'); // Récupérez l'élément avec l'ID 'title'
    var title = titleElement ? titleElement.textContent : ''; // Récupérez le texte de l'élément

    console.log('Valeur actuelle de title :', title); // Vérifiez ce que contient la variable 'title'

    // Vérifiez que 'title' est bien une chaîne de caractères
    if (typeof title === 'string' && title.length > 0) {
        // Décoder le titre
        const decodedTitle = title
            .replace(/_/g, " ")  // Remplacer les underscores par des espaces
            .replace(/-/g, "'"); // Remplacer les tirets par des apostrophes

        console.log('Titre décodé :', decodedTitle);

        // Référence à l'article dans la base de données
        var postRef = database.ref('Livres/' + decodedTitle);
        var likeCountElement = document.getElementById('likecount');

        // Utiliser une transaction pour mettre à jour le nombre de "likes"
        postRef.transaction(function (data) {
            if (data) {
                // Incrémenter le nombre de "likes"
                data.likes = (data.likes || 0) + 1;
            } else {
                // Initialiser les "likes" si aucune donnée n'existe
                data = { likes: 1 };
            }
            return data;
        }, function (error, committed, snapshot) {
            if (committed) {
                // Mettre à jour l'interface utilisateur avec le nouveau nombre de "likes"
                updateCounts(likeCountElement, snapshot.val());
            } else {
                console.error('La transaction a échoué :', error);
            }
        });
    } else {
        console.error('Le titre n\'est pas une chaîne de caractères ou est vide, valeur actuelle :', title);
    }
}

function updateCounts(likeCountElement, data) {
    console.log('Updating counts:', data);
    likeCountElement.innerText = data.likes || 0;  // Mettre à jour l'affichage du nombre de "likes"
}

// Assurez-vous que les éléments existent au chargement de la page
window.onload = function() {
    var likeCountElement = document.getElementById('likecount');
    // Initialiser l'affichage des "likes" à 0
    updateCounts(likeCountElement, { likes: 0 });
};
