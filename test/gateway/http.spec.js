import expect from 'expect'

import * as http from '../../js/gateway/http'
import fetch from 'fetch-mock'


describe('http gateway', () => {
  afterEach(() => { fetch.restore() })

  it('#post_auth', (done) => {
    const matcher = function(url, opts) {
      const a = (url === 'http://localhost:8100/auth')
      const body = JSON.parse(opts.body)
      return a && body.app && body.publicKey && body.nonce && body.permissions
    }
    const response = { status: 200, body: JSON.stringify({}) }

    fetch.mock(matcher, 'POST', response)
    http.post_auth().then((response) => {
      expect(response.status).toEqual(200)
      done()
    })
  })

  it('#get_auth', (done) => {
    const matcher = function(url, opts) {
      const a = (url === 'http://localhost:8100/auth')
      const b = (opts.headers['Authorization'] == 'Bearer token')
      return a && b
    }
    fetch.mock(matcher, 'GET', 200)
    http.get_auth('token').then((response) => {
      expect(response.status).toEqual(200)
      done()
    })
  })

  it('#delete_auth', (done) => {
    const matcher = function(url, opts) {
      const a = (url === 'http://localhost:8100/auth')
      const b = (opts.headers['Authorization'] == 'Bearer token')
      return a && b
    }
    fetch.mock(matcher, 'DELETE', 200)
    http.delete_auth('token').then((response) => {
      expect(response.status).toEqual(200)
      done()
    })
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
