// Imports
const { request } = require('express')
const express = require('express')
const app = express()
const port = 3000

// Set Views
app.set('views', './views')
app.set('view engine', 'ejs')

// Static Files
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))
app.use('/js', express.static(__dirname + 'public/js'))

app.get('', (req, res) => {
    res.render('index')
})

// Listen on port
app.listen(port, () => console.info(`Listen on port ${port}`))