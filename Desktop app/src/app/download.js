//imports
const ytdl = require('ytdl-core');
const getYoutubeTitle = require('get-youtube-title')

//vars
var PATH = "./Songs/"

//fetch html
var select = document.querySelector('#playlist')
var sts = document.getElementById("status")
var URLinput = document.getElementById("search")

//functions
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
    }).pipe(fs.createWriteStream(PATH + ID + '.song'));

    var data = fs.readFileSync(`${plistPath.substring(1)}${select.value}`, 'utf8')
    var index = 1

    if (data != "") {
        data = data.split('\n')
        data = data[data.length - 2].split(',')
        index = data[0]
    }

    while(title.includes(',')) {
        title.replace(',', '.')
    }
    fs.appendFile(`${plistPath.substring(1)}${select.value}`, `${index},${ID}.song,${title},` + '\n', function (err) {
        if (err) throw err;
    });

    sts.innerHTML = "Download Complete!"
}

function selectPlaylist() {
    if (select.value == 'none') {
        URLinput.placeholder = "Please select a playlist..."
        URLinput.disabled = true
    } else {
        URLinput.placeholder = "Youtube link..."
        URLinput.disabled = false
    }
}

//code
fs.readdirSync(plistPath.substring(1)).forEach(file => {
    var option = document.createElement("option");
    option.value = file
    option.innerHTML = file.slice(0, -5)
    select.appendChild(option);
});