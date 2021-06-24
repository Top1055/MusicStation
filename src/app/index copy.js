const fs = require('fs');
const ytdl = require('ytdl-core');

PATH = "./Songs/"

function dlyt(ID) {
    ytdl('https://www.youtube.com/watch?v=' + ID, {
        format: 'mp3',
        quality: 'highestaudio',
        filter: 'audioonly'
    }).pipe(fs.createWriteStream(PATH + ID + '.mp4'));
}

var button = document.getElementById("Download")

button.addEventListener('click', () => {
    dlyt("BRVGFqb_oyA")
});