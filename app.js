const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware')
const mongoose = require('mongoose')
const passport = require('passport')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const subRoutes = require('./routes/sub')
const offersRoutes = require('./routes/offers')
const linksRoutes = require('./routes/links')
const domainsRoutes = require('./routes/domains')
const prelandingsRoutes = require('./routes/prelandings')
const geosofoffersRoutes = require('./routes/geosofoffers')
const favoritesoffersRoutes = require('./routes/favoritesoffers')
const keys = require('./config/keys')
const app = express()
const path = require('path')
const cors = require("cors")

mongoose.connect(keys.mongoURI)
	.then(() => console.log('MongoDB conected'))
	.catch(error => console.log(error))

app.use(cors())

app.use(
	'/admin_api/*',
	createProxyMiddleware({
		target: 'http://178.62.251.36',
		headers: {
			"Connection": "keep-alive"
		},
		proxyTimeout: 7000,
	},'')
)
/*app.use(
	'/client/!*',
	createProxyMiddleware({
		target: 'https://api.cloudflare.com',
		headers: {
			"Connection": "keep-alive",
			'Accept': '*'
		},
		secure: false, // Игнорирование проверки TLS (небезопасно!)
	})
)*/

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/sub_encoder', subRoutes)
app.use('/api/offers', offersRoutes)
app.use('/api/links', linksRoutes)
app.use('/api/domains', domainsRoutes)
app.use('/api/prelandings', prelandingsRoutes)
app.use('/api/geosofoffers', geosofoffersRoutes)
app.use('/api/favoritesoffers', favoritesoffersRoutes)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production'){
	app.use('/', express.static(path.join(__dirname, 'client','dist')))

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client','dist', 'index.html'))
	})
}

module.exports = app