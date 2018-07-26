const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

const app = express()

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs')

app.use((req, res, next) => {
	const now = new Date().toString()
	const log = `${now}: ${req.method} ${req.url}`
	console.log(log)
	fs.appendFile('server.log', log + '\n', err => {
		if (err) {
			console.log('Unable to serve log.')
		}
	})
	next()
})

// app.use((req, res, next) => {
// 	res.render('maintenance.hbs', {
// 		pageTitle: 'Under Maintenance',
// 		pageSubtitle: 'Sorry are are down for maintenance.',
// 		welcomeMessage: 'We will be right back!',
// 	})
// })

app.use(express.static(__dirname + '/public'))

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
})

hbs.registerHelper('screamIt', text => {
	return text.toUpperCase()
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		pageSubtitle: 'The home page for Jeremy Swann',
		welcomeMessage: 'Welcome to my website!',
	})
})

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page',
		pageSubtitle:
			'About page, filled with usefull information about the server.',
	})
})

app.get('/projects', (req, res) => {
	res.render('projects.hbs', {
		pageTitle: 'Projects Page',
		pageSubtitle: 'Projects page, list of impressive projects',
	})
})

app.get('/bad', (req, res) => {
	res.send({
		error_message: 'Unable to handle request.',
	})
})

app.listen(port, () => {
	console.log(`Server is up on port: ${port}.`)
})
