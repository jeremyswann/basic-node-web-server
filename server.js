const express = require('express')

const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
	res.send({
		name: 'Jeremy',
		age: '29',
		likes: ['Drawing', 'Guitar'],
		pages: ['/about'],
	})
})

app.get('/about', (req, res) => {
	res.send('<h1>About Page</h1>')
})

app.get('/bad', (req, res) => {
	res.send({
		error_message: 'Unable to handle request.',
	})
})

app.listen(3000, () => {
	console.log('Server is up on port: 3000.')
})
