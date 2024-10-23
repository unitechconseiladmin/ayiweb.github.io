
// Extract the title from the URL
const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get('l');
console.log(title); // Should output the value of 'l' parameter (e.g., Informatique)


  // Reference to the "posts" node
  var postsRef = database.ref('Bolg/');




// Now, you can use the decodedTitle to fetch the details from Firebase or display it on the page

// Counter to keep track of the number of posts added
var postCounter = 0;

// Listen for changes in the data
postsRef.on('value', function(snapshot) {
    // Clear existing posts and filter bar
    document.getElementById('blog').innerHTML = '';
    document.getElementById('filter-bar').innerHTML = '';

    // Initialize an object to store posts by type
    var postsByType = {};

    // Loop through each post in the snapshot
    snapshot.forEach(function(childSnapshot) {
        var post = childSnapshot.val();
        var postId = childSnapshot.key;
        
        // Check if the post has a type
        if (post.Type) {
            // Group posts by type
            if (!postsByType[post.Type]) {
                postsByType[post.Type] = [];
            }
            postsByType[post.Type].push({ postId: postId, post: post });
        }
    });

    // Sort posts by type
    var sortedTypes = Object.keys(postsByType).sort();
    
    // Create filter button for "All"
    var allButton = document.createElement('button');
    allButton.textContent = 'All';
    allButton.addEventListener('click', function() {
        displayAllPosts();
    });
    document.getElementById('filter-bar').appendChild(allButton);

    sortedTypes.forEach(function(type) {
        // Create filter button for each type
        var filterButton = document.createElement('button');
        filterButton.textContent = type;
        filterButton.addEventListener('click', function() {
            filterPostsByType(type);
        });
        document.getElementById('filter-bar').appendChild(filterButton);
    });

    // Display all posts by default
    displayAllPosts();

    // Function to filter posts by type
    function filterPostsByType(type) {
        var postsOfType = postsByType[type];
        displayPosts(postsOfType);
    }

    // Function to display all posts
    function displayAllPosts() {
        var allPosts = [];
        sortedTypes.forEach(function(type) {
            allPosts = allPosts.concat(postsByType[type]);
        });
        displayPosts(allPosts);
    }

    // Function to display posts
    function displayPosts(posts) {
        document.getElementById('blog').innerHTML = ''; // Clear existing posts

        // Loop through posts and display them
        posts.forEach(function(postObj) {
            var post = postObj.post;
            var postId = postObj.postId;
            
            // Create HTML elements for each post
           //document.getElementById('splash-screen').style.display = 'none';
            var postDiv = document.createElement('div');
            postDiv.className = 'post';
            postDiv.setAttribute('data-type', post.Type);

            // Convertir la date du post en objet Date
        var postDate = new Date(post.SendDateTime);

        // RÃ©cupÃ©rer la date actuelle
        var now = new Date();
        var timeDifference = now - postDate;
        var hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

        var timeAgo;
        if (hoursDifference >= 24) {
            // Si tiene mÃ¡s de 24 horas, mostrar el nÃºmero de dÃ­as
            var daysDifference = Math.floor(hoursDifference / 24);
            timeAgo = `${daysDifference} jours`;
        } else {
            // De lo contrario, mostrar la diferencia en horas
            timeAgo = `${hoursDifference} heures`;
        }

            postDiv.innerHTML = `
                <div id="${postId}" class="filterDiv_${post.Type} postId">
                    <div class="img">
                        <img src="${post.Image || post.LinkImage || ''}" alt="">
                        <div class="filterDiv cars categorie">${post.Type || ''}</div>
                    </div>

                    <!--bar comment, dislike, like-->
                    <div class="barall">
                        <div class="barcomment">
                            <i class="fa fa-comment"></i>
                            <span class="count" id="comment-count-${postId}">
                                ${post.Zcomments ? formatNumber(Object.keys(post.Zcomments).length) : '0'}
                            </span>
                        </div>

                        <div class="barlike">
                            <i class="fa fa-thumbs-up"></i>
                            <span id="likecount_${postId}">${formatNumber(post.likes || 0)}</span>
                        </div>

                        <div class="bardislike">
                            <i class="fa fa-thumbs-down"></i>
                            <span id="dislikecount_${postId}">${formatNumber(post.dislikes || 0)}</span>
                        </div>
                    </div>
                    <!--bar comment, dislike, like-->

                    <h1>${post.Title || ''}</h1>
                    <p>${post.Details || ''}</p>
                    <p style="display: none;">${post.SousTitle || ''}</p>
                    
                    <div class="btnprix">
                    <p><i class="fa fa-time"></i> ${postDate.toLocaleTimeString()} (${timeAgo} ago)</p>
                        <button class="more" onclick="blog('${encodeURIComponent(post.Title || '')}')">Suite</button>
                    </div>
                </div>
            `;
            
            // Append the post to the 'anglais' div
            document.getElementById('blog').appendChild(postDiv);
        });
    }
});


function blog(encodedTitle) {
    // DÃ©coder le titre encodÃ©
    const decodedTitle = decodeURIComponent(encodedTitle);

    // Remplacer les espaces par des underscores dans le titre
    const titleWithUnderscores = decodedTitle.replace(/ /g, "_");

    // Utiliser le titre mis Ã  jour selon vos besoins
    console.log(titleWithUnderscores);
     
   

    // Rediriger vers la nouvelle URL avec le titre mis Ã  jour
    //window.location.href = `/blog/details.html?l=${encodeURIComponent(titleWithUnderscores)}`;

}



  /*document.getElementById('toggleSearchBtn').addEventListener('click', function () {
    var searchContainer = document.getElementById('searchContainer');
    var buttons = document.querySelectorAll('.btn');

    if (searchContainer.style.display === 'none' || searchContainer.style.display === '') {
        searchContainer.style.display = 'block';
        buttons.forEach(function (button) {
            button.style.display = 'none';
        });
    } else {
        searchContainer.style.display = 'none';
        buttons.forEach(function (button) {
            button.style.display = 'block';
        });
    }
});*/


  
  function formatNumber(number) {
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'k';
    } else if (number >= 100) {
        return (number / 100).toFixed(1) + 'c';
    } else {
        return number.toString();
    }
}


  function filterSelection(category) {
    var posts = document.getElementsByClassName('post');
    var searchInput = document.getElementById('searchInput').value.toLowerCase();

    // Loop through posts and show/hide based on category and search input
    for (var i = 0; i < posts.length; i++) {
        var postCategory = posts[i].getAttribute('data-type');
        var sousTitle = posts[i].getElementsByTagName('h1')[0].innerText.toLowerCase();

        // Check if the post matches the category and search input
        if ((category === 'all' || postCategory === category) &&
            (sousTitle.includes(searchInput))) {
            posts[i].style.display = 'block';
        } else {
            posts[i].style.display = 'none';
        }
    }
}

// Call filterSelection when a filter button is clicked
/*document.getElementById('filtrecategorie').addEventListener('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
        // Remove 'active' class from all buttons
        var buttons = document.getElementsByClassName('btn');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('active');
        }

        // Add 'active' class to the clicked button
        event.target.classList.add('active');

        // Call filterSelection with the category of the clicked button
        filterSelection(event.target.getAttribute('data-filter'));
    }
});*/

// Add event listener for the search input
document.getElementById('searchInput').addEventListener('input', function () {
    // Call filterSelection with the current category and updated search input
    filterSelection(document.querySelector('.btn.active').getAttribute('data-filter'));
});



