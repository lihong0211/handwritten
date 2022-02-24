const FULFILLED_STATE = 'fulfilled'
const REJECTED_STATE = 'rejected'
const PENDING_STATE = 'pending'

const isObject = obj => Object.prototype.toString.call(obj).slice(8, -1) === 'Object'
const isFunction = fn => typeof fn === 'function'

class Promise {
  constructor(executor) {
    this.init()
    this.bind()
    try {
      executor(this.resolve, this.reject)
    } catch (e) {
      this.reject(e)
    }
  }
  
  resolve (value) {
    if (this.state === PENDING_STATE) {
      this.value = value
      this.state = FULFILLED_STATE
      this.onFulfilledCallbacks.forEach(cb => cb())
    }
  }

  reject (reason) {
    if (this.state === PENDING_STATE) {
      this.reason = reason
      this.state = REJECTED_STATE
      this.onRejectedCallbacks.forEach(cb => cb())
    }
  }

  init () {
    this.state = PENDING_STATE
    this.value = null
    this.reason = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }

  bind () {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  processor (promise, x, resolve, reject) {
    if (promise === x) {
      reject(new TypeError('equal'))
    }
    if (isObject(x) || isFunction(x)) {
      let called = false
      try {
        const then = x.then
        if (isFunction(then)) {
          then.call(
            x,
            v => {
              if (called) return
              called = true
              this.processor(promise, v, resolve, reject)
            },
            r => {
              if (called) return
              called = true
              reject(r)
            }
          )
        } else {
          if (called) return
          called = true
          resolve(x)
        }
      } catch(e) {
        if (called) return
        called = true
        reject(e)
      }
    } else {
      resolve(x)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : val => val
    onRejected = isFunction(onRejected) ? onRejected : reason => { throw reason }
    const promise = new Promise((resolve, reject) => {
      const wrapOnFulfilled = () => {
        setTimeout(() => {
          try {
            const value = onFulfilled(this.value)
            this.processor(promise, value, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      const wrapOnRejected = () => {
        setTimeout(() => {
          try {
            const reason = onRejected(this.reason)
            this.processor(promise, reason, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.state === FULFILLED_STATE) {
        wrapOnFulfilled()
      } else if (this.state === REJECTED_STATE) {
        wrapOnRejected()
      } else {
        this.onFulfilledCallbacks.push(wrapOnFulfilled)
        this.onRejectedCallbacks.push(wrapOnRejected)
      }
    })
    return promise
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise