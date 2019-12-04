'use strict'

const container = document.querySelector('.editor-container')
const cabinet = new window.ShimoCabinet({
  fileGuid: window.shimo.fileGuid,
  container,
  entrypoint: window.shimo.entrypoint,
  token: window.shimo.accessToken
})
cabinet.render()
  .then(editor => {
    const spinner = document.querySelector('.spinner')
    spinner.parentElement.removeChild(spinner)
  })
  .catch(err => {
    alert(`Failed to render Shimo SDK: ${(err && err.message) || err}`)
    console.error(err)
  })
