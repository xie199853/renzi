import * as filters from '@/filters'

const fn = require.context('./', true, /\.vue$/)
const res = fn.keys().map(fn)
export default (Vue) => {
  res.forEach(ele => {
    console.log(ele)
    Vue.component(ele.default.name, ele.default)
  })
  // 全局过滤器filter(), filters()是局部过滤器
  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })
}
