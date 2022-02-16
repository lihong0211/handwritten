/**
 * 原型链继承
 * 
 */
function People() {
    this.organs = ['head', 'body', 'hand', 'foot']
}
People.prototype.write = function() {
    console.log(this.organs)
}
function Person() {}
// 将父类的实例赋值给子类的原型
Person.prototype =  new People()


/**
 * 借用构造函数继承
 * 
 */
function People() {
    this.organs = ['head', 'body', 'hand', 'foot']
}
function Person(age) {
    People.call(this)
    this.age = age
}


/**
 * 组合继承
 * 
 */
function People() {
    this.organs = ['head', 'body', 'hand', 'foot']
}
People.prototype.write = function() {
    console.log(this.organs)
}
// 继承属性
function Person(age) {
    People.call(this)
    this.age = age
}
// 继承方法
Person.prototype = new People()


/**
 * 原型式继承
 * 
 */

function create (obj) {
    function F () {}
    F.prototype = obj
    return new F()
}


/**
 * 寄生式继承
 */

function create (obj) {
    function F() {}
    F.prototype = obj
    return new F()
}
function createAnother (obj) {
    const clone = create(obj) // 通过调用构造函数创建一个新对象
    clone.write = function () { // 以某种方式增强这个对象
        console.log(1)
    }
    return clone // 返回这个对象
}
const person = {
    name: 'lihong',
    age: 33
}
const anotherPerson = createAnother(person)


/**
 * 寄生式组合继承
 */
 function create (obj) {
    function F() {}
    F.prototype = obj
    return new F()
 }

 function inherit (son, father) {
    const prototype = create(father.prototype)
    son.prototype = prototype
    prototype.constructor = son
 }

 function People() {
    this.organ = ['head', 'body', 'hand', 'leg']
 }

 People.prototype.write = function () {
    console.log(this.organ)
 }

 function Person (age) {
    People.call(this)
    this.age = age
 }
 
 inherit (Person, People)

 Person.prototype.sayAge = function () {
    console.log(this.age)
 }

 const person = new Person(18)
