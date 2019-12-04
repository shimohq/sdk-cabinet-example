import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import { requestFile, setCurrentFile } from '../actions'

const DocumentEditor = React.lazy(() => import('../components/DocumentEditor'))
const DocumentProEditor = React.lazy(() => import('../components/DocumentProEditor'))
const SlideEditor = React.lazy(() => import('../components/SlideEditor'))
const SheetEditor = React.lazy(() => import('../components/SheetEditor'))

class EditorPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = { ready: false }

    this.handleReady = this.handleReady.bind(this)
  }

  handleReady () {
    this.setState({ ready: true })
  }

  componentDidMount () {
    this.props.requestFile(this.props.match.params.guid)
      .catch(err => alert(err))
  }

  componentWillUnmount () {
    this.props.setCurrentFile(null)
  }

  render () {
    if (!this.props.file) {
      return <div className='container-scroller' />
    }

    const Editor = getEditor(this.props.file.type)

    return (
      <div className='container-fluid page-body-wrapper pt-0'>
        <div className='main-panel w-100 position-relative'>
          <div className='row d-flex flex-grow-1'>
            <div className='col-lg-12 grid-margin stretch-card m-0 flex-column-reverse position-relative'>
              <Suspense fallback={<div />}>
                <Editor file={this.props.file} onReady={this.handleReady} />
              </Suspense>
            </div>
          </div>
          {this.state.ready ||
            <div className='spinner d-flex justify-content-center p-5 w-100'>
              <div className='spinner-border text-dark' role='status'>
                <span className='sr-only'>Loading...</span>
              </div>
            </div>}
        </div>
      </div>
    )

    function getEditor (type) {
      switch (type) {
        case 'document/richdoc':
          return DocumentEditor

        case 'document/modoc':
          return DocumentProEditor

        case 'slide/modoc':
          return SlideEditor

        case 'sheet/modoc':
          return SheetEditor

        default:
          throw new Error(`Unknown editor: ${type}`)
      }
    }
  }
}

EditorPage.propTypes = {
  match: PropTypes.object,
  requestFile: PropTypes.func,
  setCurrentFile: PropTypes.func,
  file: PropTypes.object
}

export default connect(
  state => ({
    file: state.File.current
  }),
  dispatch => ({
    ...bindActionCreators({ requestFile, setCurrentFile }, dispatch)
  })
)(EditorPage)
