import request from '@/utils/request'
/**
 * 获取角色列表
 * **/
export function getRolelist(params) {
  return request({
    url: '/sys/role',
    params
  })
}
export function addRole(data) {
  return request({
    url: '/sys/role',
    data,
    method: 'POST'
  }
  )
}

export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'PUT'
  }
  )
}

export function dellRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  }
  )
}
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`,
    method: 'GET'
  }
  )
}
