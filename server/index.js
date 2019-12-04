'use strict'

const config = require('config')

const app = require('./app')
const logger = require('./lib/logger')

app.listen(config.port, () => {
  logger.info(`Server started on ${config.port}`)
})
