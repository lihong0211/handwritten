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
  const args = [...arguments]
  const Ctor = args.shift()
  // 两种方式继承原型
  // const obj = {}
  // Object.setPrototypeOf(obj, Ctor.prototype)
   const obj = Object.create(Ctor.prototype)

   const res = Ctor.apply(obj, args)
  return res && typeof res === 'object' ? res : obj
}

function People () {
  this.organ = [1, 2, 3]
}
const people = _new(People)

Object._create = function () {
  const obj = [...arguments][0]
  const Ctor = function() {}
  Ctor.prototype = obj
  return new Ctor()
}

Object._create = function () {
  const obj = [...arguments][0]
  const res = {}
  Object.setPrototypeOf(res, obj)
  return res
}

const test = Object._create({name: 1})
console.log(test.__proto__)


function _instanceof () {
  let [obj, Ctor] = [...arguments]
  if (!Ctor) return false
  while (obj) {
    if (obj.__proto__ === Ctor.prototype) return true
    obj = obj.__proto__
  }
  return false
}

function Animal (name) {
  this.name = name
}

const dog = new Animal("dog");
console.log(_instanceof(dog, Array));
console.log(_instanceof(dog, Animal));
console.log(_instanceof(dog, Object));