'use strict'

const container = document.querySelector('.editor-container')
const cabinet = window.cabinet = new window.ShimoCabinet({
  fileGuid: window.shimo.fileGuid,
  container,
  entrypoint: window.shimo.entrypoint,
  token: window.shimo.accessToken,
  editorOptions: {
    isMobile: window.isMobile,
    plugins: {
      Lock: {
        // 当前用户的权限
        permission: {
          read: true,
          edit: true,
          comment: true,
          lock: true,
          manage: true
        },

        // 获取协作者列表和相应的权限
        async fetchCollaborators () {
          const res = await fetch(`${window.config.apiServer}/files/${window.shimo.fileGuid}/collaborators`, {
            method: 'GET',
            headers: {
              authorization: `bearer ${window.config.apiToken}`,
              'content-type': 'application/json'
            }
          })
          if (res.status !== 200) {
            throw new Error(await res.text())
          }
          return res.json()
        }
      }
    }
  }
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
