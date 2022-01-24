class EventBus {
  constructor () {
    this.cache = {}
  }

  on (name, fn) {
    if (this.cache[name]) {
      this.cache[name].push(fn)
    } else {
      this.cache[name] = [fn]
    }
  }

  off (name, fn) {
    if (!this.cache[name]) return
    this.cache[name] = this.cache[name].filter(f => f !== fn)
  }

  emit (name, once = false, ...args) {
    if (!this.cache[name]) return
    this.cache[name].forEach(f => {
      f(...args)
    })
    if (once) {
      delete this.cache[name]
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
eventBus.on('aaa', fn1)
eventBus.on('aaa', fn2)
eventBus.emit('aaa', false, '布兰', 12)
