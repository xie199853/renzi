const fn = require.context('./', true, /\.vue$/)
const res = fn.keys().map(fn)
export default (Vue) => {
  res.forEach(ele => {
    console.log(ele)
    Vue.component(ele.default.name, ele.default)
  })
}

