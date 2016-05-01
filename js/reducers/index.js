import { combineReducers } from 'redux'

import authorizations from './authorizations'
import todos from './todos'

const rootReducer = combineReducers({
  authorizations, todos
})

export default rootReducer
