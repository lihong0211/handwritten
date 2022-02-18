class EventBus {
  constructor () {
    this.pool = {}
  }

  $on () {
    const [name, cb] = [...arguments]
    if (name in this.pool) {
      this.pool[name].push(cb)
    } else {
      this.pool[name] = [cb]
    }
  }

  $emit () {
    const [name, once, ...args] = [...arguments]
    if (name in this.pool) {
      this.pool[name].slice().forEach(cb => {
        cb(...args)
      })
    }
    if (once) {
      delete this.pool[name]
    }
  }

  $destroy () {
    const [name, fn] = [...arguments]
    if (fn) {
      this.pool[name] = this.pool[name].filter(cb => cb !== fn)
    } else {
      delete this.pool[name]
    }
  }
}

const eventBus = new EventBus()
const fn1 = function (name, age) {
  console.log(`${name} ${age}`)
}
const fn2 = function (name, age) {
  console.log(`hello, ${name} ${age}`)
}
eventBus.$on('aaa', fn1)
eventBus.$on('aaa', fn2)
eventBus.$emit('aaa', false, '布兰', 12)
eventBus.$destroy('aaa', fn1)
// eventBus.$emit('aaa', true, '布兰', 12)