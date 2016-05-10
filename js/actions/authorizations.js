export function willAuthorize() {
  return { type: 'authorizing' }
}

export function didAuthorized(isAuthorized) {
  return { type: 'authorized', isAuthorized: isAuthorized }
}


import * as http from '../gateway/http'

export function authorizeApp() {
  return function(dispatch) {
    dispatch(willAuthorize())

    return http.post_auth()
      .then((response) => {
        if(response.status == 200) {
          dispatch(didAuthorized(response.__parsedResponseBody__.token))
        }
        if(response.status == 401) {
          dispatch(didAuthorized(false))
        }
      })
      .catch(() => {
        dispatch(didAuthorized(undefined))
      })
  }
}
