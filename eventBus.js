class EventBus {
    constructor () {
        this.events = this.events || new Map()
    }
    // 监听事件
    $on (name, fn) {
        if (!this.events.get(name)) {
            this.events.set(name, fn)
        }
    }
    // 触发事件
    $emit (name) {
        const fn = this.events.get(name)
        const args = [...arguments].slice(1)
        // 这里为什么要用apply
        fn.apply(this, args)
    }
}

const bus = new EventBus()

bus.$on('age', (age) => {
    console.log(age)
})

bus.$emit('age')