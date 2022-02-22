// 原型链继承
function SuperType () {
  this.name = 'test'
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType () {}

SubType.prototype = new SuperType()

// 借用构造函数继承
function SuperType () {
  this.name = 'test'
}

function SubType (age) {
  SuperType.call(this)
  this.age = age
}

// 组合式继承
function SuperType () {
  this.name = 'test'
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType (age) {
  SuperType.call(this)
  this.age = age
}

SuperType.prototype = new SuperType()

// 原型式继承
function create (obj) {
  function Ctor () {}
  Ctor.prototype = obj
  return new Ctor()
}


// 寄生式继承
function create (obj) {
  function Ctor () {}
  Ctor.prototype = obj
  return new Ctor()
}

function createAnother (obj) {
  const clone = create(obj)
  obj.say = function () {
    console.log(1)
  }
  return clone
}

// 寄生式组合继承
function create (obj) {
  function Ctor () {}
  Ctor.prototype = obj
  return new Ctor()
}

function inherit (son, father) {
  const prototype = create(father.prototype)
  son.prototype = prototype
  prototype.constructor = son
}

function SuperType () {
  this.name = 'test'
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType (age) {
  SuperType.call(this)
  this.age = age
}

inherit(SubType, SuperType)
// 这里必须要在inherit之后
SubType.prototype.sayAge = function () {
  console.log(this.age)
}

const sub = new SubType(34)