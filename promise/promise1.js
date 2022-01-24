const PENDING_STATE = 'pending'
const FULFILLED_STATE = 'fulfilled'
const REJECTED_STATE = 'rejected'

const isFunction = fn => typeof fn === 'function'
const isObject = obj => obj && Object.prototype.toString.call(obj).slice(8, -1) === 'Object'

class Promise {
  constructor (executor) {
    this.initValue()
    this.initBind()
    try {
      executor(this.resolve, this.reject)
    } catch (err) {
      this.reject(err)
    }
  }
  
  initValue () {
    this.state = PENDING_STATE
    this.value = null
    this.reason = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }

  initBind () {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  resolve (value) {
    if (this.state = PENDING_STATE) {
      this.state = FULFILLED_STATE
      this.value = value
      this.onFulfilledCallbacks.forEach(cb => cb())
    }
  }

  reject (reason) {
    if (this.state = PENDING_STATE) {
      this.state = REJECTED_STATE
      this.reason = reason
      this.onRejectedCallbacks.forEach(cb => cb())
    }
  }

  resolutionProcedure (promise, x, resolve, reject) {
    if (promise === x) {
      reject(new TypeError('123'))
    }

    if (x instanceof Promise) {
      if (x === promise) reject(new TypeError('123'))
      
      x.then(
        value => {
          this.resolutionProcedure(promise, value, resolve, reject)
        },
        reason => {
          reject(reason)
        }
      )
    }

    if (isObject(x) || isFunction(x)) {
      let called = false

      try {
        let then = x.then
        if (isFunction(then)) {
          then.call(
            x,
            y => {
              if (called) return
              called = true
              this.resolutionProcedure(promise, y, resolve, reject)
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
      } catch (err) {
        if (called) return
        called = true
        reject(err)
      }
    } else {
      resolve(x)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value
    onRejected = isFunction(onRejected) ? onRejected : err => { throw err }

    return new Promise((resolve, reject) => {
      const wrapOnFulfilled = () => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            this.resolutionProcedure(this, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
      const wrapOnRejected = () => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            this.resolutionProcedure(this, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
      if (this.state = FULFILLED_STATE) {
        wrapOnFulfilled()
      } else if (this.state = REJECTED_STATE) {
        wrapOnRejected()
      } else {
        this.onFulfilledCallbacks.push(wrapOnFulfilled)
        this.onRejectedCallbacks.push(wrapOnRejected)
      }
    })
  }

  catch (callback) {
    return this.then(null, callback)
  }

  finally () {
    return this.then(
      value => {
        callback()
        return value
      },
      err => {
        callback()
        throw err
      }
    )
  }

  static resolve(value) {
    return value instanceof Promise
    ? value
    : new Promise(resolve => resolve(value))
  }

  static reject(reason) {
    return new Promise(reject => reject(reason))
  }

  static all (promises) {

  }

  static race (promises) {

  }

  static allSettled (promises) {

  }

  static any (promises) {

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