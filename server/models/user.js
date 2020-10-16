'use strict'

const db = require('./db')
const camelCase = require('./util/camelcase')
const Shimo = require('./shimo')

class User {
  constructor (user) {
    Object.assign(this, user)
  }

  async getToken (options) {
    return Shimo.getToken({
      clientUserId: `shimo-sdk-${this.username}`
    })
  }

  toJSON () {
    return {
      id: this.id,
      username: this.username
    }
  }
}

module.exports = {
  async save (data) {
    return db.prepare('INSERT INTO users (username, password) VALUES (?, ?)')
      .run(data.username, data.password)
  },

  async get (username, password) {
    const user = await db.prepare('SELECT * FROM users WHERE username = ? AND password = ?').get(username, password)
    return user && new User(camelCase(user))
  },

  async getAllByIds (ids) {
    const users = await db.prepare(
      `SELECT * FROM users WHERE id in (${ids.map(() => '?').join(', ')})`
    ).all(...ids)

    return users ? users.map(u => new User(camelCase(u))) : []
  },

  async getAll () {
    const users = await db.prepare('SELECT * FROM users').all()
    return users ? users.map(u => new User(camelCase(u))) : []
  }
}
