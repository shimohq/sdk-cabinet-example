'use strict'

const config = require('config')
const got = require('got')

const request = got.extend({
  baseUrl: config.shimo.entrypoint,
  json: true
})

module.exports = {
  async getToken (username, options) {
    const body = Object.assign({
      clientId: config.shimo.clientId,
      clientSecret: config.shimo.clientSecret,
      scope: 'write',
      grantType: 'client_credentials',
      clientUserId: `shimo_cabinet_${username}`
    }, options)

    return (await request.post('/oauth2/token', {
      body
    })).body
  },

  async createFile (username, data) {
    const token = await this.getToken(username)

    const res = await request.post('/files', {
      body: data,
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    })
    return res.body
  },

  async importFile (username, data) {
    const token = await this.getToken(username)

    const res = await request.post('/files/import', {
      body: data,
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    })
    return res.body
  },

  /**
   * @param {string} username
   * @param {string} guid
   * @returns {Promise.<{ file, token }>}
   */
  async getFile (username, guid) {
    const token = await this.getToken(username, {
      info: {
        fileGuid: guid,
        filePermissions: {
          readable: true,
          editable: true,
          commentable: true
        }
      }
    })

    const res = await request.get(`/files/${guid}`, {
      query: {
        withConfig: true
      },
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    })
    return res.body
  },

  /**
   * @param {string} username
   * @param {string} guid
   * @param {string} [toType]
   * @returns {Promise.<{ file, token }>}
   */
  async exportFile (username, guid, toType) {
    const token = await this.getToken(username, {
      info: {
        fileGuid: guid,
        filePermissions: {
          readable: true,
          editable: true,
          commentable: true
        }
      }
    })

    const res = await request.get(`/files/${guid}/export`, {
      query: { toType },
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      },
      json: false
    })
    return res.body
  },

  async deleteFile (username, guid) {
    const token = await this.getToken(username, {
      info: {
        fileGuid: guid,
        filePermissions: {
          readable: true,
          editable: true,
          commentable: true
        }
      }
    })

    await request.delete(`/files/${guid}`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    })
  },

  /**
   * @param {string} username
   * @param {string} guid
   * @param {string} title
   */
  async updateTitle (username, guid, title) {
    const token = await this.getToken(username, {
      info: {
        fileGuid: guid,
        filePermissions: {
          readable: true,
          editable: true,
          commentable: true
        }
      }
    })

    await request.patch(`/files/${guid}/title`, {
      body: { name: title },
      headers: {
        Authorization: `Bearer ${token.accessToken}`
      }
    })
  },

  /**
   * A proxy for Shimo API
   * @param {string} url
   * @param {object} options
   * @param {object} [options.body]
   * @param {object} [options.method]
   * @param {object} [options.query]
   * @param {object} [options.headers]
   */
  async proxy (url, options = {}) {
    if (options.headers) {
      delete options.headers.host
    }

    return request(url, options)
  }
}
