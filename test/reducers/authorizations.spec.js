import expect from 'expect'
import authorizations from '../../js/reducers/authorizations'

describe('authorizations reducer', () => {
  it('starts from the beginning', () => {
    expect(authorizations(undefined, {})).toEqual({ inFlight: false, isAuthorized: false })
  })
  it('reduces a `willAuthorize` action', () => {
    expect(
      authorizations({ inFlight: false, isAuthorized: false }, { type: 'authorizing' })
    ).toEqual({ inFlight: true, isAuthorized: false })
  })
  it('reduces a successful `didAuthorized` action', () => {
    expect(
      authorizations({ inFlight: true, isAuthorized: false }, { type: 'authorized', isAuthorized: true })
    ).toEqual({ inFlight: false, isAuthorized: true })
  })
  it('reduces a `didAuthorized` action that was failed', () => {
    expect(
      authorizations({ inFlight: true, isAuthorized: false }, { type: 'authorized', isAuthorized: false })
    ).toEqual({ inFlight: false, isAuthorized: false })
  })
  it('reduces a `didAuthorized` action in case of pessmission was revoked', () => {
    expect(
      authorizations({ inFlight: false, isAuthorized: false }, { type: 'authorized', isAuthorized: false })
    ).toEqual({ inFlight: false, isAuthorized: false })
  })
})
