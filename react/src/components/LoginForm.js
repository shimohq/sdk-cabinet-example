import React from 'react'
import PropTypes from 'prop-types'

class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = { username: '', password: '' }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onCallback({
      username: this.state.username,
      password: this.state.password
    })
  }

  handleChange (key) {
    return e => {
      this.setState({ [key]: e.target.value })
    }
  }

  render () {
    return (
      <form className='pt-3' onSubmit={this.handleSubmit}>
        <div className='form-group'>
          <input type='text' className='form-control form-control-lg' id='username' placeholder='Username' required pattern='^[\w]{3,12}$' value={this.state.username} onChange={this.handleChange('username')} />
        </div>
        <div className='form-group'>
          <input type='password' className='form-control form-control-lg' id='password' placeholder='Password' required pattern='^[a-z0-9_-]{6,32}$' value={this.state.password} onChange={this.handleChange('password')} />
        </div>
        <div className='mt-3'>
          <button className='majestic-btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'>登录</button>
        </div>
      </form>
    )
  }
}

LoginForm.propTypes = {
  onCallback: PropTypes.func.isRequired
}

export default LoginForm
