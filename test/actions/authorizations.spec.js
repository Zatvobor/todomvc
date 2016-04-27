import expect from 'expect'
import * as actions from '../../js/actions/authorizations'

describe('authorizations actions', () => {
  it('creates `willAuthorize` action', () => {
    expect(actions.willAuthorize()).toEqual({ type: 'authorizing' })
  })
  it('creates `didAuthorized` action', () => {
    expect(actions.didAuthorized(false)).toEqual({ type: 'authorized', isAuthorized: false })
  })
})
