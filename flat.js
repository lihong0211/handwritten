// 迭代
function flat(arr) {
  while(item = arr.find(item => Array.isArray(item))) {
    const idx = arr.indexOf(item)
    arr.splice(idx, 1, ...item)
  }
  return arr
}
// 迭代
function flat (arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
// 递归
function flat (arr) {
  return arr.reduce((res, cur) => res.concat(Array.isArray(cur) ? flat(cur) : cur), [])
}

a = [1, 2, [3, [4, 5]]]
b = [].concat(...a) // [1, 2, 3, [4, 5]] 展开符会把里面的元素也展开一层
