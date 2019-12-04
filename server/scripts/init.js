'use strict'

const fs = require('fs-extra')
const path = require('path')

const logger = require('../lib/logger')

async function initDB () {
  await fs.remove(path.resolve(__dirname, '../shimo-sdk.db'))
  const db = require('../models/db')

  await db.exec(`CREATE TABLE \`users\` (
    \`id\` INTEGER PRIMARY KEY,
    \`username\` TEXT NOT NULL,
    \`password\` TEXT NOT NULL
  );`)

  await db.exec(`CREATE TABLE \`files\` (
    \`id\` INTEGER PRIMARY KEY,
    \`guid\` TEXT NOT NULL,
    \`user_id\` INTEGER NOT NULL,
    \`title\` TEXT DEFAULT '无标题',
    \`type\` TEXT DEFAULT '',
    \`created_at\` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
  );`)
}

async function init () {
  await initDB()
}

init().catch(err => logger.error(err))
