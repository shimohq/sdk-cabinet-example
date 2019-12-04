import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import logo from '../assets/logo.png'
import FileTitle from './FileTitle'

class Header extends React.Component {
  constructor (props) {
    super(props)

    this.handleUpdateFileTitle = this.handleUpdateFileTitle.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleUpdateFileTitle (fileGuid, newTitle) {
    return this.props.onUpdateTitle(fileGuid, newTitle)
  }

  handleLogout (e) {
    e.preventDefault()
    this.props.onLogout()
  }

  render () {
    return (
      <nav className='navbar col-lg-12 col-12 p-0 d-flex flex-row'>
        <div className='navbar-brand-wrapper d-flex justify-content-center'>
          <div className='navbar-brand-inner-wrapper d-flex justify-content-between align-items-center w-100'>
            <Link className='navbar-brand brand-logo' to='/'><img src={logo} alt='石墨文档' /></Link>
          </div>
        </div>
        <div className='navbar-menu-wrapper d-flex align-items-center justify-content-end'>
          {this.props.file && <FileTitle file={this.props.file} onSave={this.handleUpdateFileTitle} />}
          <ul className='navbar-nav navbar-nav-right'>
            <li className='nav-item nav-profile dropdown'>
              <span className='nav-link dropdown-toggle' data-toggle='dropdown' id='profileDropdown'>
                <span className='nav-profile-name'>{this.props.user.username}</span>
              </span>
              <div className='dropdown-menu dropdown-menu-right navbar-dropdown' aria-labelledby='profileDropdown'>
                <a className='dropdown-item' href='/logout' onClick={this.handleLogout}>
                  <i className='mdi mdi-logout text-primary' />
                  登出
                </a>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

Header.propTypes = {
  file: PropTypes.object,
  user: PropTypes.object,
  onUpdateTitle: PropTypes.func,
  onLogout: PropTypes.func
}

export default Header
