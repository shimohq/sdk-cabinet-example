'use strict'

const Koa = require('koa')
const body = require('koa-body')
const cors = require('@koa/cors')

const router = require('./routes')
const logger = require('./lib/logger')

const app = new Koa()
app.keys = ['secret key']

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    logger.error(e)
  }
})

app.use(body({
  jsonLimit: '1gb',
  formLimit: '1gb',
  textLimit: '1gb'
}))
app.use(cors())

app.use(router.routes())
  .use(router.allowedMethods())

module.exports = app
