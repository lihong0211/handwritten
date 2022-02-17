class Map {
  constructor () {
    this.items = {}
    this.size = 0
    this.orderHash = {}
    this.order = 0
  }

  set (key, val) {
    if (!this.has(key)){
      this.items[key] = val
      this.size++
      this.orderHash[this.order++] = key
    } else {
      this.items[key] = val
    }
  }

  get (key) {
    return this.items[key]
  }

  has (key) {
    return key in this.items
  }

  clear () {
    this.items = {}
    this.size = 0
    this.orderHash = {}
    this.order = 0
  }

  delete (key) {
    if (!this.has(key)) return
    delete this.items[key]
    // 为了保证迭代的顺序 这里只能采用O(n)的方法
    for (let i = 1; i < this.order; i++) {
      if (this.orderHash[i] === key){
        delete this.orderHash[i]
      }
    }
    this.size--
  }

  entries () {
    let count = 0
    let entiesOrder = 0
    const { orderHash, order, size, items } = this
    // 闭包当前状态  执行clear再添加会根据新的数据生成迭代器
    function next () {
      while(!orderHash.hasOwnProperty(entiesOrder) && entiesOrder <= order) {
        entiesOrder++
      }
      if (++count <= size + 1) {
        const key = orderHash[entiesOrder]
        const val = items[key]
        entiesOrder++
        return {
          value: [key, val]
        }
      }
    }
    return {
      next
    }
  }

  forEach (cb) {
    for (let i = 0; i < this.order; i++) {
      if (this.orderHash.hasOwnProperty(i)) {
        cb.call(arguments[1], this.orderHash[i], this.orderHash[i])
      }
    }
  }

  keys () {
    let count = 0
    let valuesOrder = 0
    const { orderHash, order, size } = this
    function next () {
      while(!orderHash.hasOwnProperty(valuesOrder) && valuesOrder <= order) {
        valuesOrder++
      }
      if (++count <= size + 1) {
        const key = orderHash[valuesOrder]
        valuesOrder++
        return {
          value: key
        }
      }
    }
    return {
      next
    }
  }

  values () {
    let count = 0
    let valuesOrder = 0
    const { orderHash, order, size, items } = this
    function next () {
      while(!orderHash.hasOwnProperty(valuesOrder) && valuesOrder <= order) {
        valuesOrder++
      }
      if (++count <= size + 1) {
        const val = items[orderHash[valuesOrder]]
        valuesOrder++
        return {
          value: val
        }
      }
    }
    return {
      next
    }
  }

}

const map = new Map()

map.set(8, '8')
map.set(11, '11')
map.set(3, '3')
map.set('test', 3)
map.delete(3)
map.set(2, '2')
map.forEach((k, v) => {
  console.log(k, v)
})
map.set('test1', 10)
map.delete(2)

const entries = map.entries()
console.log('entries', entries.next().value)
// console.log('entries', entries.next().value)
// console.log('entries', entries.next().value)
// console.log('entries', entries.next().value)

const values = map.values()
console.log('values', values.next().value)
// console.log('values', values.next().value)
// console.log('values', values.next().value)
// console.log('values', values.next().value)

map.clear()
map.set(1, '1')
map.set(2, '2')
map.set(3, '3')

const values1 = map.values()

console.log('values1', values1.next().value)
console.log('values1', values1.next().value)
console.log('values1', values1.next().value)

console.log(map.size)

const keys = map.keys()
console.log('keys', keys.next().value)

