import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import Header from '../components/Header'
import { updateFileTitle, setCurrentUser } from '../actions'

class PageHeader extends React.Component {
  constructor (props) {
    super(props)

    this.handleUpdateFileTitle = this.handleUpdateFileTitle.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleUpdateFileTitle (fileGuid, newTitle) {
    return this.props.updateFileTitle(fileGuid, newTitle)
      .catch(err => alert(err))
  }

  handleLogout () {
    this.props.setCurrentUser({ user: null })
    this.props.history.push('/')
  }

  render () {
    return (
      <Header
        file={this.props.file}
        onUpdateTitle={this.handleUpdateFileTitle}
        onLogout={this.handleLogout}
        user={this.props.me}
      />
    )
  }
}

PageHeader.propTypes = {
  file: PropTypes.object,
  me: PropTypes.object,
  updateFileTitle: PropTypes.func,
  setCurrentUser: PropTypes.func,
  history: PropTypes.object
}

export default withRouter(connect(
  (state, ownProps) => ({
    file: state.File.current,
    me: state.User.me,
    history: ownProps.history
  }),
  dispatch => ({
    ...bindActionCreators({ updateFileTitle, setCurrentUser }, dispatch)
  })
)(PageHeader))
