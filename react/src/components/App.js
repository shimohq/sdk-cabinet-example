/* eslint-disable import/no-named-as-default */
import { Route, Switch } from 'react-router-dom'
import React from 'react'

import LoginPage from '../containers/LoginPage'
import HomeRoute from './HomeRoute'
import './App.css'

class App extends React.Component {
  render () {
    return (
      <>
        <Switch>
          <Route exact path={['/login', '/register']} component={LoginPage} />
          <HomeRoute path='/' />
        </Switch>
      </>
    )
  }
}

export default App
