
function canTraverse (type) {
  return ['Array', 'Object', 'Map', 'Set'].includes(type)
}

function getType (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

function isObject(obj) {
  return obj && typeof obj === 'object' || typeof obj === 'function'
}

function handleCantTraverse (obj, type) {
  const Ctor = obj.constructor
  switch (type) {
    case 'Boolean':
      return new Object(Boolean.prototype.valueOf.call(obj))
    case 'String':
      return new Object(String.prototype.valueOf.call(obj))
    case 'Number':
      return new Object(Number.prototype.valueOf.call(obj))
    case 'Symbol':
      return new Object(Symbol.prototype.valueOf.call(this))
    case 'Function':
      return handleFn(obj)
    default: 
      return new Ctor(obj)
  }
}

function handleFn (fn) {
  if (!fn.prototype) return fn
  // 非获取匹配，反向肯定预查，与正向肯定预查类似，只是方向相反。（向前）
  // 例如，“(?<=95|98|NT|2000)Windows”能匹配“2000Windows”中的“Windows”，
  // 但不能匹配“3.1Windows”中的“Windows”。

  // 非获取匹配，正向肯定预查，（向后）在任何匹配pattern的字符串开始处匹配查找字符串，
  // 该匹配不需要获取供以后使用。例如，“Windows(?=95|98|NT|2000)
  // ”能匹配“Windows2000”中的“Windows”，但不能匹配“Windows3.1”中的“Windows”。
  // 预查不消耗字符，也就是说，在一个匹配发生后，在最后一次匹配之后立即开始下一次匹配的搜索，
  // 而不是从包含预查的字符之后开始。
  const paramReg = /(?<=\().+(?=\)\s+{)/
  const bodyReg = /(?<={)(.+|\n)+(?=})/m
  const str = fn.toString()
  const params = paramReg.exec(str)
  const body = bodyReg.exec(str)
  if (params) {
    return new Function(...params[0].split(','), body[0])
  } else {
    return new Function(body[0])
  }
}

function deepClone (obj, map = new WeakMap()) {
  if (!isObject(obj)) return obj

  const Ctor = obj.constructor
  const type = getType(obj)

  if (!(canTraverse(type))) {
    return handleCantTraverse(obj, type)
  }

  const clone = new Ctor()
  if (map.get(obj)) return obj
  map.set(obj, true)

  if (type === 'Set') {
    obj.forEach(item => {
      clone.add(deepClone(item))
    })
  } else if (type === 'Map') {
    obj.forEach((k, v) => {
      clone.set(deepClone(k, map), deepClone(v, map))
    })
  } else {
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
        console.log(k, deepClone(obj[k]))
        clone[k] = deepClone(obj[k], map)
      }
    }
  }
  return clone
}

const a = {
  a: 1,
  b: 'test',
  c: undefined,
  d: null,
  e: function test(age) {
    console.log(age)
  },
  f: new Date(),
  g: /^test$/,
  h: new Error('test'),
  i: new Set([1,2,3,4,5]),
  j: new Map([['aaa', '123'], ['bbb', '456']]),
  k: {
    a: [1],
    b: 2
  },
  l: [1,2,3],
  m: Symbol('test'),
  n: new Number(1),
  o: new Boolean(false)
}

const b = deepClone(a)
console.log(b)
