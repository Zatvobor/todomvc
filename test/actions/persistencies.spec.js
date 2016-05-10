import expect from 'expect'

import * as actions from '../../js/actions/persistencies'

describe('persistencies actions', () => {

  describe('in loading context', () => {
    it('creates `willGet()` action', () => {
      expect(actions.willGet()).toEqual({ type: 'getting' })
    })
    it('creates `didGet([<<objects>>])` action', () => {
      expect(actions.didGet([1,2])).toEqual({ type: 'got', todos: [1,2], isOk: true })
    })
    it('creates `didGet(false)` action', () => {
      expect(actions.didGet(false)).toEqual({ type: 'got', isFailed: true })
    })
  })

  describe('in storing context', () => {
    it('creates `willPut()` action', () => {
      expect(actions.willPut()).toEqual({ type: 'putting' })
    })
    it('creates `didPut(true)` action', () => {
      expect(actions.didPut(true)).toEqual({ type: 'put', isOk: true })
    })
    it('creates `didPut(false)` action', () => {
      expect(actions.didPut(false)).toEqual({ type: 'put', isFailed: true })
    })
  })
})
