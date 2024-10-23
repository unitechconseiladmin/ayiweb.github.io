const dbRef = firebase.database().ref('Livres');

// Ajouter l'événement click à chaque bouton "Ajouter au panier"
// Ajouter l'événement click à chaque bouton "Ajouter au panier"
dbRef.once('value', (snapshot) => {
    //document.getElementById('splash-screen').style.display = 'none';
    const booksContainer = document.getElementById('books-container');
    const detailsItems = document.getElementById('details-items');
    const typeSelect = document.getElementById('type-select'); // Votre élément <select> pour les types

    let allBooks = [];
    let allTypes = new Set();

    snapshot.forEach(book => {
        const data = book.val();
        allBooks.push(data); // Stocker chaque livre

        if (data.Type) {
            allTypes.add(data.Type);
        }
    });

    const optionAll = document.createElement('option');
    optionAll.value = '';
    optionAll.textContent = 'All';
    typeSelect.appendChild(optionAll);

    allTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeSelect.appendChild(option);
    });

    const displayBooks = (books) => {
        booksContainer.innerHTML = ''; // Clear container before updating
        books.forEach(data => {
            const bookCard = document.createElement('div');
            bookCard.classList.add('book-card');
            console.log(data);
            // Ensure the title is defined, provide a fallback if it's undefined
            const safeTitle = data.Titre ? data.Titre.replace(/'/g, "\\'") : 'Unknown Title';
            
            bookCard.innerHTML = `
                <div class="image"><img src="${data.Images}" alt="${safeTitle}"></div>
                <h3 data-title="${safeTitle || data.Titre}">${safeTitle || data.Title}</h3>
                <p><span class="price">${data.Prix}</span> Rc</p>
                <p style="display:none;" class="lien">${data.Telecharger}</p>
                <p style="display:none;" data-title="${data.SousTitle || 'N/A'}">${data.SousTitle || 'N/A'}</p>
                <p class="details" style="display:none;">${data.Details || 'Non disponible'}</p>
                
                <div class="likes-comments">
                    <span class="downloads"><i class="fa-solid fa-download"></i> ${(data.downloadCount || '0')}</span>
                    <span class="likes"><i class="fa-solid fa-heart"></i> ${(data.Likes || '0')}</span>
                    <span class="comments"><i class="fa-solid fa-comment"></i> ${data.Comments ? Object.keys(data.Comments).length : 0}</span>
                </div>
                
                <div class="barBtn">
                    <i data-author="${data.Author || 'Unknown Author'}">${data.Author || 'Unknown Author'}</i>
                    <i style="display:none;" data-type="${data.Type || 'Unknown Type'}">${data.Type || 'Unknown Type'}</i>
                    <button style="display:none;" class="more" onclick="livres('${safeTitle}')"><i class="fa-solid fa-arrow-right"></i></button>
                </div>
            `;
            booksContainer.appendChild(bookCard);
        });
    };
    
    
    
    
    // Appeler la fonction avec votre tableau de livres
    displayBooks(allBooks);
    

    /*document.getElementById('search-bar').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredBooks = allBooks.filter(book => 
            book.Title.toLowerCase().includes(searchTerm)
        );
        displayBooks(filteredBooks);
    });*/

    typeSelect.addEventListener('change', (e) => {
        const selectedType = e.target.value;

        if (selectedType === '') {
            displayBooks(allBooks);
        } else {
            const filteredBooksByType = allBooks.filter(book => 
                book.Type === selectedType
            );
            displayBooks(filteredBooksByType);
        }
    });
});

function livres(encodedTitle) {
    // Decoding the title if necessary
    const decodedTitle = encodedTitle.replace(/_/g, " ").replace(/\\'/g, "'");

    // Remplacer les espaces par des underscores et les apostrophes par des tirets
const titleWithUnderscores = decodedTitle
.replace(/'/g, "-")  // Remplacer les apostrophes par des tirets
.replace(/\s/g, "_"); // Remplacer les espaces par des underscores


    // Log the updated title
    console.log(titleWithUnderscores);

    // Redirect to the new URL with the updated title
    window.location.href = `boutique/details.html?l=${encodeURIComponent(titleWithUnderscores)}`;
}



// Fonction pour soumettre un commentaire
function submitComment(title) {
    const commentField = document.getElementById(`newComment-${title}`);
    const comment = commentField.value.trim();

    if (comment) {
        const commentSection = document.getElementById(`commentSection-${title}`);
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');

        commentDiv.innerHTML = `
            <img src="user-avatar.jpg" alt="Avatar" class="avatar">
            <div class="comment-content">
                <p class="comment-text">${comment}</p>
                <span class="comment-time">Just now</span>
            </div>
        `;

        commentSection.appendChild(commentDiv);

        // Réinitialiser le champ de commentaire après la soumission
        commentField.value = '';

        // Mettre à jour le compteur de commentaires
        const commentCountElement = document.getElementById(`commentCount-${title}`);
        let commentCount = parseInt(commentCountElement.textContent) + 1;
        commentCountElement.textContent = commentCount;

        // Mettez à jour les commentaires dans Firebase
        const bookRef = dbRef.orderByChild('Title').equalTo(title);
        bookRef.once('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const bookKey = childSnapshot.key;
                const commentsRef = firebase.database().ref(`/AYIWEB/Livres/${bookKey}/Comments`);
                const newCommentKey = commentsRef.push().key; // Créez une nouvelle clé unique pour le commentaire

                commentsRef.child(newCommentKey).set(comment); // Enregistrez le commentaire
            });
        });
    }
}


// Fonction pour gérer le Like
function handleLike(title) {
    const likeCountElement = document.getElementById(`likeCount-${title}`);
    let likeCount = parseInt(likeCountElement.textContent) + 1;

    // Mettez à jour le compteur de likes localement
    likeCountElement.textContent = likeCount;

    // Mettez à jour le compteur de likes dans Firebase
    const bookRef = dbRef.orderByChild('Title').equalTo(title);
    bookRef.once('value', (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const bookKey = childSnapshot.key;
            const updates = {};
            updates[`/AYIWEB/Livres/${bookKey}/Likes`] = likeCount;
            firebase.database().ref().update(updates);
        });
    });
}

// Fonction pour gérer le Commentaire
function handleComment(title) {
    const comment = prompt("Ajouter un commentaire:");
    if (comment) {
        const commentSection = document.getElementById(`commentSection-${title}`);
        const commentDiv = document.createElement('div');
        commentDiv.textContent = comment;
        commentSection.appendChild(commentDiv);

        // Mettre à jour le compteur de commentaires
        const commentCountElement = document.getElementById(`commentCount-${title}`);
        let commentCount = parseInt(commentCountElement.textContent);
        commentCount++;
        commentCountElement.textContent = commentCount;
    }
}


function telecharger() {
    var userData = JSON.parse(localStorage.getItem('userData'));
    var formulaire = document.querySelector('.formulaire');
    var iconSpan = document.getElementById('icon');
    
    // Récupérer le prix à chaque clic
    var prix = parseFloat(document.querySelector('.dataprix').innerHTML);
    var link = document.querySelector('.Link').textContent;
    var title = document.querySelector('h3').textContent;

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


