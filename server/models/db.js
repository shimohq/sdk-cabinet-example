'use strict'

const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.resolve(__dirname, '..', 'shimo-sdk.db'))

module.exports = db
