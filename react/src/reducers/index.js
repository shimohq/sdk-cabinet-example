import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import File from './fileReducer'
import User from './userReducer'
import Global from './globalReducer'

const rootReducer = history => combineReducers({
  router: connectRouter(history),
  File,
  User,
  Global
})

export default rootReducer
