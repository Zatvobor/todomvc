import expect from 'expect'

import * as http from '../../js/gateway/http'
import fetch from 'fetch-mock'


describe('http gateway', () => {
  afterEach(() => { fetch.restore() })

  context('authorizations', () => {
    xit('.postAuth()', (done) => {
      const matcher = function(url, opts) {
        const a = (url === 'http://localhost:8100/auth')
        const body = JSON.parse(opts.body)
        return (a && body.app && body.publicKey && body.nonce && body.permissions)
      }

      const response = { status: 200, body: JSON.stringify({}) }
      fetch.mock(matcher, 'POST', response)

      http.postAuth().then((response) => {
        expect(response.status).toEqual(200)
        expect(response.__parsedResponseBody__).toEqual({})
        done()
      })
    })
    it('.getAuth(token)', (done) => {
      const matcher = function(url, opts) {
        const a = (url === 'http://localhost:8100/auth')
        const b = (opts.headers['Authorization'] == 'Bearer token')
        return (a && b)
      }
      fetch.mock(matcher, 'GET', 200)
      http.getAuth('token').then((response) => {
        expect(response.status).toEqual(200)
        done()
      })
    })
    it('.deleteAuth(token)', (done) => {
      const matcher = function(url, opts) {
        const a = (url === 'http://localhost:8100/auth')
        const b = (opts.headers['Authorization'] == 'Bearer token')
        return (a && b)
      }
      fetch.mock(matcher, 'DELETE', 200)
      http.deleteAuth('token').then((response) => {
        expect(response.status).toEqual(200)
        done()
      })
    })
  })

  context('persistence', () => {
    xit('.getFile(token, key, nonce)', (done) => {
      const matcher = function(url, opts) {
        const a = (url === 'http://localhost:8100/nfs/file/todomvc.json')
        const b = (opts.headers['Authorization'] == 'Bearer token')
        return (a && b)
      }
      const response = { status: 200, body: JSON.stringify({}) }

      fetch.mock(matcher, 'GET', response)
      http.getFile('token').then((response) => {
        expect(response.status).toEqual(200)
        expect(response.__parsedResponseBody__).toEqual({})
        done()
      })
    })
    xit('.putFile(token, key, nonce, payload)', (done) => {
      const matcher = function(url, opts) {
        const a = (url === 'http://localhost:8100/nfs/file/todomvc.json')
        const b = (opts.headers['Authorization'] == 'Bearer token')
        const c = (opts.headers['Content-Type']  == 'text/plain')
        return (a && b && c)
      }

      fetch.mock(matcher, 'PUT', 200)
      http.putFile('token', {}).then((response) => {
        expect(response.status).toEqual(200)
        done()
      })
    })
    xit('.postFile(token, key, nonce)', (done) => {})
    xit('.deleteFile(token)', (done) => {})
  })

  context('app payload', () => {
    it('gets payload details from package.json', () => {
      const details = http.app()
      expect(details.name).toNotBe(undefined)
      expect(details.version).toNotBe(undefined)
      expect(details.vendor).toNotBe(undefined)
      expect(details.id).toNotBe(undefined)
    })
  })
})
