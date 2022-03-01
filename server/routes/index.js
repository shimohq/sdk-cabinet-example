'use strict'

const Router = require('koa-router')
const njwt = require('njwt')

const User = require('../models/user')
const Shimo = require('../models/shimo')
const File = require('../models/file')
const logger = require('../lib/logger')

const router = new Router()

router.use(async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    logger.error({
      url: ctx.url,
      message: e.message,
      status: e.status || e.statusCode,
      stack: e.stack
    })

    ctx.status = e.status || e.statusCode || 500
    if (e.body) {
      ctx.body = e.body
    } else {
      ctx.body = e.message || 'Unknown error'
    }
  }
})

router.post('/login', async ctx => {
  const user = await User.get(ctx.request.body.username, ctx.request.body.password)

  ctx.assert(user != null, 400, 'User doesn\'t exist or password incorrect')

  const token = encodeJWT(user.toJSON())
  ctx.body = { token }
})

router.post('/register', async ctx => {
  const username = ctx.request.body.username
  const password = ctx.request.body.password

  ctx.assert(!(await User.get(username, password)), 400, 'User already exists')

  await User.save({ username, password })

  const u = (await User.get(username, password)).toJSON()

  const token = encodeJWT(u)
  ctx.body = { token }
})

router.get('/files', loadToken, checkUser, async ctx => {
  const files = await File.list(ctx.query.page, ctx.query.size)
  ctx.body = await mapUsers(files)

  async function mapUsers (files) {
    const ids = new Set(files.map(f => f.userId))

    if (ids.size === 0) {
      return []
    }

    const users = await User.getAllByIds(Array.from(ids))

    return files.map(f => {
      return {
        ...f,
        user: users.find(u => u.id === f.userId)
      }
    })
  }
})

router.post('/files', loadToken, checkUser, async ctx => {
  const file = await Shimo.createFile(ctx.state.user.username, ctx.request.body)
  await File.save({
    guid: file.guid,
    userId: ctx.state.user.id,
    type: file.type,
    title: file.title
  })
  ctx.body = file
})

router.post('/files/import', loadToken, checkUser, async ctx => {
  const file = await Shimo.importFile(ctx.state.user.username, ctx.request.body)

  await File.save({
    guid: file.guid,
    userId: ctx.state.user.id,
    type: file.type,
    title: file.title
  })

  ctx.body = file
})

router.get('/files/:guid', loadToken, checkUser, async ctx => {
  ctx.body = await Shimo.getFile(ctx.state.user.username, ctx.params.guid)
})

router.delete('/files/:guid', loadToken, checkUser, async ctx => {
  await Shimo.deleteFile(ctx.state.user.username, ctx.params.guid)
  await File.delete(ctx.params.guid)
  ctx.status = 204
})

router.patch('/files/:guid', loadToken, checkUser, async ctx => {
  const title = ctx.request.body.title
  ctx.assert(typeof title === 'string' && title.trim().length > 0, 400, `Invalid title: ${title}`)

  await Shimo.updateTitle(ctx.state.user.username, ctx.params.guid, title)
  await File.updateTitle(ctx.params.guid, title)
  ctx.status = 204
})

router.get('/files/:guid/export', loadToken, checkUser, async ctx => {
  ctx.body = await Shimo.exportFile(ctx.state.user.username, ctx.params.guid, ctx.query.toType)
})

router.get('/files/:guid/collaborators', loadToken, checkUser, async ctx => {
  const file = await File.get({ guid: ctx.params.guid })

  const manager = (await User.getAllByIds([file.userId]))[0]
  const managerId = `shimo_cabinet_${manager.username}`

  ctx.body = (await Shimo.findUsers(
    ctx.state.user.username,
    (await User.getAll()).map(u => `shimo_cabinet_${u.username}`)
  )).map(u => ({
    ...u,

    // 用户的权限信息，请根据实际的权限信息设置，此处仅作为演示
    permission: {
      read: true,
      edit: true,
      comment: true,
      lock: true,

      // 管理者的锁定权限
      manage: managerId === u.clientUserId
    },

    // 仅用于显示，不做权限判断
    displayRole: managerId === u.clientUserId ? '管理员' : '协作者'
  }))
})

router.get('/users/me', loadToken, checkUser, ctx => {
  ctx.body = ctx.state.user
})

function loadToken (ctx, next) {
  try {
    const authorization = ctx.get('authorization')
    if (typeof authorization === 'string') {
      const match = authorization.match(/^bearer (\S+)$/i)
      if (match && match[1]) {
        ctx.state.user = decodeJWT(match[1])
      }
    }
  } catch (e) {
    logger.warn(e)
  }

  return next()
}

function checkUser (ctx, next) {
  if (ctx.state.user == null) {
    ctx.status = 401
    return
  }

  return next()
}

module.exports = router

function encodeJWT (payload) {
  const jwt = njwt.create(payload, 'shimo')
  delete jwt.body.jti
  jwt.setExpiration(Date.now() + (1000 * 60 * 60 * 24))
  return jwt.compact()
}

function decodeJWT (token) {
  const decoded = njwt.verify(token, 'shimo')
  return decoded.body
}
