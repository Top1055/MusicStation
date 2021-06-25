const createBtn = document.querySelector('#createpl');
const modal = document.querySelector('.modal');
const x = document.querySelector('.close');

function toggleModal() {
    if(modal.style.display == "block") {
        modal.style.display = "none";
        x.style.display = "none";
    } else {
        modal.style.display = "block";
        x.style.display = "block";
    }
}

x.addEventListener('click', toggleModal)
createBtn.addEventListener('click', toggleModal)

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}