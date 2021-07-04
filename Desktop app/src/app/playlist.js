//imports
const Sortable = require('sortablejs')

//fetch songs
var data = fs.readFileSync(`${plistPath.substring(1)}${urlParams.get('name')}`, 'utf8')
data = data.split('\n')

//create list
listSongs = []
for(let i = 0; i<data.length - 1; i++) {
    var li = document.createElement("li");
    let song = data[i].split(',')
    li.innerHTML = `<div class="number">${song[0]}</div><div class="song-title">${song[2]}</div>`
    li.value = (song[0] - 1)
    listSongs.push(li)
    list.appendChild(li);
}

for(let i = 0; i<listSongs.length; i++) {
    listSongs[i].addEventListener("click", () => {
        songIndex = listSongs[i].value
        loadSong()
        playSong()
    })
}

Sortable.create(list, {
    animation: 150,
    easing: "cubic-bezier(1, 0, 0, 1)",
	onChange: function(/**Event*/evt) {
		evt.newIndex // most likely why this event is used is to get the dragging element's current index
		// same properties as onEnd
	}
})