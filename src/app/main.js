//libs
var fs = require('fs');

//fetching elements
const openModalBtn = document.querySelector('#createpl');
const modal = document.querySelector('.modal');
const x = document.querySelector('.close');
const createBtn = document.querySelector('#createBtn');
const nameBox = document.querySelector('#plname');

//vars
const plistPath = '../Playlists/';

//functions
function toggleModal() {
    if(modal.style.display == "block") {
        modal.style.display = "none";
        x.style.display = "none";
    } else {
        modal.style.display = "block";
        x.style.display = "block";
    }
}

function createPl(name) {
    if(name != "") {
        fs.writeFile('./Playlists/' + name + ".plst", '', function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
            toggleModal();
        });
    }
}

function fetchPlaylists() {
    var ul = document.querySelector('.sidebar')
    fs.readdirSync(plistPath.substring(1)).forEach(file => {
        var li = document.createElement("li");
        li.innerHTML = `<a href='playlist.html?name=` + file + `'>` + file.slice(0, -5) + `</a>`
        ul.appendChild(li);
    });
}

//events
x.addEventListener('click', toggleModal)
openModalBtn.addEventListener('click', toggleModal)

createBtn.addEventListener('click', () => {
    createPl(nameBox.value);
});

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//code
fetchPlaylists()