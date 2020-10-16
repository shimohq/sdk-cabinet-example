import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'

import { createFile, importFile } from '../actions'
import './Sidebar.css'

class Sidebar extends React.Component {
  constructor (props) {
    super(props)
    console.log('sidebar', this.props)
    this.importRef = React.createRef()
    this.handleFileSelected = this.handleFileSelected.bind(this)
  }

  handleCreateFile (fileType) {
    return e => {
      e.preventDefault()

      const elm = e.target
      if (elm.dataset.processing) {
        return
      }
      elm.dataset.processing = true

      create.call(this)
        .catch(err => alert(err))
        .then(() => delete elm.dataset.processing)

      async function create () {
        const file = await this.props.createFile(fileType)
        this.props.history.push(`/files/${file.guid}`)
      }
    }
  }

  handleImportFile (fileType) {
    return e => {
      e.preventDefault()

      const input = this.importRef.current
      input.value = ''
      if (fileType === 'document-pro') {
        input.setAttribute('accept', '.docx')
        input.dataset.isDocumentPro = true
      } else {
        input.setAttribute('accept', '.docx,.xlsx')
        delete input.dataset.isDocumentPro
      }
      input.click()
    }
  }

  handleFileSelected () {
    if (this._importing) {
      return
    }
    this._importing = true

    const input = this.importRef.current
    const file = input.files[0]

    this.props.importFile(file, getType(file.name, input.dataset.isDocumentPro))
      .then(file => this.props.history.push(`/files/${file.guid}`))
      .catch(err => alert(err))
      .then(() => (this._importing = false))

    function getType (name, isDocumentPro) {
      if (name.endsWith('.docx')) {
        return isDocumentPro ? 'document/modoc' : 'document/richdoc'
      }

      return 'sheet/modoc'
    }
  }

  render () {
    return (
      <nav className='sidebar sidebar-offcanvas' id='sidebar'>
        <ul className='nav'>
          <li className='nav-item'>
            <Link className='nav-link' to='/'>
              <span className='menu-title'>文件列表</span>
            </Link>
          </li>
          <li className='nav-item'>
            <span className='nav-link'>
              <span className='menu-title'>新建文档</span>
            </span>
            <div>
              <ul className='nav sub-menu'>
                <li className='nav-item'>
                  <button type='button' className='nav-link majestic-btn' onClick={this.handleCreateFile('document')}>文档</button>
                </li>
                <li className='nav-item'>
                  <button type='button' className='nav-link majestic-btn' onClick={this.handleCreateFile('documentPro')}>专业文档</button>
                </li>
                <li className='nav-item'>
                  <button type='button' className='nav-link majestic-btn' onClick={this.handleCreateFile('sheet')}>表格</button>
                </li>
                <li className='nav-item'>
                  <button type='button' className='nav-link majestic-btn' onClick={this.handleCreateFile('slide')}>幻灯片</button>
                </li>
              </ul>
            </div>
          </li>
          <li className='nav-item'>
            <span className='nav-link'>
              <span className='menu-title'>导入文档</span>
            </span>
            <div>
              <ul className='nav sub-menu'>
                <li className='nav-item'>
                  <button type='button' className='nav-link majestic-btn' onClick={this.handleImportFile()}>文档 / 表格</button>
                </li>
                <li className='nav-item'>
                  <button type='button' className='nav-link majestic-btn' onClick={this.handleImportFile('document-pro')}>专业文档</button>
                </li>
              </ul>
              <input type='file' ref={this.importRef} onChange={this.handleFileSelected} />
            </div>
          </li>
        </ul>
      </nav>
    )
  }
}

Sidebar.propTypes = {
  createFile: PropTypes.func.isRequired,
  importFile: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
}

export default withRouter(connect(
  (state, ownProps) => ({
    history: ownProps.history
  }),
  dispatch => ({
    ...bindActionCreators({ createFile, importFile }, dispatch)
  })
)(Sidebar))
