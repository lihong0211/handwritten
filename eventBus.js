class EventBus {
  constructor () {
    this.pool = {}
  }

  $on () {
    const [name, cb] = [...arguments]
    if (this.pool[name]) {
      this.pool[name].push(cb)
    } else {
      this.pool[name] = [cb]
    }
  }

  $emit () {
    const [name, once, ...args] = [...arguments]
    if (!this.pool[name]) return
    this.pool[name].slice().forEach(cb => {
      cb(...args)
    })
    if (once) delete this.pool[name]
  }

  $destroy () {
    const [name, fn] = [...arguments]
    if (!this.pool[name]) return
    if (fn) {
      this.pool[name] = this.pool[name].filter(cb => cb !== fn)
    } else {
      delete this.pool[name]
    }
  }
}

const bus = new EventBus()
const fn1 = function (name, age) {
  console.log(`fn1  ${name} ${age}`)
}
const fn2 = function (name, age) {
  console.log(`fn2  hello, ${name} ${age}`)
}
bus.$on('aaa', fn1)
bus.$on('aaa', fn2)
bus.$emit('aaa', false, '布兰', 12)
bus.$emit('bbb')
bus.$destroy('aaa', fn1)
bus.$emit('aaa', true, '布兰', 12)