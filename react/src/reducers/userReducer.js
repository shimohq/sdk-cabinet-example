import store from 'store2'

import { USER_STORE_KEY, USER_TOKEN_STORE_KEY } from '../constants'
import { SET_CURRENT_USER } from '../actions'
import initialState from './initialState'

export default function userReducer (state = initialState.User, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      if (action.user) {
        store.set(USER_STORE_KEY, action.user)
        store.set(USER_TOKEN_STORE_KEY, action.token)

        return Object.assign({}, state, {
          me: action.user,
          token: action.token
        })
      }

      store.remove(USER_STORE_KEY)
      store.remove(USER_TOKEN_STORE_KEY)
      return Object.assign({}, state, {
        me: null,
        token: ''
      })

    default:
      return state
  }
}
