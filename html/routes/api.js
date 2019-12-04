'use strict'

const Router = require('koa-router')

const logger = require('../lib/logger')
const User = require('../services/user')

const router = new Router({
  prefix: '/api'
})

router.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    logger.error(e)

    ctx.status = e.status || e.statusCode || 500
    if (e.body) {
      ctx.body = e.body
    } else {
      ctx.body = e.message || 'Unknown error'
    }
  }
})

router.post('/login', async ctx => {
  const result = await User.login(ctx.request.body.username, ctx.request.body.password)

  ctx.session.token = result.token
  ctx.body = ctx.session.user = await User.getInfo(result.token)
})

router.post('/register', async ctx => {
  const result = await User.register(ctx.request.body.username, ctx.request.body.password)

  ctx.session.token = result.token
  ctx.session.user = await User.getInfo(result.token)
  ctx.status = 204
})

module.exports = router
