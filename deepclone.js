function isObject (obj) {
  return obj && typeof obj === 'object' || typeof obj === 'function'
}

function cantTraverse (type) {
  return !['Map', 'Set', 'Array', 'Object'].includes(type)
}

function handleFn (fn) {
  if (!fn.prototype) return fn

  const paramsReg = /(?<=\().+(?=\)\s+{)/ // (...) {
  const bodyReg = /(?<={)(.+|\n)+(?=})/m // { ... }
  const str = fn.toString()
  const params = paramsReg.exec(str)
  const body = bodyReg.exec(str)

  if (params) {
    return new Function(...params[0].split(','), body[0])
  } else {
    return new Function(body[0])
  }
}

function deepClone (obj, map = new WeakMap) {
  if (!isObject(obj)) return obj

  const type = Object.prototype.toString.call(obj).slice(8, -1)
  const Ctor = obj.constructor

  if (cantTraverse(type)) {
    switch (type) {
      case 'Boolean': return new Object(Boolean.prototype.valueOf.call(obj))
      case 'String': return new Object(String.prototype.valueOf.call(obj))
      case 'Number': return new Object(Number.prototype.valueOf.call(obj))
      case 'Symbol': return new Object(Symbol.prototype.valueOf.call(obj))
      case 'Function': return handleFn(obj)
      default: return new Ctor(obj)
    }
  }

  if (map.get(obj)) return obj
  map.set(obj, true)

  const clone = new Ctor()

  if (type === 'Set') {
    obj.forEach(item => {
      clone.add(deepClone(item, map))
    })
  } else if (type === 'Map') {
    obj.forEach((k, v) => {
      clone.set(deepClone(k, map), deepClone(v, map))
    })
  } else {
    for (let k in obj) {
      if (obj.hasOwnProperty(k)) {
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