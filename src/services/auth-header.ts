export default function authHeader(): {} {
  const userToken = localStorage.getItem('soarline-token')

  if (userToken) {
    return { Authorization: 'Bearer ' + userToken }
  }
  return {}
}
