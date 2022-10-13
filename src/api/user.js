import request from '@/utils/request'

export function login(data) {

}

export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'POST'
  })
}
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'PUT',
    data
  })
}
export function logout() {
}
