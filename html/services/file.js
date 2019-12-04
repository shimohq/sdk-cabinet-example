'use strict'

const config = require('config')
const got = require('got')

const request = got.extend({
  baseUrl: config.apiServer,
  json: true
})

module.exports = {
  async list (token, page) {
    return (await request.get('/files', {
      query: { page },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).body
  },

  async get (token, fileGuid) {
    return (await request.get(`/files/${fileGuid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })).body
  }
}
