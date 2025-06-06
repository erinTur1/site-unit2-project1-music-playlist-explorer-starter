
document.addEventListener('DOMContentLoaded', () => {
    loadPlaylists();
});


const modalOverlay = document.querySelector(".modal-overlay");
const modalPopup = document.querySelector(".modal-popup");
let currPlaylistId = null;
let currPlaylist = null;

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
    playlistCard.id = playlist.playlistID; 
    playlistCard.innerHTML = `
        <img src=${playlist.playlist_art} alt="image of ${playlist.playlist_author}'s ${playlist.playlist_name}"/>
        <h3>${playlist.playlist_name}</h3>
        <p>${playlist.playlist_author}</p>
        <svg width="20" height="20"><rect/></svg>
    `
    return playlistCard; 
}

function obtainPlaylistInfo() {

    currPlaylist = playlistData.find((playlist) => playlist.playlistID == currPlaylistId);
    console.log(currPlaylist);
}

//want to make the below code cleaner and have more separation of concerns
//make these toggles instead???
function displayModal() {
    // currCard.style.borderStyle = "inset"; //NEED TO FIX
    modalOverlay.style.display = "block";
    modalPopup.style.display = "block";



    const modalContent = document.querySelector(".modal-content");
    // modalContent.innerHTML = `
    //     <div class="playlist-info">
    //         <img src=${currPlaylist.playlist_art} alt="image of ${currPlaylist.playlist_author}'s ${currPlaylist.playlist_name}"/> 
    //         <section>
    //             <h3>${currPlaylist.playlist_name}</h3>
    //             <p>${currPlaylist.playlist_author}</p>
    //         </section>
    //     </div>
    //     <div class="playlist-list">
            // <div class="song-tile">
            //     <img src="./assets/img/song.png" alt="image of music note"/>
            //     <section>
            //         <p class="song-title">Song Title</p>
            //         <p>Artist Name</p>
            //         <p>Album Name</p>
            //     </section>
            //     <p class="song-length">0:00</p>
            // </div>
    //     </div>
    // `
    modalContent.innerHTML = `
        <div class="playlist-info">
            <img src=${currPlaylist.playlist_art} alt="image of ${currPlaylist.playlist_author}'s ${currPlaylist.playlist_name}"/> 
            <section>
                <h3>${currPlaylist.playlist_name}</h3>
                <p>${currPlaylist.playlist_author}</p>
            </section>
        </div>
        <div class="playlist-list">
        </div>
    `

    currPlaylist.songs.forEach( (song) => {
            const songTile = createSongTile(song);
            songTilesArea = document.querySelector(".playlist-list");
            songTilesArea.appendChild(songTile);
    });

}

function createSongTile(song) {
    console.log(song);
    const newSongTile = document.createElement('div');
    newSongTile.className = "song-tile";
    // playlistCard.id = playlist.playlistID; 
    newSongTile.innerHTML = `
        <div class="song-tile">
            <img src=${song.cover_art} alt="image of ${song.title}"/>
            <section>
                <p class="song-title">${song.title}</p>
                <p>${song.artist}</p>
                <p>${song.album}</p>
            </section>
            <p class="song-length">${song.length}</p>
        </div>
    `
    return newSongTile; 
}

function hideModal() {
    // currCard.style.borderStyle = "outset";
    modalOverlay.style.display = "none";
    modalPopup.style.display = "none";
}



window.addEventListener("click", function (event) {
    if (event.target.className === "card") {
        currPlaylistId = event.target.id;
        console.log(currPlaylistId);
        obtainPlaylistInfo();
        displayModal();
    }  else if (event.target.className === "modal-overlay") {
        hideModal();
    }
});


