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
  return arr.reduce((res, cur) => {
    return res.concat(Array.isArray(cur) ? flat(cur) : cur)
  },[])
}

function flat (arr) {
  return arr.flat(Infinity)
}

arr = [1, 2, [3, 4, [5, 6, 7, [90,100]]]]
console.log(flat(arr))
