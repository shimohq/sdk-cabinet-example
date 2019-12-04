import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import logo from '../assets/logo.png'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import { userLogin, userRegister } from '../actions'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showLogin: true
    }
    this.handleSwitchForm = this.handleSwitchForm.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
  }

  handleSwitchForm (e) {
    e.preventDefault()
    this.setState({ showLogin: !this.state.showLogin })
  }

  handleLogin (user) {
    this.props.userLogin(user).then(() => this.props.history.push('/'))
  }

  handleRegister (user) {
    this.props.userRegister(user).then(() => this.props.history.push('/'))
  }

  render () {
    const form = this.state.showLogin
      ? <LoginForm onCallback={this.handleLogin} />
      : <RegisterForm onCallback={this.handleRegister} />
    const switchText = this.state.showLogin ? '注册账号' : '登录'

    return (
      <div className='container-scroller'>
        <div className='container-fluid page-body-wrapper full-page-wrapper'>
          <div className='content-wrapper d-flex align-items-center auth px-0'>
            <div className='row w-100 mx-0'>
              <div className='col-lg-4 mx-auto'>
                <div className='auth-form-light text-left py-5 px-4 px-sm-5'>
                  <div className='brand-logo'>
                    <img src={logo} alt='石墨文档' />
                  </div>
                  <p>欢迎使用石墨 SDK 演示程序</p>
                  {form}
                  <div className='text-center mt-4 font-weight-light'>
                    <button type='button' className='majestic-btn btn-link' onClick={this.handleSwitchForm}>{switchText}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  userLogin: PropTypes.func,
  userRegister: PropTypes.func,
  history: PropTypes.object
}

export default connect(
  (state, ownProps) => ({
    history: ownProps.history
  }),
  dispatch => ({
    ...bindActionCreators({ userLogin, userRegister }, dispatch)
  })
)(LoginPage)
