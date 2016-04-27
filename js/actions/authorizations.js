export function willAuthorize() {
  return { type: 'authorizing' }
}

export function didAuthorized(isAuthorized=true) {
  return { type: 'authorized', isAuthorized: isAuthorized }
}


export function authorizeApp() {
  return function(dispatch) {
    dispatch(willAuthorize())
  }
}
