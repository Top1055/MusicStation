const fs = require('fs');
const ytdl = require('ytdl-core');

var sts = document.getElementById("status")
var URLinput = document.getElementById("search")
var PATH = "./Songs/"

function keyCode(event) {
    var x = event.keyCode;
    if (x == 13) {
        if (ytdl.validateURL(URLinput.value)) {
            sts.innerHTML = "Downloading..."
            dlyt(URLinput.value)
        } else {
            URLinput.value = ""
            sts.innerHTML = "Invalid URL"
        }
    }
}

function dlyt(ID) {
    ytdl(ID, {
        format: 'mp3',
        quality: 'highestaudio',
        filter: 'audioonly'
    }).pipe(fs.createWriteStream(PATH + ytdl.getURLVideoID(ID) + '.mp4'));
    sts.innerHTML = "Download Complete!"
}