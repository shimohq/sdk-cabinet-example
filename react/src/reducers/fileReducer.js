import { SET_CURRENT_FILE, UPDATE_FILE_LIST, REMOVE_FILE_FROM_LIST } from '../actions'
import initialState from './initialState'

export default function fileReducer (state = initialState.File, action) {
  switch (action.type) {
    case SET_CURRENT_FILE:
      return Object.assign({}, state, { current: action.file })

    case UPDATE_FILE_LIST:
      return Object.assign({}, state, { list: action.files })

    case REMOVE_FILE_FROM_LIST:
      return Object.assign({}, state, {
        list: state.list.filter(file => file.guid !== action.fileGuid)
      })

    default:
      return state
  }
}
