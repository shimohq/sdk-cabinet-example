import React from 'react'
import PropTypes from 'prop-types'

class FileTitle extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false,
      title: props.file.title
    }

    this.inputRef = React.createRef()
    this.handleStartEditing = this.handleStartEditing.bind(this)
    this.handleSaveTitle = this.handleSaveTitle.bind(this)
  }

  componentDidMount () {
    this.inputRef.current.textContent = this.state.title
  }

  handleStartEditing () {
    this.setState({ editing: true })
    setTimeout(() => this.inputRef.current.focus())
  }

  handleSaveTitle () {
    const cleanUp = () => {
      this.setState({ editing: false })
    }
    this.props.onSave(this.props.file.guid, this.inputRef.current.textContent.trim())
      .then(cleanUp, cleanUp)
  }

  render () {
    const editBtn = this.state.editing
      ? <i className='mdi mdi-check cur-pointer btn-save-title ml-1' alt='保存' onClick={this.handleSaveTitle} />
      : <i className='mdi mdi-pencil cur-pointer btn-edit-title ml-1' alt='修改标题' onClick={this.handleStartEditing} />

    return (
      <ul className='navbar-nav mr-lg-4 w-100'>
        <li className='nav-item d-lg-block w-100 text-body ml-0'>
          <h4 ref={this.inputRef} className='file-title d-inline-block mb-0' contentEditable={this.state.editing} />
          {editBtn}
        </li>
      </ul>
    )
  }
}

FileTitle.propTypes = {
  file: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired
}

export default FileTitle
