'use strict'

const config = require('config')

const logger = require('./lib/logger')
const app = require('./app')

app.listen(config.port, () => {
  logger.info(`Server started on ${config.port}`)
})
