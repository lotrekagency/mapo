import request from '~bossamodule/utils/request'

export function login(data) {
  return request({
    url: process.env.AUTH_API || '/api/camomilla/token-auth/',
    method: 'post',
    data
  })
}

export function logout() {
  console.log('Logout call need to be implemented')
  return Promise.resolve()
}

export function getInfo() {
  return request({
    url: process.env.USER_INFO_API || '/api/camomilla/users/current/',
    method: 'get',
  })
}
