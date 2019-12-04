import React from 'react'
import PropTypes from 'prop-types'

import ShimoCabinet from 'shimo-sdk-cabinet/dist/document.min'

class DocumentEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ready: false
    }

    this.editorRef = React.createRef()
  }

  componentDidMount () {
    const file = this.props.file

    this.cabinet = new ShimoCabinet({
      fileGuid: file.guid,
      entrypoint: file.config.entrypoint,
      token: file.config.token,

      container: this.editorRef.current
    })
    this.cabinet.render()
      .then(() => {
        if (this.props.onReady) {
          this.props.onReady()
        }
      })
  }

  componentWillUnmount () {
    if (this.cabinet) {
      this.cabinet.destroy()
    }
  }

  render () {
    return (
      <div className='editor-container'>
        <div className='editor-toolbar' />
        <div className='editor-body position-relative row d-flex flex-grow-1 justify-content-center'>
          <div className='editor flex-grow-1' ref={this.editorRef} />
        </div>
      </div>
    )
  }
}

DocumentEditor.propTypes = {
  file: PropTypes.object.isRequired,
  onReady: PropTypes.func
}

export default DocumentEditor
