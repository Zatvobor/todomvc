import * as authorizations from '../actions/authorizations'
import * as http from './http'


export function authorizeApplicationOrConfirmObtainedToken(store) {
  const token = window.localStorage.token
  store.dispatch(authorizations.willAuthorize())

  function get_auth() {
    http.get_auth(token)
      .then((response) => {
          if(response.status == 200) {
            store.dispatch(authorizations.didAuthorized(token))
          }
          if(response.status == 401) {
            post_auth()
          }
      })
      .catch(() => {
        store.dispatch(authorizations.didAuthorized(undefined))
      })
  }
  function post_auth() {
    http.post_auth()
      .then((response) => {
        if(response.status == 200) {
          const token = response.__parsedResponseBody__.token
          window.localStorage.token = token
          store.dispatch(authorizations.didAuthorized(token))
        }
        if(response.status == 401) {
          store.dispatch(authorizations.didAuthorized(false))
        }
      })
      .catch(() => {
        store.dispatch(authorizations.didAuthorized(undefined))
      })
  }

  token ? get_auth() : post_auth()
}
