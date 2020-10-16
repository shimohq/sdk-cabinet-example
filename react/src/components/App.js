/* eslint-disable import/no-named-as-default */
import { Route, Switch } from 'react-router-dom'
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import LoginPage from '../containers/LoginPage'
import HomeRoute from './HomeRoute'
import './App.css'

class App extends React.Component {
  render () {
    if (this.props.isMobile) {
      document.querySelector('html').classList.add('mobile-view')
    }

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

App.propTypes = {
  isMobile: PropTypes.bool
}

export default connect(
  (state, ownProps) => {
    return {
      isMobile: state.Global.isMobile
    }
  },
  dispatch => ({})
)(App)
