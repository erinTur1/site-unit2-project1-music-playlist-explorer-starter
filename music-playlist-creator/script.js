// import playlistData from "./data/playlistData";

document.addEventListener('DOMContentLoaded', () => {
    loadPlaylists();
});


const modalOverlay = document.querySelector(".modal-overlay");
const modalPopup = document.querySelector(".modal-popup");
let currCard = null;

function loadPlaylists() {
    //load playlist objects from data.js
    const playlists = playlistData;
    const playlistCardsArea = document.querySelector(".playlist-cards");
    if (playlists.length == 0) {
        const paragraphNotif = document.createElement("p");
        paragraphNotif.innerText = "No playlists added";
        paragraphNotif.className = "paragraph-notif";
        playlistCardsArea.appendChild(paragraphNotif);
        console.log("No playlists added");
    } else {
        playlists.forEach( (playlist) => {
            const playlistCard = createPlaylistCard(playlist);
            playlistCardsArea.appendChild(playlistCard);
        })
    }
}

function createPlaylistCard(playlist) {
    const playlistCard = document.createElement('div');
    playlistCard.className = "card";
    playlistCard.innerHTML = `
        <img src=${playlist.playlist_art} alt="image of ${playlist.playlist_author}'s ${playlist.playlist_name}"/>
        <h3>${playlist.playlist_name}</h3>
        <p>${playlist.playlist_author}</p>
        <svg width="20" height="20"><rect/></svg>
    `
    return playlistCard; 
}


//want to make the below code cleaner and have more separation of concerns
function displayModal() {
    currCard.style.borderStyle = "inset";
    modalOverlay.style.display = "block";
    modalPopup.style.display = "block";
}

function hideModal() {
    currCard.style.borderStyle = "outset";
    modalOverlay.style.display = "none";
    modalPopup.style.display = "none";
}



window.addEventListener("click", function (event) {
    if (event.target.className === "card") {
        currCard = event.target;
        displayModal();
    }  else if (event.target.className === "modal-overlay") {
        hideModal();
    }
});


