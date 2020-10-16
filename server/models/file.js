'use strict'

const camelCase = require('./util/camelcase')

const db = require('./db')

module.exports = {
  async save (data) {
    return db.prepare('INSERT INTO files (guid, user_id, type, title) VALUES (?, ?, ?, ?)')
      .run(data.guid, data.userId, data.type, data.title)
  },

  async get (data) {
    if (data.id) {
      return camelCase(await db.prepare('SELECT * FROM files WHERE `id` = ?').get(data.id))
    }

    return camelCase(await db.prepare('SELECT * FROM files WHERE `guid` = ?').get(data.guid))
  },

  async list (page = 0, size = 20) {
    const files = await db.prepare('SELECT * FROM files ORDER BY created_at DESC LIMIT ?, ?')
      .all(page * size, size)
    return Array.isArray(files) ? files.map(camelCase) : []
  },

  /**
   * @param {string} guid
   * @param {string} title
   */
  async updateTitle (guid, title) {
    await db.prepare('UPDATE files SET title = ? WHERE guid = ?').run(title, guid)
  },

  /**
   * @param {string} guid
   */
  async delete (guid) {
    await db.prepare('DELETE FROM files WHERE guid = ?').run(guid)
  },

  convertType (type) {
    const [main, sub] = type.split('/')
    switch (main) {
      case 'document':
        return sub === 'richdoc' ? 'document' : 'document-pro'
      case 'sheet':
        return 'sheet'
      case 'slide':
        return 'slide'
    }
    throw new Error(`Unknown type: ${type}`)
  }
}
