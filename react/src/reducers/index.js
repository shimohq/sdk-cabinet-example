import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import File from './fileReducer'
import User from './userReducer'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  File,
  User
})

export default rootReducer
