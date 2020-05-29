'use strict'

const config = require('config')
const http = require('http')

const app = require('./app')
const logger = require('./lib/logger')

const server = http.createServer(app.callback())
server.setTimeout(3600000)
server.listen(config.port, () => {
  logger.info(`Server started on ${config.port}`)
})
