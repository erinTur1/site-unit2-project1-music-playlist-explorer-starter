
//On load of either page
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector("title").innerText === "Music Playlist Explorer") {
        //If document is the home page (index.html)...
        loadPlaylists();
    } else {
        //If document is the featured page (index.html)...
        console.log(playlistData);
        loadFeaturedContent();
    }
});

//Diferent functions are triggered depneding on which html element was clicked:
/*Note: I hae done this method rather than dynamically add event listeners to evry new object.
Is this method acceptable?*/
window.addEventListener("click", function (event) {
    if (event.target.className === "card") {
        currPlaylistId = event.target.id;
        obtainPlaylistInfo();
        displayModal();
    }  else if (event.target.className === "modal-overlay") { //grey area around modal was clicked
        hideModal();
    } else if (event.target.className === "like-btn") {
        toggleLike(event.target);
    } else if (event.target.className === "shuffle-btn") {
        shuffleSongs(event.target);
    }
});

const modalOverlay = document.querySelector(".modal-overlay");
const modalPopup = document.querySelector(".modal-popup");
/*The below two variables are changed to refer to the current playlist the user is interacting with
either through liking or shuffling and are changed throughout.*/
let currPlaylistId = null;
let currPlaylist = null;

//For home page load
function loadPlaylists() {
    const playlists = playlistData;
    const playlistCardsArea = document.querySelector(".playlist-cards");
    if (playlists.length == 0) {
        //paragraphNotif is a p tag dynamically loaded on the page to notify the user.
        //in this case it is used to notify if there are no playlists to be displayed
        const paragraphNotif = document.createElement("p");
        paragraphNotif.innerText = "No playlists added";
        paragraphNotif.className = "paragraph-notif";
        playlistCardsArea.appendChild(paragraphNotif);
    } else {
        playlists.forEach( (playlist) => {
            const playlistCard = createPlaylistCard(playlist);
            playlistCardsArea.appendChild(playlistCard);
        })
    }
}

//creates html playlist card element given a playlist's info
function createPlaylistCard(playlist) {
    const playlistCard = document.createElement('div');
    playlistCard.className = "card";
    playlistCard.id = playlist.playlistID; 
    playlistCard.innerHTML = `
        <img data-playlistId="${playlist.playlistID}" src=${playlist.playlist_art} alt="image of ${playlist.playlist_author}'s ${playlist.playlist_name}"/>
        <h3>${playlist.playlist_name}</h3>
        <p>${playlist.playlist_author}</p>
        <div class="like-div">
            <span class="like-btn" data-id="${playlist.playlistID}" data-liked="false"><i class="fa fa-2x fa-heart fa-heart-o"></i><p>${playlist.like_count}</p></span>  
        </div>
        `
    return playlistCard; 
}

//function that sets the current playlist user is interacting with based on the playlist Id.
function obtainPlaylistInfo() {
    currPlaylist = playlistData.find((playlist) => playlist.playlistID == currPlaylistId);
}

//creates html modal element given a playlist's info
function displayModal() {
    modalOverlay.style.display = "block";
    modalPopup.style.display = "block";

    const modalContent = document.querySelector(".modal-content");
    modalContent.innerHTML = `
        <div class="playlist-info">
            <img src=${currPlaylist.playlist_art} alt="image of ${currPlaylist.playlist_author}'s ${currPlaylist.playlist_name}"/> 
            <section>
                <h3>${currPlaylist.playlist_name}</h3>
                <p>${currPlaylist.playlist_author}</p>
            </section>
            <button class="shuffle-btn" data-id="${currPlaylist.playlistID}">Shuffle</button>
        </div>
        <div class="playlist-list">
        </div>
    `
    createSongsList();
}

//dynamically appends the song tiles to the "playlist-list" section. Used for both home and featured page
function createSongsList() {
    currPlaylist.songs.forEach( (song) => {
            const songTile = createSongTile(song);
            songTilesArea = document.querySelector(".playlist-list");
            songTilesArea.appendChild(songTile);
    });
}

//creates html song tile element given a song's info
function createSongTile(song) {
    const newSongTile = document.createElement('div');
    newSongTile.className = "song-tile";
    newSongTile.innerHTML = `
        <img src=${song.cover_art} alt="image of ${song.title}"/>
        <section>
            <p class="song-title">${song.title}</p>
            <p>${song.artist}</p>
            <p>${song.album}</p>
        </section>
        <p class="song-length">${song.length}</p>
    `
    return newSongTile; 
}

function hideModal() {
    modalOverlay.style.display = "none";
    modalPopup.style.display = "none";
}

function toggleLike(likeBtn) {
    //Logic followed from lab 4:
    const playlistId = likeBtn.getAttribute("data-id");
    currPlaylistId = playlistId;
	const isLiked = likeBtn.getAttribute('data-liked') === 'true';
    obtainPlaylistInfo();
    let likesCount = currPlaylist.like_count;

    if (isLiked) { //means clicking again will unlike it
		likesCount -= 1;
        likeBtn.querySelector("i").classList.add("fa-heart-o"); //make heart outlined
        //update like count in data file and on-page
		likeBtn.querySelector("p").innerText = likesCount;
        currPlaylist.like_count = likesCount;
		likeBtn.setAttribute('data-liked', 'false');
	} else { //means clicking will like it
		likesCount += 1;
        likeBtn.querySelector("i").classList.remove("fa-heart-o"); //make heart filled in
        //update like count in data file and on-page
        likeBtn.querySelector("p").innerText = likesCount;
        currPlaylist.like_count = likesCount;
		likeBtn.setAttribute('data-liked', 'true');
	}

}

function shuffleSongs(shuffleBtn) {
    const playlistId = shuffleBtn.getAttribute("data-id");
    currPlaylistId = playlistId;
    obtainPlaylistInfo();
    let songs = currPlaylist.songs;

    //shuffle using the Fisher-Yates algorithm: (https://coureywong.medium.com/how-to-shuffle-an-array-of-items-in-javascript-39b9efe4b567)
    let i = songs.length, j, temp;
    while (--i > 0) {
        j = Math.floor(Math.random() * (i + 1));
        temp = songs[j];
        songs[j] = songs[i];
        songs[i] = temp;
    }

    currPlaylist.songs = songs; //update songs in data file
    displayModal();
}

//For featured page load
function loadFeaturedContent() {

    const randIndex = Math.floor(Math.random() * playlistData.length);
    
    currPlaylist = playlistData[randIndex];
    //left side includes playlist image and name
    const leftSide = document.querySelector(".playlist-label");

    leftSide.innerHTML = `
        <img src="${currPlaylist.playlist_art}" alt="image of ${currPlaylist.playlist_author}'s ${currPlaylist.playlist_name}"/>
        <h3>${currPlaylist.playlist_name}</h3>
    `
    //will display all corresponding sont tiles on the right
    createSongsList();

}

