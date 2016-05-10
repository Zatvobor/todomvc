import expect from 'expect'

import reducer from '../../js/reducers/persistencies'
import * as actions from '../../js/actions/persistencies'

describe('persistencies reducer', () => {
  it('starts from the beginning', () => {
    expect(reducer(undefined, {})).toEqual({ inFlight: false })
  })

  describe('in loading context', () => {
    it('reduces a `willGet()` action', () => {
      expect(
        reducer({ inFlight: false }, actions.willGet())
      ).toEqual({ inFlight: true })
    })
    it('reduces a successful `didGet([<<objects>>])` action', () => {
      expect(
        reducer({ inFlight: true }, actions.didGet([1,3]))
      ).toEqual({ inFlight: false, todos: [1,3], isFailed: undefined, isOk: true })
    })
    it('reduces a failed `didGet(false)` action', () => {
      expect(
        reducer({ inFlight: true }, actions.didGet(false))
      ).toEqual({ inFlight: false, todos: undefined, isFailed: true, isOk: undefined })
    })
  })

  describe('in storing context', () => {
    it('reduces a `willPut()` action', () => {
      expect(
        reducer({ inFlight: false }, actions.willPut())
      ).toEqual({ inFlight: true })
    })
    it('reduces a successful `didPut(true)` action', () => {
      expect(
        reducer({ inFlight: true }, actions.didPut(true))
      ).toEqual({ inFlight: false, isFailed: undefined, isOk: true })
    })
    it('reduces a failed `didPut(false)` action', () => {
      expect(
        reducer({ inFlight: true }, actions.didPut(false))
      ).toEqual({ inFlight: false, isFailed: true, isOk: undefined })
    })
  })
})
