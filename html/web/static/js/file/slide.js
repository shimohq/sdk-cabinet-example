'use strict'

const container = document.querySelector('.editor')
const cabinet = new window.ShimoCabinet({
  fileGuid: window.shimo.fileGuid,
  entrypoint: window.shimo.entrypoint,
  token: window.shimo.accessToken,

  container
})
cabinet.render()
  .then(() => {
    const spinner = document.querySelector('.spinner')
    spinner.parentElement.removeChild(spinner)
  })
  .catch(err => {
    alert(`Failed to render Shimo SDK: ${(err && err.message) || err}`)
    console.error(err)
  })
