import meta from '../../package.json'

export function app() {
  return {
    name: meta.description, version: meta.version, vendor: meta.author, id: meta.name
  }
}


import * as libsodium from 'libsodium-wrappers'

export function post_auth() {
  const assymetricKeys = libsodium.crypto_box_keypair()
  const nonce = libsodium.randombytes_buf(libsodium.crypto_box_NONCEBYTES)

  const payload = {
    app: app(),
    publicKey: new Buffer(assymetricKeys.publicKey).toString('base64'),
    nonce: new Buffer(nonce).toString('base64'),
    permissions: []
  }

  const init = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store'
  }

  return fetch('http://localhost:8100/auth', init)
}

export function get_auth(token) {
  const init = {
    method: 'GET',
    headers: {'Authorization':'Bearer ' + token },
    cache: 'no-store'
  }

  return fetch('http://localhost:8100/auth', init)
}

export function delete_auth(token) {
  const init = {
    method: 'DELETE',
    headers: {'Authorization':'Bearer ' + token }
  }

  return fetch('http://localhost:8100/auth', init)
}
