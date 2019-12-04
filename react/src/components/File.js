import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class File extends React.Component {
  constructor (props) {
    super(props)

    const file = this.props.file
    const humanizedType = getFileType(file.type)
    const meta = getTypeMeta(humanizedType)

    this.state = {
      humanizedType,
      ...meta
    }

    this.handleExport = this.handleExport.bind(this)
    this.handleExportPDF = this.handleExportPDF.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  /**
   * @param {HTMLElmenet} elm
   * @param {string} type
   */
  doExport (elm, type) {
    if (elm.dataset.exporting) {
      return
    }
    elm.dataset.exporting = true

    return this.props.onExport(this.props.file, type)
      .catch(err => alert(err))
      .then(() => delete elm.dataset.exporting)
  }

  /**
   * @param {Event} e
   */
  handleExport (e) {
    this.doExport(e.target, this.state.exportType)
  }

  /**
   * @param {Event} e
   */
  handleExportPDF (e) {
    this.doExport(e.target, 'pdf')
  }

  /**
   * @param {Event} e
   */
  handleRemove (e) {
    const elm = e.target
    if (elm.dataset.removing) {
      return
    }
    elm.dataset.removing = true

    this.props.onRemove(this.props.file)
      .catch(err => alert(err))
      .then(() => delete elm.dataset.removing)
  }

  render () {
    const file = this.props.file
    const route = `/files/${file.guid}`
    const titleClasses = `mdi mdi-file-${this.state.icon}`

    return (
      <tr>
        <td>
          <Link to={route} className='text-primary'>
            <i className={titleClasses} title={this.state.typeLabel} />
            {file.title}
          </Link>
        </td>
        <td>
          <Link to={route} className='text-primary'>{file.guid}</Link>
        </td>
        <td>{file.user.username}</td>
        <td>{file.createdAt}</td>
        <td>
          <button type='button' className='majestic-btn btn-outline-secondary btn-rounded btn-icon btn-export-file mr-1' title='导出' onClick={this.handleExport}>
            <i className='mdi mdi-download' />
          </button>
          {this.state.canExportPDF &&
            <button type='button' className='majestic-btn btn-outline-secondary btn-rounded btn-icon btn-export-pdf mr-1' title='导出 PDF' data-export-type='pdf' onClick={this.handleExportPDF}>
              <i className='mdi mdi-file-pdf-box' />
            </button>}
          <button type='button' className='majestic-btn btn-outline-secondary btn-rounded btn-icon btn-delete-file' title='删除' onClick={this.handleRemove}>
            <i className='mdi mdi-delete-forever' />
          </button>
        </td>
      </tr>
    )
  }
}

File.propTypes = {
  file: PropTypes.object.isRequired,
  onRemove: PropTypes.func,
  onExport: PropTypes.func
}

function getFileType (type) {
  const [main, sub] = type.split('/')

  switch (main) {
    case 'document':
      if (sub === 'richdoc') {
        return 'document'
      }
      return 'document-pro'

    case 'sheet':
      return 'sheet'

    case 'slide':
      return 'slide'

    default:
      throw new Error(`Unknown type: ${type}`)
  }
}

function getTypeMeta (type) {
  switch (type) {
    case 'document':
      return {
        icon: 'document',
        label: '文档',
        exportType: 'docx',
        canExportPDF: true
      }

    case 'document-pro':
      return {
        icon: 'word',
        label: '专业文档',
        exportType: 'docx',
        canExportPDF: true
      }

    case 'sheet':
      return {
        icon: 'excel',
        label: '表格',
        exportType: 'xlsx',
        canExportPDF: true
      }

    case 'slide':
      return {
        icon: 'powerpoint',
        label: '幻灯片',
        exportType: 'pptx',
        canExportPDF: false
      }

    default:
      throw new Error(`Unknown type: ${type}`)
  }
}

export default File
