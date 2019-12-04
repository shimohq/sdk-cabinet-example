'use strict'

const form = document.querySelector('form')
form.addEventListener('submit', e => {
  e.preventDefault()
  register(form).catch(err => alert(err && err.message || err))
})

async function register(form) {
  const res = await fetch('/api/register', {
    method: 'POST',
    body: JSON.stringify({
      username: form
        .querySelector('#username')
        .value,
      password: form
        .querySelector('#password')
        .value
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (res.status === 200) {
    location.href = '/'
  } else {
    throw new Error(`注册失败：${await res.text()}`)
  }
}
