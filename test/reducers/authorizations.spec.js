import expect from 'expect'

import reducer from '../../js/reducers/authorizations'
import * as actions from '../../js/actions/authorizations'

describe('authorizations reducer', () => {
  it('starts from the beginning', () => {
    expect(reducer(undefined, {})).toEqual({ inFlight: false, isAuthorized: false })
  })
  it('reduces a `willAuthorize` action', () => {
    expect(
      reducer({ inFlight: false, isAuthorized: false }, actions.willAuthorize())
    ).toEqual({ inFlight: true, isAuthorized: false })
  })
  it('reduces a successful `didAuthorized` action', () => {
    expect(
      reducer({ inFlight: true, isAuthorized: false }, actions.didAuthorized(true))
    ).toEqual({ inFlight: false, isAuthorized: true })
  })
  it('reduces a `didAuthorized` action that was failed', () => {
    expect(
      reducer({ inFlight: true, isAuthorized: false }, actions.didAuthorized(false))
    ).toEqual({ inFlight: false, isAuthorized: false })
  })
  it('reduces a `didAuthorized` action in case of pessmission was revoked', () => {
    expect(
      reducer({ inFlight: false, isAuthorized: false }, actions.didAuthorized(false))
    ).toEqual({ inFlight: false, isAuthorized: false })
  })
})
