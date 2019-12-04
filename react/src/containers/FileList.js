import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { requestFiles, exportFile, removeFile } from '../actions'
import File from '../components/File'

class FileList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      page: 0,
      size: 20
    }

    this.handleRemove = this.handleRemove.bind(this)
    this.handleExport = this.handleExport.bind(this)
  }

  componentDidMount () {
    this.props.requestFiles(this.state.page, this.state.size)
  }

  async handleRemove (file) {
    await this.props.removeFile(file.guid)
      .catch(err => alert(err))
  }

  async handleExport (file, toType) {
    await this.props.exportFile(file, toType)
      .then(url => {
        const a = document.createElement('a')
        a.setAttribute('download', '')
        a.href = url
        a.click()
      })
      .catch(err => alert(err))
  }

  handleChangePage (page) {
    return () => {
      this.props.requestFiles(page, this.state.size)
        .then(
          () => this.setState({ page }),
          err => alert(err)
        )
    }
  }

  render () {
    const files = this.props.files.map(file => {
      return <File file={file} key={file.guid} onRemove={this.handleRemove} onExport={this.handleExport} />
    })

    const paginationClasses = `d-flex justify-content-between mt-3 flex-row${files.length >= this.state.size ? '-reverse' : ''}`

    return (
      <div className='row flex-grow-1'>
        <div className='col-lg-12 grid-margin stretch-card'>
          <div className='card'>
            <div className='card-body'>
              <h4 className='card-title'>文件列表</h4>
              <div className='table-responsive'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>文件名</th>
                      <th>GUID</th>
                      <th>创建者</th>
                      <th>创建时间</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files}
                  </tbody>
                </table>
                <div className={paginationClasses}>
                  {files.length >= this.state.size &&
                    <button type='button' className='majestic-btn btn-link' onClick={this.handleChangePage(this.state.page + 1)}>下一页</button>}
                  {this.state.page > 0 &&
                    <button type='button' className='majestic-btn btn-link' onClick={this.handleChangePage(this.state.page - 1)}>上一页</button>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

FileList.propTypes = {
  files: PropTypes.array,
  requestFiles: PropTypes.func,
  removeFile: PropTypes.func,
  exportFile: PropTypes.func
}

export default connect(
  (state, ownProps) => ({
    files: state.File.list,
    state,
    ownProps
  }),
  dispatch => ({
    ...bindActionCreators({ requestFiles, exportFile, removeFile }, dispatch)
  })
)(FileList)
