/* eslint-disable */

function checkType (name, cb) {
  if (this === null || this === undefined) {
    throw new TypeError(`this is not an array`)
  }
  if (typeof cb !== 'function') {
    throw new TypeError(cb + 'is not a function')
  }
}
Array.prototype.forEach = function (cb) {
  checkType('forEach', cb)

  const arr = this
  const len = arr.length || 0

  for (let i = 0; i < len; i++) {
    cb.call(arguments[1], arr[i], i, arr)
  }
}


Array.prototype.map = function (cb) {
  checkType('map', cb)

  const arr = this
  const len = arr.length || 0
  const res = []

  for (let i = 0; i < len; i++) {
    res.push(cb.call(arguments[1], arr[i], i, arr))
  }
  
  return res
}

Array.prototype.reduce = function (cb) {
  checkType('reduce', cb)

  const arr = this
  const len = arr.length || 0
  const initalVal = arguments[1]
  let res
  let i = 0

  if (initalVal !== undefined) {
    res = initalVal
  } else {
    if (!len) return new Error('arr.length === 0 need inital val')
    res = arr[0]
    i++
  }

  for (; i < len; i++) {
    res = cb.call(null, res, arr[i], i, arr)
  }

  return res
}

Array.prototype.filter = function (cb) {
  checkType('filter', cb)

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
  checkType('some', cb)

  const arr = this
  const len = arr.length || 0

  for (let i = 0; i < len; i++) {
    if (cb.call(arguments[1], arr[i], i, arr)) return true
  }

  return false
}

Array.prototype.every = function (cb) {
  checkType('every', cb)

  const arr = this
  const len = arr.length || 0

  for (let i = 0; i < len; i++) {
    if (!cb.call(arguments[1], arr[i], i, arr)) return false
  }

  return true
}

Array.prototype.find = function (cb) {
  checkType('find', cb)

  const arr = this
  const len = arr.length || 0

  for (let i = 0; i < len; i++) {
    if (cb.call(null, arr[i], i, arr)) return arr[i]
  }

  return undefined
}

Array.prototype.findIndex = function (cb) {
  checkType('findIndex', cb)

  const arr = this
  const len = arr.length || 0

  for (let i = 0; i < len; i++) {
    if (cb.call(null, arr[i], i, arr)) return i
  }

  return  -1
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
  array[index] = item + 1
})
console.log(a)
console.log('map', a.map(item => item * 2))
console.log('filter', a.filter(item => item > 2))
console.log('some', a.some(item => item > 3))
console.log('every', a.every(item => item > 1))
console.log('find', a.find(item => item > 3))
console.log('findIndex', a.findIndex(item => item > 3))

reduce = a.reduce((acc, item, index, array) => {
  return acc + item
}, 100)
console.log(reduce)