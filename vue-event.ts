class ComponentA {
    constructor () {
        this.$mount()
    }
    a = 0
    b = 1
    $mount = function () {
        const props = {
            events: [
                { name: 'eventA', func: this.eventA.bind(this) },
                { name: 'eventB', func: this.eventB.bind(this) }
            ]
        }
        new ComponentB(props)
    }
    eventA () {
        console.log(this.a)
    }
    eventB () {
        console.log(++this.b)
    }
}

class ComponentB {
    constructor (props) {
        this.initEvent(props)
        setTimeout(() => {
            this.$emit('eventB')
        }, 2000)
    }
    _events = []
    initEvent = function (props) {
        this._events = props.events
    }
    $emit = function (eventName) {
        this._events.find(item => item.name === eventName).func()
    }
}

new ComponentA()