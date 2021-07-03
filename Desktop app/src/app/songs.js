//libraries
const fs = require('fs');

//variables
const songsPath = '../Songs/';
const songs = []

//fetch elements
const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')

//Fetch songs
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if(urlParams.get('name') == null) {
    fs.readdirSync(songsPath.substring(1)).forEach(file => {
        songs.push(file)
    });
} else {
    // fetch from playlist
}

//Keep track of songs
let songIndex = 0;

//load song
loadSong(songs[songIndex])

//update song details
function loadSong(song) {
    title.innerText = song
    audio.src = songsPath + song
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
    musicContainer.classList.remove('play')
    playBtn.querySelector('i.fas').classList.add('fa-play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')

    audio.pause()
}

function prevSong() {
    if (songIndex == 0) {
        songIndex = songs.length - 1
    } else {
        songIndex--
    }

    loadSong(songs[songIndex])

    playSong()
}

function nextSong() {
    if (songIndex == songs.length - 1) {
        songIndex = 0
    } else {
        songIndex++
    }

    loadSong(songs[songIndex])

    playSong()
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

//Event listeners
playBtn.addEventListener('click',  () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})

//Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)

progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)