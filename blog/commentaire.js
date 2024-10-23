function courSuivant(){
    var next = document.getElementById('next');
    window.location = 'https://unitechconseil.online/'+next;
  }



  var compte = 0;
  function addComment() {
    var username = document.getElementById('name').innerHTML;
    var titleElement = decodedTitle;
    console.log(titleElement); // Check if it returns a valid element
    console.log(storedTitle)
     // RÃ©cupÃ©rez la valeur actuelle de compte Ã  partir de localStorage
     var compte = localStorage.getItem('compte');
     // Si compte n'est pas dÃ©fini dans localStorage, initialisez-le Ã  0
     compte = compte ? parseInt(compte) : 0;
     // IncrÃ©mentez la valeur de compte
     compte++;
 
     // Enregistrez la nouvelle valeur de compte dans localStorage
     localStorage.setItem('compte', compte);
  
  var articleRef = firebase.database().ref('Bolg/' +titleElement);
  var commentsRef = articleRef.child('Zcomments/' + username + compte);



    // Get the current timestamp
    var timestamp = new Date().toISOString();

    // Get input values\
    //var username = document.getElementById('name').innerHTML;
    var commentText = document.getElementById('comment').value;
    console.log(username);
    // Check if articleRef is properly defined
    if (articleRef) {
      // Check if the article already exists
      articleRef.once('value', function(snapshot) {
        if (!snapshot.exists()) {
          // Article doesn't exist, create it
          articleRef.set({
            title: titleElement,
            // Other article properties as needed
          });
        }

        // Push a new comment to the database
        commentsRef.set({
          username: username,
          text: commentText,
          timestamp: timestamp
        });

        // Clear input fields
       // document.getElementById('username').value = '';
        document.getElementById('comment').value = '';
      });
    } else {
      console.error('Error: articleRef is not properly defined.');
    }
  }




  document.addEventListener('DOMContentLoaded', function() {
    var titleElement = decodedTitle; // Supongo que decodedTitle es una variable definida en otro lugar de tu cÃ³digo
   

    var articleRef = firebase.database().ref('Bolg/' +titleElement);
    var commentsRef = articleRef.child('Zcomments');
    console.log(commentsRef)
    // Escuchar nuevos comentarios y actualizar la interfaz de usuario
    commentsRef.on('value', function(snapshot) {
        var commentsData = snapshot.val();
        console.log(commentsData);
        if (commentsData) {
            // Convertir los datos de comentarios a un array
            var commentsArray = Object.values(commentsData);

            // Invertir el array para mostrar el Ãºltimo comentario primero
            commentsArray.reverse();

            // Actualizar la interfaz de usuario con el array invertido de comentarios
            var commentsContainer = document.getElementById('comments');
            commentsContainer.innerHTML = ''; // Borrar comentarios existentes

            commentsArray.forEach(function(comment) {
                var commentElement = document.createElement('div');

                // Mostrar el nombre de usuario y el texto del comentario
                commentElement.innerHTML = `
                <div>
                    <i class="fa fa-user"></i>
                    <span class="userComment">${comment.username}</span>
                </div>
                <p>${comment.text}</p>`;

                // Mostrar la marca de tiempo del comentario
                var timestampElement = document.createElement('p');
                var timestamp = new Date(comment.timestamp);

                var now = new Date();
                var timeDifference = now - timestamp;
                var hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

                if (hoursDifference >= 24) {
                    // Si tiene mÃ¡s de 24 horas, mostrar el nÃºmero de dÃ­as
                    var daysDifference = Math.floor(hoursDifference / 24);
                    timestampElement.textContent = `Comentado hace ${daysDifference} dÃ­as a las ${timestamp.toLocaleTimeString()}`;
                } else {
                    // De lo contrario, mostrar la marca de tiempo tal como estÃ¡
                    timestampElement.textContent = `Comentado a las ${timestamp.toLocaleTimeString()}`;
                }

                commentsContainer.appendChild(commentElement);
                commentsContainer.appendChild(timestampElement);
            });
        }
    });

    // Resto de tu cÃ³digo existente...
});




    /*send message to whatsapp*/
    function share() {
      var urlDeLaPage = window.location.href;
      var encodedUrl = encodeURIComponent(urlDeLaPage);
      var replacedUrl = encodedUrl.replace(/\s/g, '_');
  
      var stitre = document.querySelector('.stitre').innerHTML;
      var encodedTitle = encodeURIComponent(stitre);
      var replacedTitle = encodedTitle.replace(/\s/g, '_');
  
      var details = document.getElementById('details').innerHTML;
      var encodedDetails = encodeURIComponent(details);
      var replacedDetails = encodedDetails.replace(/\s/g, '_');

      var msgs =document.getElementById('messages').innerHTML;
      var msgs2 = document.getElementById('messages2').innerHTML;
  
      var n = "\n"
      var url = "https://wa.me/?text="

      + replacedTitle + "%0a"
      + n + "%0a"
      + encodedDetails + "%0a"
      + n + "%0a"
      + "_"+msgs+"_" + n +"%0a" + replacedUrl + "%0a"
      + n + "%0a"
      + "_"+msgs2+"_" + "%0a"
      
    
      window.open(url, '_blank').focus();
  }
  


// Get the comment icon element
document.addEventListener('DOMContentLoaded', function() {
// Get the comment icon element
var commentIcon = document.querySelector('.fa-comment');

// Add the rotate class to start the animation when the page loads
commentIcon.classList.add('rotate');

// Start the animation every 5 seconds
setInterval(function() {
// Toggle the rotate class to restart the animation
commentIcon.classList.toggle('rotate');
}, 5000);
});

  