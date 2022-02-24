function isObject(obj) {
  return obj && typeof obj === 'object' || typeof obj === 'function'
}

function canTraverse(type) {
  return ['Array', 'Object', 'Map', 'Set'].includes(type)
}

function handleFn (fn) {
  return fn
  if (!fn.prototype) return fn
  const str = fn.toString()
  const bodyReg = /(?<={)(.+|\n)(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/

  const body = bodyReg.exec(str)
  const param = paramReg.exec(str)

  if (param) {
    return new Function(...param[0].split(','), body[0])
  } else {
    return new Function(body[0])
  }
}

function handleCantTraverse (obj, type) {
  const Ctor = obj.constructor
  switch (type) {
    case 'Number': return new Object(Number.prototype.valueOf.call(obj))
    case 'Boolean': return new Object(Boolean.prototype.valueOf.call(obj))
    case 'String': return new Object(String.prototype.valueOf.call(obj))
    case 'Symbol': return new Object(Symbol.prototype.valueOf.call(obj))
    case 'Function': handleFn(obj)
    default: return new Ctor(Object.prototype.valueOf.call(obj))
  }
}

function deepClone (obj, map = new WeakMap()) {
  if (!isObject(obj)) return obj
  const Ctor = obj.constructor
  const type = Object.prototype.toString.call(obj).slice(8, -1)
  if (!(canTraverse(type))) {
    handleCantTraverse(obj, type)
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
  j: new Map([[[1,2,3], '123'], [{1: 4, 2: 5, 3: 6}, '456']]),
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
