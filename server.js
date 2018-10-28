'use strict'

const app = require('./app')
const config = require('./config')
const winston = require('winston')

app.listen(config.port, () => {
    winston.info('API running on port: ', config.port)
})
