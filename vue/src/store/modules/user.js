import store from 'store2'

import { USER_STORE_KEY, USER_TOKEN_STORE_KEY, API_SERVER } from '@/constants'

let token
let me
const _me = store.get(USER_STORE_KEY)
if (_me && new Date(_me.exp * 1000) > Date.now()) {
  me = _me
  token = store.get(USER_TOKEN_STORE_KEY)
}

export default {
  state: {
    me,
    token
  },

  mutations: {
    setCurrentUser (state, { user, token }) {
      if (user) {
        state.me = user
        state.token = token
        store.set(USER_STORE_KEY, user)
        store.set(USER_TOKEN_STORE_KEY, token)
      } else {
        state.me = null
        state.token = null
      }
    }
  },

  actions: {
    async userLogout ({ commit }) {
      commit('setCurrentUser', {})
    },

    async userLogin ({ commit }, user) {
      const res = await fetch(`${API_SERVER}/login`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.status !== 200) {
        throw new Error(await res.text())
      }

      const { token } = await res.json()
      const u = await fetch(`${API_SERVER}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())

      commit('setCurrentUser', { user: u, token })
    },

    async userRegister ({ commit }, user) {
      const res = await fetch(`${API_SERVER}/register`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (res.status !== 200) {
        throw new Error(await res.text())
      }

      const { token } = await res.json()
      const u = await fetch(`${API_SERVER}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())

      commit('setCurrentUser', { user: u, token })
    }
  }
}
