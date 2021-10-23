const Cookies = require('js-cookie')

const TokenKey = '__mapo_session'

function getToken() {
  return Cookies.get(TokenKey)
}

function setToken(token) {
  return Cookies.set(TokenKey, token)
}

function removeToken() {
  return Cookies.remove(TokenKey)
}

module.exports = {
  getToken,
  setToken,
  removeToken
}