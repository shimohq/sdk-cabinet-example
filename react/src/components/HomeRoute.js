import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PageHeader from '../containers/PageHeader'
import HomePage from './HomePage'
import EditorPage from '../containers/EditorPage'

class HomeRoute extends React.Component {
  render () {
    if (!this.props.me) {
      return <Redirect to={{ pathname: '/login' }} />
    }

    return (
      <div className='container-scroller'>
        <PageHeader />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route excat path='/files/:guid' component={EditorPage} />
        </Switch>
      </div>
    )
  }
}

HomeRoute.propTypes = {
  me: PropTypes.object
}

export default connect(state => ({ me: state.User.me }))(HomeRoute)
