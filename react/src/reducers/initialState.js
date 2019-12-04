import store from 'store2'

import { USER_STORE_KEY, USER_TOKEN_STORE_KEY } from '../constants'

let token = ''
let me
const _me = store.get(USER_STORE_KEY)
if (_me && new Date(_me.exp * 1000) > Date.now()) {
  me = _me
  token = store.get(USER_TOKEN_STORE_KEY)
}

export default {
  File: {
    list: [],
    current: null
  },
  User: {
    me,
    token
  }
}
