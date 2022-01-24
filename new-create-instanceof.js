/**
 * 转换参数
 */
 function args2Array () {
  const args0 = []
  for (let i = 0; i < arguments.length; i++) {
    args0.push(arguments[i])
  }
  const args1 = [].slice.call(arguments)
  const args2 = Array.prototype.slice.call(arguments)
  const args3 = Array.from(arguments)
  const args4 = [...arguments]
  return [args0, args1, args2, args3, args4]
}


function _new () {
  const obj = {}
  const args = [...arguments]
  const Ctor = args.shift()
  obj.__proto__ = Ctor.prototype // 保证Ctor原型上的方法可用

  const result = Ctor.apply(obj, args)
  return result &&  typeof result === 'object' ? result : obj
}

function _new () {
  const args = [...arguments]
  const Ctor = args.shift()
  const obj = Object.create(Ctor.prototype)

  const result = Ctor.apply(obj, args)
  return result && typeof result === 'object' ? result : obj
}

function People () {
  this.organ = [1, 2, 3]
}
const people = _new(People)

Object._create = function () {
  const obj = [...arguments].shift()
  const Ctor = function() {}
  Ctor.prototype = obj
  return new Ctor()
}

const test = Object._create({name: 1})
console.log(test.__proto__)


/**
* instanceof  实现原理
* @param {*} left 
* @param {*} right 
*/
function _instanceof (left, right) {
  if (!right) return false
  while(left) {
    if (left.__proto__ === right.prototype) {
      return true
    }
    left = left.__proto__
  }
  return false
  }