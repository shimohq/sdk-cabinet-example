import React from 'react'

import Sidebar from './Sidebar'
import FileList from '../containers/FileList'

class HomePage extends React.Component {
  render () {
    return (
      <div className='container-fluid page-body-wrapper pt-0'>
        <Sidebar />

        <div className='main-panel'>
          <div className='content-wrapper d-flex'>
            <FileList />
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage
