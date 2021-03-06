const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT || 3000
app.set('port', PORT)
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/health', (req, res) => res.status(200).send('Ok'))
app.use('/watcher', require('./Routes/crudInWatchers.route'))
app.use('/brands', require('./Routes/getBrandsInfo.route'))

module.exports = app
