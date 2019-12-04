import { API_SERVER } from '../constants'

export const CREATE_FILE = 'CREATE_FILE'
export function createFile (type) {
  return async (dispatch, getState) => {
    const res = await fetch(`${API_SERVER}/files`, {
      method: 'POST',
      body: JSON.stringify({ type }),
      headers: {
        authorization: `Bearer ${getState().User.token}`,
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
}

export const SET_CURRENT_FILE = 'SET_CURRENT_FILE'
export function setCurrentFile (file) {
  return { type: SET_CURRENT_FILE, file }
}

export const IMPORT_FILE = 'IMPORT_FILE'
export function importFile (file, type) {
  return async (dispatch, getState) => {
    const content = await new Promise(resolve => {
      const reader = new FileReader()
      reader.addEventListener('load', () => resolve(reader.result), false)
      reader.readAsDataURL(file)
    })

    const res = await fetch(`${API_SERVER}/files/import`, {
      method: 'POST',
      body: JSON.stringify({

        // IMPORTANT: remove "data:*/*;base64," before posting it
        fileBase64: content.replace(/^data:\S+;base64,/i, ''),

        type,
        name: file.name
      }),
      headers: {
        authorization: `Bearer ${getState().User.token}`,
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
}

export const REQUEST_FILES = 'REQUEST_FILES'
export function requestFiles (page, size = 20) {
  return async (dispatch, getState) => {
    const url = new URL(`${API_SERVER}/files`)
    const params = url.searchParams
    params.append('page', page)
    params.append('size', size)

    const res = await fetch(url, {
      headers: {
        authorization: `Bearer ${getState().User.token}`
      }
    })
    if (res.status !== 200) {
      const error = new Error(await res.text())
      error.status = res.status
      throw error
    }
    dispatch(updateFileList(await res.json()))
  }
}

export const REQUEST_FILE = 'REQUEST_FILE'
export function requestFile (fileGuid) {
  return async (dispatch, getState) => {
    const res = await fetch(`${API_SERVER}/files/${fileGuid}`, {
      headers: {
        authorization: `Bearer ${getState().User.token}`
      }
    })
    if (res.status !== 200) {
      const error = new Error(await res.text())
      error.status = res.status
      throw error
    }
    dispatch(setCurrentFile(await res.json()))
  }
}

export const UPDATE_FILE_LIST = 'UPDATE_FILE_LIST'
export function updateFileList (files) {
  return {
    type: UPDATE_FILE_LIST,
    files
  }
}

export const EXPORT_FILE = 'EXPORT_FILE'
export function exportFile (file, toType) {
  return async (dispatch, getState) => {
    const url = new URL(`${API_SERVER}/files/${file.guid}/export`)
    url.searchParams.append('toType', toType)

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${getState().User.token}`
      }
    })
    if (res.status !== 200) {
      const error = new Error(await res.text())
      error.status = res.status
      throw error
    }
    return res.text()
  }
}

export const REMOVE_FILE = 'REMOVE_FILE'
export function removeFile (fileGuid) {
  return async (dispatch, getState) => {
    const res = await fetch(`${API_SERVER}/files/${fileGuid}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${getState().User.token}`
      }
    })
    if (res.status !== 204) {
      const error = new Error(await res.text())
      error.status = res.status
      throw error
    }
    dispatch(removeFileFromList(fileGuid))
  }
}

export const REMOVE_FILE_FROM_LIST = 'REMOVE_FILE_FROM_LIST'
export function removeFileFromList (fileGuid) {
  return { type: REMOVE_FILE_FROM_LIST, fileGuid }
}

export const UPDATE_FILE_TITLE = 'UPDATE_FILE_TITLE'
export function updateFileTitle (fileGuid, title) {
  return async (dispatch, getState) => {
    const res = await fetch(`${API_SERVER}/files/${fileGuid}`, {
      method: 'PATCH',
      body: JSON.stringify({ title }),
      headers: {
        authorization: `Bearer ${getState().User.token}`,
        'content-type': 'application/json'
      }
    })
    if (res.status !== 204) {
      const error = new Error(await res.text())
      error.status = res.status
      throw error
    }
    await requestFile(fileGuid)(dispatch, getState)
  }
}

export const USER_REGISTER = 'USER_REGISTER'
export function userRegister (user) {
  return async function (dispatch) {
    const res = await fetch(`${API_SERVER}/register`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status !== 200) {
      throw new Error(await res.text())
    }

    const { token } = await res.json()
    const u = await fetch(`${API_SERVER}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())

    dispatch(setCurrentUser({ user: u, token }))
  }
}

export const USER_LOGIN = 'USER_LOGIN'
export function userLogin (user) {
  return async function (dispatch) {
    const res = await fetch(`${API_SERVER}/login`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status !== 200) {
      throw new Error(await res.text())
    }

    const { token } = await res.json()
    const u = await fetch(`${API_SERVER}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())

    dispatch(setCurrentUser({ user: u, token }))
  }
}

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export function setCurrentUser ({ user, token }) {
  return {
    type: SET_CURRENT_USER,
    user,
    token
  }
}
