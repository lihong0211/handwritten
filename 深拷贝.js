
/**
 * 浅拷贝
 * @param {*} obj 
 */
function shallowClone (obj) {
  if (typeof obj !== 'object') return
  const clone = obj instanceof Array ? [] : {}
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      clone[k] = obj[k]
    }
  }
  return clone
}

function deepClone (obj) {
  if (typeof obj !== 'object') return
  const clone = obj instanceof Array ? [] : {}
  for (const k in obj) {
    if (obj.hasOwnProperty(k)) {
      clone[k] = typeof obj[k] === 'object' ? deepClone(obj[k]) : obj[k]
    }
  }
  return clone
}

// 完整版深拷贝
function deepClone (obj, map = new WeakMap()) {
  if (map.get(obj)) {
    return obj
  }
  if (!obj) return obj
  switch (obj && obj.constructor.name) {
    case 'Array':
    case 'Object':
      var clone =  obj instanceof Array ? [] : {} 
      for (const k in obj) {
        if(obj.hasOwnProperty(k)) {
          clone[k] = deepClone(obj[k], map)
        }
      }
      return clone
    case 'Date':
      return new Date(obj.valueOf())
    case 'RegExp':
      return new RegExp(obj)
    case 'Set':
      var clone = new Set()
      for(const v of obj.values()) {
        clone.add(v)
      }
      return clone
    case 'Map':
      var clone = new Map()
      obj.forEach((v, k) => {
        clone.set(k, deepClone(v, map))
      })
      return clone
    case 'Function': 
      return new Function('return '+obj.toString()).call(this) // 只能在localhost 执行 否则会报错
    default:
      return obj
  }
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
  j: new Map([['aaa', '123']]),
  k: {
    a: [1],
    b: 2
  },
  l: [1,2,3]
}

console.log(deepClone(a))