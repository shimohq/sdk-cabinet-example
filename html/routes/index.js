'use strict'

const Router = require('koa-router')

const api = require('./api')
const File = require('../services/file')

const router = new Router()

router.get('/login', ctx => ctx.render('login'))

router.get('/register', ctx => ctx.render('register'))

router.get('/logout', ctx => {
  ctx.session = null
  ctx.redirect('/login')
})

router.get('/files/:guid', checkUser, async ctx => {
  const file = await File.get(ctx.session.token, ctx.params.guid)

  const fileType = getFileType(file.type)

  await ctx.render(`file/${fileType}`, {
    file
  })
})

router.get('/', checkUser, async ctx => {
  const page = parseInt(ctx.query.page, 10)

  await ctx.render('home', {
    files: (await File.list(ctx.session.token, isNaN(page) ? 0 : page)).map(file => {
      const humanizedType = getFileType(file.type)
      const meta = getTypeMeta(humanizedType)
      file.humanizedType = humanizedType
      file.typeIcon = meta.icon
      file.typeLabel = meta.label
      file.exportType = meta.exportType
      file.canExportPDF = meta.canExportPDF
      return file
    })
  })
})

router.use(api.routes()).use(api.allowedMethods())

function checkUser (ctx, next) {
  if (ctx.session.user == null) {
    ctx.redirect('/login')
    return
  }

  ctx.state.user = ctx.session.user

  return next()
}

function getFileType (type) {
  const [main, sub] = type.split('/')

  switch (main) {
    case 'document':
      if (sub === 'richdoc') {
        return 'document'
      }
      return 'document-pro'

    case 'sheet':
      return 'sheet'

    case 'slide':
      return 'slide'
  }
}

function getTypeMeta (type) {
  switch (type) {
    case 'document':
      return {
        icon: 'document',
        label: '文档',
        exportType: 'docx',
        canExportPDF: true
      }

    case 'document-pro':
      return {
        icon: 'word',
        label: '专业文档',
        exportType: 'docx',
        canExportPDF: true
      }

    case 'sheet':
      return {
        icon: 'excel',
        label: '表格',
        exportType: 'xlsx',
        canExportPDF: true
      }

    case 'slide':
      return {
        icon: 'powerpoint',
        label: '幻灯片',
        exportType: 'pptx',
        canExportPDF: false
      }
  }
}

module.exports = router
