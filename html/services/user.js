'use strict'

const config = require('config')
const got = require('got')

const request = got.extend({
  baseUrl: typeof config.apiServerInternal === 'string' && config.apiServerInternal.trim() ? config.apiServerInternal : config.apiServer,
  json: true
})

module.exports = {
  async login (username, password) {
    return (await request.post('/login', {
      body: { username, password }
    })).body
  },

  async register (username, password) {
    return (await request.post('/register', {
      body: { username, password }
    })).body
  },

  async getInfo (token) {
    return (await request.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })).body
  }
}
