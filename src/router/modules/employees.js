import Layout from '@/layout'
export default {
  path: '/employees',
  meta: { title: '员工管理', icon: 'people' },
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees/index.vue'),
      meta: { title: '员工管理', icon: 'people' }
    },
    {
      path: '/employees/detail/:id',
      component: () => import('@/views/employees/detail.vue'),
      hidden: true
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/components/print.vue'),
      hidden: true
    }
  ]
}
