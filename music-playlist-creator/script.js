const modal = document.querySelector(".modal-overlay");
const cards = document.querySelectorAll(".card");

//click on a card, show modal with greyed out background

function displayModal() {
    modal.style.display = "block";
    
}

function hideModal() {

}

window.addEventListener("click", function (event) {
    if (event.target.className === "card") {
        displayModal();
    }  else if (event.target.className === "card") {
        
    }
});

for(const card of cards) {
    card.addEventListener("click", () => {
       displayModal();
    })
};