//imports
const ytdl = require('ytdl-core');
var ytpl = require('ytpl');
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
        test(URLinput.value)
        if (ytdl.validateURL(URLinput.value)) {
            sts.innerHTML = "Downloading..."
            getName(URLinput.value, dlyt)
        } else {
            URLinput.value = ""
            sts.innerHTML = "Invalid URL"
        }
    }
}

async function test(url) {
    ID = url.split("=")[1]
    const playlist = await ytpl(ID);
    console.log(playlist)
}

function getName(URL, callback) {
    ID = ytdl.getURLVideoID(URL)
    //900IQ
    getYoutubeTitle(ID, function (err, title) {callback(ID, URL, title)})
}

function dlyt(ID, URL, title) {

    download = ytdl(URL, {
        format: 'mp3',
        quality: 'highestaudio',
        filter: 'audioonly'
    })
    download.pipe(fs.createWriteStream(PATH + ID + '.mp3'));

    var data = fs.readFileSync(`${plistPath.substring(1)}${select.value}`, 'utf8')
    var index = 1

    if (data != "") {
        data = data.split('\n')
        data = data[data.length - 2].split(',')
        index = parseInt(data[0]) + 1
    }

    while(title.includes(',')) {
        title.replace(',', '.')
    }
    fs.appendFile(`${plistPath.substring(1)}${select.value}`, `${index},${ID}.mp3,${title},` + '\n', function (err) {
        if (err) throw err;
    });

    download.on('finish', function() {
        sts.innerHTML = "Download Complete!"
    })
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