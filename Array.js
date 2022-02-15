/* eslint-disable */

function checkType (name) {
  if (this === null || this === undefined) {
    throw new TypeError(`Cannot read properties of ${this} (reading '${name}')`)
  }
  if (typeof cb !== 'function') {
    throw new TypeError(cb + 'is not a function')
  }
}
Array.prototype.forEach = function (cb) {
  checkType('forEach')

  const arr = this
  const len = arr.length || 0

  for (let i = 0; i < len; i++) {
    cb.call(arguments[1], arr[i], i, arr)
  }
}


Array.prototype.map = function (cb) {
  checkType('map')

  const arr = this
  const len = arr.length || 0
  const res = []

  for (let i = 0; i < len; i++) {
    res.push(cb.call(arguments[1], arr[i], i, arr))
  }
  
  return res
}

Array.prototype.reduce = function (cb) {
  checkType('reduce')

  const arr = this
  const len = arr.length
  const initalVal = arguments[1]
  let res
  let i = 0
  if (initalVal === undefined) {
    if (!len) return new Error('arr.length === 0 need inital val')
    res = arr[0]
    i++
  } else {
    res = initalVal
  }

  for (; i < len; i++) {
    res += cb.call(initalVal, arr[i], i, arr)
  }
  return res
}

Array.prototype.filter = function (cb) {
  checkType('filter')

  const arr = this
  const len = arr.length || 0
  const res = []

  for (let i = 0; i < len; i++) {
    if (cb.call(arguments[1], arr[i], i, arr)) {
      res.push(arr[i])
    }
  }
  return res
}

Array.prototype.some = function (cb) {
  checkType('some')

  const arr = this
  const len = arr.length || 0
  let res = false

  for (let i = 0; i < len; i++) {
    if (cb.call(arguments[1], arr[i], i, arr)) {
      return true
    }
  }
  return res
}

Array.prototype.every = function (cb) {
  checkType('every')

  const arr = this
  const len = arr.length || 0
  let res = true

  for (let i = 0; i < len; i++) {
    if (!cb.call(arguments[1], arr[i], i, arr)){
      return false
    }
  }
  return res
}

Array.prototype.find = function (cb) {
  checkType('find')

  const arr = this
  const len = arr.length || 0

  for (let i = 0; i < len; i++) {
    if (cb.call(arguments[1], arr[i], i, arr)){
      return arr[i]
    }
  }
  return undefined
}

Array.prototype.findIndex = function (cb) {
  checkType('findIndex')

  const arr = this
  const len = arr.length || 0

  for (let i = 0; i < len; i++) {
    if (cb.call(arguments[1], arr[i], i, arr)){
      return i
    }
  }
  return -1
}

Array.prototype.indexOf = function (val) {
  const arr = this
  const len = arr.length || 0

  for (let i = 0; i < len; i++) {
    if (arr[i] === val) return i
  }
  return -1
}

const a = [1, 2, 3]
a.forEach((item, index, array) => {
  array[index] = item * 2
})
console.log('map', a.map(item => item * 2))
console.log('filter', a.filter(item => item > 1))
console.log('some', a.some(item => item > 4))
console.log('every', a.every(item => item > 4))
console.log('find', a.find(item => item > 10))
console.log('findIndex', a.findIndex(item => item > 10))

reduce = a.reduce((item, index, array) => {
  return item * array[index]
}, 100)
console.log(reduce)