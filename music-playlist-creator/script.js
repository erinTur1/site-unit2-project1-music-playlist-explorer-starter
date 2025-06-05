const modalOverlay = document.querySelector(".modal-overlay");
const modalPopup = document.querySelector(".modal-popup");
let currCard = null;
// const cards = document.querySelectorAll(".card");

//click on a card, show modal with greyed out background

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

// for(const card of cards) {
//     card.addEventListener("click", () => {
//        displayModal();
//     })
// };