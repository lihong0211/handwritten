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
    if (promise == x) {
      reject(new TypeError('Chaining cycle detected for promise'));
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
      } catch (e) {
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

  catch (cb) {
    return this.then(null, cb)
  }

  finally (cb) {
    return this.then(
      res => {
        cb()
        return res
      },
      reason => {
        cb()
        throw reason
      }
    )
  }

  static resolve (val) {
    return val instanceof Promise
      ? val
      : new Promise(resolve => {
        resolve(val)
      })
  }

  static reject (reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }
  
  static all (promises) {
    return new Promise((resolve, reject) => {
      const res = []
      const len = promises.length
      let resolved = 0

      for (let i = 0; i < len; i++) {
        promises[i].then(
          val => {
            res.push(val)
            if (++resolved === len) {
              resolve(res)
            }
          },
          reason => {
            reject(reason)
          }
        )
      }
    })
  }

  // 当任何一个被传入的 promise 成功的时候, 
  // 无论其他的 promises 成功还是失败，此函数会将那个成功的 promise 作为返回值 
  // 如果所有传入的 promises 都失败, Promise.any 将返回异步失败，和一个 AggregateError 对象，
  // 它继承自 Error，有一个 error 属性，属性值是由所有失败值填充的数组。

  static any (promises) {
    return new Promise((resolve, reject) => {
      const len = promises.length
      let rejected = 0
      let res = []
      for (let i = 0; i < len; i++) {
        promises[i].then(
          val => {
            resolve(val)
          },
          reason => {
            res.push(reason)
            if (++rejected === len) {
              // ...
              reject(new Error(res))
            }
          }
        )
      }
    })
  }

  // 一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
  static race (promises) {
    return new Promise((resolve, reject) => {
      const len = promises.length
      for (let i = 0; i < len; i++) {
        promises[i].then(
          val => {
            resolve(val)
          },
          reason => {
            reject(reason)
          }
        )
      }
    })
  }

  // 方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，
  // 并带有一个对象数组，每个对象表示对应的promise结果。status--value--reason
  static allSettled (promises) {
    return new Promise((resolve, reject) => {
      const len = promises.length
      let resolved = 0
      const res = []
      for (let i = 0; i < len; i++) {
        promises[i].then(
          value => {
            res[i] = {
              status: FULFILLED_STATE,
              value
            }
            if (++resolved === len) {
              resolve(res)
            }
          },
          reason => {
            res[i] = {
              status: REJECTED_STATE,
              reason
            }
            if (++resolved === len) {
              resolve(res)
            }
          }
        )
      }
    })
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