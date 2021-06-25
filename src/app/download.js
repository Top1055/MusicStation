const fs = require('fs');
const ytdl = require('ytdl-core');
const getYoutubeTitle = require('get-youtube-title')

var sts = document.getElementById("status")
var URLinput = document.getElementById("search")
var PATH = "./Songs/"

function keyCode(event) {
    var x = event.keyCode;
    if (x == 13) {
        if (ytdl.validateURL(URLinput.value)) {
            sts.innerHTML = "Downloading..."
            getName(URLinput.value, dlyt)
        } else {
            URLinput.value = ""
            sts.innerHTML = "Invalid URL"
        }
    }
}

function getName(URL, callback) {
    ID = ytdl.getURLVideoID(URL)
    //900IQ
    getYoutubeTitle(ID, function (err, title) {callback(ID, URL, title)})
}

function dlyt(ID, URL, title) {

    ytdl(URL, {
        format: 'mp3',
        quality: 'highestaudio',
        filter: 'audioonly'
    }).pipe(fs.createWriteStream(PATH + title + '.song'));
    sts.innerHTML = "Download Complete!"
}

