class Set {
  constructor () {
    this.items = {}
    this.size = 0
    this.orderHash = {}
    this.order = 0
  }

  add (item) {
    if (!this.has(item)){
      this.items[item] = item
      this.size++
      this.orderHash[this.order++] = item
    }
  }

  has (item) {
    return item in this.items
  }

  clear () {
    this.items = {}
    this.size = 0
    this.orderHash = {}
    this.order = 0
  }

  delete (item) {
    if (!this.has(item)) return
    delete this.items[item]
    // 为了保证迭代的顺序 这里只能采用O(n)的方法
    for (let i = 1; i < this.order; i++) {
      if (this.orderHash[i] === item){
        delete this.orderHash[i]
      }
    }
    this.size--
  }

  entries () {
    let count = 0
    let entiesOrder = 0
    const { orderHash, order, size } = this
    // 闭包当前状态  执行clear再添加会根据新的数据生成迭代器
    function next () {
      while(!orderHash.hasOwnProperty(entiesOrder) && entiesOrder <= order) {
        entiesOrder++
      }
      if (++count < size + 1) {
        const item = orderHash[entiesOrder]
        entiesOrder++
        return {
          value: [item, item]
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

  values () {
    let count = 0
    let valuesOrder = 0
    const { orderHash, order, size } = this
    function next () {
      while(!orderHash.hasOwnProperty(valuesOrder) && valuesOrder <= order) {
        valuesOrder++
      }
      if (++count < size + 1) {
        const item = orderHash[valuesOrder]
        valuesOrder++
        return {
          value: item
        }
      }
    }
    return {
      next
    }
  }

}

const set = new Set()

set.add(8)
set.add(11)
set.add(3)
set.add('test')
set.delete(3)
set.add(2)
set.forEach((k, v) => {
  console.log(k, v)
})
set.add('test1')
set.delete(2)

const entries = set.entries()
console.log('entries', entries.next().value)
// console.log('entries', entries.next().value)
// console.log('entries', entries.next().value)
// console.log('entries', entries.next().value)

const values = set.values()
console.log('values', values.next().value)
// console.log('values', values.next().value)
// console.log('values', values.next().value)
// console.log('values', values.next().value)

set.clear()
set.add(1)
set.add(2)
set.add(3)

const values1 = set.values()

console.log('values1', values1.next().value)
console.log('values1', values1.next().value)
console.log('values1', values1.next().value)

console.log(set.size)

