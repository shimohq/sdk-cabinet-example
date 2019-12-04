import { API_SERVER } from '@/constants'

export default {
  state: {
    current: null
  },

  mutations: {
    setCurrentFile (state, file) {
      state.current = file
    }
  },

  actions: {
    setCurrentFile ({ commit }, file) {
      commit('setCurrentFile', file)
    },

    async createFile ({ rootState }, type) {
      const res = await fetch(`${API_SERVER}/files`, {
        method: 'POST',
        body: JSON.stringify({ type }),
        headers: {
          authorization: `Bearer ${rootState.User.token}`,
          'content-type': 'application/json'
        }
      })
      if (res.status !== 200) {
        const error = new Error(await res.text())
        error.status = res.status
        throw error
      }

      return res.json()
    },

    async importFile ({ rootState }, { file, type }) {
      const content = await new Promise(resolve => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
      })

      const res = await fetch(`${API_SERVER}/files/import`, {
        method: 'POST',
        body: JSON.stringify({

          // IMPORTANT: remove "data:*/*;base64," before posting it
          fileBase64: content.replace(/^data:\S+;base64,/i, ''),

          type,
          name: file.name
        }),
        headers: {
          authorization: `Bearer ${rootState.User.token}`,
          'content-type': 'application/json'
        }
      })
      if (res.status !== 200) {
        const error = new Error(await res.text())
        error.status = res.status
        throw error
      }
      return res.json()
    },

    async requestFiles ({ rootState }, { page, size }) {
      if (typeof size !== 'number') {
        size = 20
      }

      const url = new URL(`${API_SERVER}/files`)
      const params = url.searchParams
      params.append('page', page)
      params.append('size', size)

      const res = await fetch(url, {
        headers: {
          authorization: `Bearer ${rootState.User.token}`
        }
      })
      if (res.status !== 200) {
        const error = new Error(await res.text())
        error.status = res.status
        throw error
      }

      return res.json()
    },

    async requestFile ({ rootState, commit }, fileGuid) {
      const res = await fetch(`${API_SERVER}/files/${fileGuid}`, {
        headers: {
          authorization: `Bearer ${rootState.User.token}`
        }
      })
      if (res.status !== 200) {
        const error = new Error(await res.text())
        error.status = res.status
        throw error
      }

      const file = await res.json()
      commit('setCurrentFile', file)
      return file
    },

    async exportFile ({ rootState }, { file, toType }) {
      const url = new URL(`${API_SERVER}/files/${file.guid}/export`)
      url.searchParams.append('toType', toType)

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          authorization: `Bearer ${rootState.User.token}`
        }
      })
      if (res.status !== 200) {
        const error = new Error(await res.text())
        error.status = res.status
        throw error
      }
      return res.text()
    },

    async removeFile ({ rootState }, fileGuid) {
      const res = await fetch(`${API_SERVER}/files/${fileGuid}`, {
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${rootState.User.token}`
        }
      })
      if (res.status !== 204) {
        const error = new Error(await res.text())
        error.status = res.status
        throw error
      }
    },

    async updateFileTitle ({ rootState, dispatch }, { fileGuid, title }) {
      const res = await fetch(`${API_SERVER}/files/${fileGuid}`, {
        method: 'PATCH',
        body: JSON.stringify({ title }),
        headers: {
          authorization: `Bearer ${rootState.User.token}`,
          'content-type': 'application/json'
        }
      })
      if (res.status !== 204) {
        const error = new Error(await res.text())
        error.status = res.status
        throw error
      }
      return dispatch('requestFile', fileGuid)
    }
  }
}
