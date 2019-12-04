'use strict'

document.addEventListener('click', e => {
  let el

  (async () => {
    const elm = e.target

    if (elm.closest('[data-action="create"]')) {
      el = elm
      return createFile(elm)
    }

    if ((el = elm.closest('[class*="btn-export"]'))) {
      return exportFile(el)
    }

    if ((el = elm.closest('.btn-delete-file'))) {
      return deleteFile(el)
    }

    if ((el = elm.closest('[data-action="import"]'))) {
      return importFile(el)
    }
  })()
    .catch(err => alert((err && err.message) || err))
    .then(() => {
      if (el) {
        delete el.dataset.processing
      }
    })
})

async function createFile (elm) {
  if (elm.dataset.processing) {
    return
  }
  elm.dataset.processing = true

  const type = elm.getAttribute('data-type')
  const res = await fetch(`${window.config.apiServer}/files`, {
    method: 'POST',
    body: JSON.stringify({ type }),
    headers: {
      authorization: `Bearer ${window.config.apiToken}`,
      'content-type': 'application/json'
    }
  })
  if (res.status === 200) {
    const body = await res.json()
    location = `/files/${body.guid}`
  } else {
    alert(`Failed to create file: ${await res.text()}`)
  }
}

/**
 * @param {HTMLElement} elm
 */
async function exportFile (elm) {
  if (elm.dataset.processing) {
    return
  }
  elm.dataset.processing = true

  const fileGuid = elm.closest('tr').dataset.guid

  const url = new URL(`${window.config.apiServer}/files/${fileGuid}/export`)
  const params = url.searchParams

  if (elm.dataset.exportType) {
    params.set('toType', elm.dataset.exportType)
  }

  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${window.config.apiToken}`,
      'content-type': 'application/json'
    }
  })
  if (res.status !== 200) {
    throw new Error(`Failed to export file: ${res.status} ${await res.text()}`)
  }

  const a = document.createElement('a')
  a.setAttribute('download', '')
  a.href = await res.text()
  a.click()
}

/**
 * @param {HTMLElement} elm
 */
async function deleteFile (elm) {
  if (elm.dataset.processing) {
    return
  }
  elm.dataset.processing = true

  const tr = elm.closest('tr')
  const fileGuid = tr.dataset.guid

  const res = await fetch(`${window.config.apiServer}/files/${fileGuid}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${window.config.apiToken}`,
      'content-type': 'application/json'
    }
  })
  if (res.status !== 204) {
    throw new Error(`Failed to export file: ${res.status} ${await res.text()}`)
  }

  tr.parentNode.removeChild(tr)
}

/**
 * @param {HTMLElement} elm
 */
async function importFile (elm) {
  const input = document.createElement('input')
  input.type = 'file'
  // const input = document.querySelector('#import-input')
  input.value = ''

  if (elm.dataset.type === 'document-pro') {
    input.setAttribute('accept', '.docx')
    input.dataset.isDocumentPro = true
  } else {
    input.setAttribute('accept', '.docx,.xlsx')
    delete input.dataset.isDocumentPro
  }

  input.addEventListener('change', () => {
    const file = input.files[0]

    _importFile(file, getType(file.name, input.dataset.isDocumentPro))
      .then(file => {
        window.location.href = `/files/${file.guid}`
      })
      .catch(err => alert(err))

    function getType (name, isDocumentPro) {
      if (name.endsWith('.docx')) {
        return isDocumentPro ? 'document/modoc' : 'document/richdoc'
      }

      return 'sheet/modoc'
    }
  })

  input.click()
}

/**
 * @param {File} file
 * @param {string} type
 */
async function _importFile (file, type) {
  const content = await new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })

  const res = await fetch(`${window.config.apiServer}/files/import`, {
    method: 'POST',
    body: JSON.stringify({

      // IMPORTANT: remove "data:*/*;base64," before posting it
      fileBase64: content.replace(/^data:\S+;base64,/i, ''),

      type,
      name: file.name
    }),
    headers: {
      authorization: `Bearer ${window.config.apiToken}`,
      'content-type': 'application/json'
    }
  })
  if (res.status !== 200) {
    const error = new Error(await res.text())
    error.status = res.status
    throw error
  }
  return res.json()
}
