'use strict'

const config = require('config')
const Koa = require('koa')
const body = require('koa-body')
const views = require('koa-views')
const nunjucks = require('nunjucks')
const path = require('path')
const session = require('koa-session')
const send = require('koa-send')

const router = require('./routes')

const app = new Koa()

app.keys = ['secret key']

app.use(body())
app.use(session(app))

const viewPath = path.join(__dirname, 'web/views')
const nunjucksEnv = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(viewPath)
)
app.use(views(viewPath, {
  map: {
    html: 'nunjucks'
  },
  extension: 'html',
  options: {
    nunjucksEnv,
    noCache: true
  }
}))

app.use(async (ctx, next) => {
  ctx.state.config = {
    apiServer: config.apiServer,
    get apiToken () {
      return ctx.session.token
    }
  }
  return next()
})

app.use(async (ctx, next) => {
  await next()

  if (ctx.status !== 404 || !ctx.path.startsWith('/static/')) {
    return
  }

  if (ctx.path.includes('/lib/sdk-cabinet/')) {
    await send(
      ctx,
      ctx.path.split('/lib/sdk-cabinet/')[1],
      { root: path.resolve(__dirname, 'node_modules/shimo-sdk-cabinet/dist') }
    )
    return
  }

  const match = ctx.path.match(/\/lib\/(whatwg-fetch|es6-promise)\/(.+)/i)
  if (match) {
    await send(
      ctx,
      match[2],
      { root: path.resolve(__dirname, `node_modules/${match[1]}`) }
    )
    return
  }

  await send(
    ctx, ctx.path.replace(/\/static/, ''),
    { root: path.resolve(__dirname, 'web/static') }
  )
})

app.use(router.routes()).use(router.allowedMethods())

module.exports = app
