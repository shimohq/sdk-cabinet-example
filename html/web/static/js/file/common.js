'use strict'

document.addEventListener('click', e => {
  const elm = e.target
  let el

  if ((el = elm.closest('.btn-edit-title'))) {
    editFileTitle(el)
    return
  }

  if ((el = elm.closest('.btn-save-title'))) {
    saveFileTitle(el)
  }
})

function editFileTitle (elm) {
  const title = elm.parentNode.querySelector('.file-title')
  title.setAttribute('contenteditable', '')
  title.focus()

  elm.classList.add('d-none')
  elm.parentNode.querySelector('.btn-save-title').classList.remove('d-none')
}

async function saveFileTitle (elm) {
  try {
    const title = elm.parentNode.querySelector('.file-title')

    const res = await fetch(`${window.config.apiServer}/files/${window.shimo.fileGuid}`, {
      method: 'PATCH',
      body: JSON.stringify({ title: title.textContent.trim() }),
      headers: {
        authorization: `bearer ${window.config.apiToken}`,
        'content-type': 'application/json'
      }
    })
    if (res.status !== 204) {
      throw new Error(await res.text())
    }

    title.removeAttribute('contenteditable')
    elm.classList.add('d-none')
    elm.parentNode.querySelector('.btn-edit-title').classList.remove('d-none')
  } catch (e) {
    alert(`Failed to save file tile: ${(e && e.message) || e}`)
  }
}
