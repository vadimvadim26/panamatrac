const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const offersRoutes = require('./routes/offers')
const linksRoutes = require('./routes/links')
const prelandingsRoutes = require('./routes/prelandings')
const geosofoffersRoutes = require('./routes/geosofoffers')
const keys = require('./config/keys')
const app = express()
const path = require('path')

mongoose.connect(keys.mongoURI)
	.then(() => console.log('MongoDB conected'))
	.catch(error => console.log(error))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)
app.use('/api/offers', offersRoutes)
app.use('/api/links', linksRoutes)
app.use('/api/prelandings', prelandingsRoutes)
app.use('/api/geosofoffers', geosofoffersRoutes)

if (process.env.NODE_ENV === 'production'){
	app.use('/', express.static(path.join(__dirname, 'client','dist')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client','dist', 'index.html'))
	})
}

module.exports = app