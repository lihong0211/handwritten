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

/**
 * new 实现原理
 */
function myNew () {
  const obj = {}
  const args = [...arguments]
  const Ctor = args.shift()
  obj.__proto__ = Ctor.prototype
  const result = Ctor.apply(obj, args)
  return typeof result === 'object' && result !== null ? result : obj
}

  /**
   * create 实现原理
   * @param {*} obj 
   */
 Object.myCreate = function (obj) {
  function Ctor () {}
  Ctor.prototype = obj
  return new Ctor()
 }

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

