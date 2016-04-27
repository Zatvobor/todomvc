export function willAuthorize() {
  return { type: 'authorizing' }
}

export function didAuthorized() {
  return { type: 'authorized', isAuthorized: false }
}
