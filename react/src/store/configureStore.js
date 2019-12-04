import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer from '../reducers'

export const history = createBrowserHistory()

function configureStore (initialState) {
  const middlewares = [
    routerMiddleware(history),

    // thunk middleware can also accept an extra argument to be passed to each thunk action
    // https://github.com/reduxjs/redux-thunk#injecting-a-custom-argument
    thunk,

    createLogger()
  ]

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // add support for Redux dev tools
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  )

  return store
}

export default configureStore
