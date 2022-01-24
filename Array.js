/* eslint-disable */
Array.prototype.forEach = function (cb, arg) {
  if (this == null) {
    throw new TypeError('this is null or undefined')
  }
  if (typeof cb !== 'function') {
    throw new TypeError(cb + 'is not a function')
  }

  const obj = Object(this)
  const len = obj.length >>> 0

  let k = 0
  while (k < len) {
    cb.call(arg, obj[k], k, obj)
    k++
  }
}

const a = [1, 2, 3]
a.forEach((item, index, array) => {
  array[index] === item * index
})
console.log(a)

Array.prototype.map = function (cb, arg) {
  if (this == null) {
    throw new TypeError('this is null or undefined')
  }
  if (typeof cb !== 'function') {
    throw new TypeError(cb + 'is not a function')
  }

  const obj = Object(this)
  const len = obj.length >>> 0

  let k = 0, res = []
  while (k < len) {
    res[k] = cb.call(arg, obj[k], k, obj)
    k++
  }
  return res
}

const a = [1, 2, 3]
a.map(item => item * 2)
console.log(a)

Array.prototype.filter = function (cb, arg) {
  if (this == null) {
    throw new TypeError('this is null or undefined')
  }
  if (typeof cb !== 'function') {
    throw new TypeError(cb + 'is not a function')
  }

  const obj = Object(this)
  const len = obj.length >>> 0

  let k = 0, res = []
  while (k < len) {
    if (cb.call(arg, obj[k], k, obj)) {
      res.push(obj[k])
    } 
    k++
  }
  return res
}

let a = [1, 2, 3]
a = a.filter(item => item > 1)
console.log(a)


Array.prototype.some = function (cb, arg) {
  if (this == null) {
    throw new TypeError('this is null or undefined')
  }
  if (typeof cb !== 'function') {
    throw new TypeError(cb + 'is not a function')
  }

  const obj = Object(this)
  const len = obj.length >>> 0

  let k = 0
  let has = false
  while (k < len) {
    if (cb.call(arg, obj[k], k, obj)) {
      return true
    } 
    k++
  }
  return has
}

let a = [1, 2, 3]
some = a.some(item => item > 4)
console.log(some)

Array.prototype.reduce = function (cb, initalVal) {
  if (this == null) {
    throw new TypeError('this is null or undefined')
  }
  if (typeof cb !== 'function') {
    throw new TypeError(cb + 'is not a function')
  }

  const obj = Object(this)
  const len = obj.length >>> 0

  let k = 0
  let res = initalVal
  while (k < len) {
    res += cb.call(null, obj[k], k, obj)
    k++
  }
  return res
}

let a = [1, 2, 3]
reduce = a.reduce((item, index, array) => {
  return item * array[index]
}, 100)
console.log(reduce)