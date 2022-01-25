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

  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  resolve(value) {
    if (this.state === PENDING_STATE) {
      this.state = FULFILLED_STATE
      this.value = value
      this.onFulfilledCallbacks.forEach(cb => cb())
    }
  }

  reject(reason) {
    if (this.state === PENDING_STATE) {
      this.state = REJECTED_STATE
      this.reason = reason
      this.onRejectedCallbacks.forEach(cb => cb())
    }
  }

  processor(promise, x, resolve, reject) {
    // 2.3.1 If promise and x refer to the same object, reject promise with a TypeError as the reason.
    // 实在搞不懂这两个case咋个过不了。。。
    if (promise === x) {
      reject(new TypeError('123'))
    }

    // 2.3.2
    // if (promise === x) {
    //   // if (x === promise) reject(new TypeError('123'))

    //   x.then(
    //     value => {
    //       this.processor(promise, value, resolve, reject)
    //     }, 
    //     reason => {
    //       reject(reason)
    //     }
    //   )
    // }

    // 2.3.3
    if (isObject(x) || isFunction(x)) {
      // If both resolvePromise and rejectPromise are called, 
      // or multiple calls to the same argument are made, 
      // the first call takes precedence, and any further calls are ignored.
      let called = false
      try {
        // 这里可能报错
        let then = x.then
        if (isFunction(then)) {
          then.call(x,
            y => {
              if (called) return
              called = true
              this.processor(promise, y, resolve, reject)
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
      } catch(err) { // If retrieving the property x.then results in a thrown exception e, reject promise with e as the reason.
        if (called) return
        called = true
        reject(err)
      }
    } else {
      // 2.3.4 If x is not an object or function, fulfill promise with x.
      resolve(x)
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value
    onRejected = isFunction(onRejected) ? onRejected : err => { throw err }
    // 2.2.7 then must return a promise
    return new Promise((resolve, reject) => {
      const wrapOnFulfilled = () => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            this.processor(this, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
      const wrapOnRejected = () => {
        setTimeout(() => {
          try {
            // new Promise((resolve, reject) => reject('超时')).then(null, err => err)
            const x = onRejected(this.reason)
            this.processor(this, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }
      // Promise.resolve().then()
      if (this.state === FULFILLED_STATE) {
        wrapOnFulfilled()
      } else if (this.state === REJECTED_STATE) { // Promise.reject().then()
        wrapOnRejected()
      } else { // new Promise(executor).then()
        this.onFulfilledCallbacks.push(wrapOnFulfilled)
        this.onRejectedCallbacks.push(wrapOnRejected)
      }
    }) 
  }

  // catch(callback) {
  //   return this.then(null, callback)
  // }

  // finally(callback) {
  //   return this.then(
  //     value => {
  //       callback()
  //       return value
  //     },
  //     err => {
  //       callback()
  //       throw err
  //     }
  //   )
  // }

  // static resolve(value) {
  //   return value instanceof Promise
  //   ? value
  //   : new Promise(resolve => resolve(value))
  // }

  // static reject(reason) {
  //   return new Promise(reject => reject(reason))
  // }

  // /**
  //  * Promise.all可以将多个Promise实例包装成一个新的Promise实例。
  //  * 同时，成功和失败的返回值是不同的，成功的时候返回的是一个结果数组，
  //  * 而失败的时候则返回最先被reject失败状态的值。
  //  * @param {*} promises 
  //  */
  // static all(promises) {
  //   return new Promise((resolve, reject) => {
  //     if (!promises.length) {
  //       resolve([])
  //     }
  //     const result = []
  //     const resolvedPromise = 0
  //     for (let i = 0, l = promises.length; i < l; i++) {
  //       Promise.resolve(promises[i]).then(
  //         value => {
  //           result[i] = value
  //           if (++resolvedPromise === l) {
  //             resolve[result]
  //           }
  //         },
  //         err => {
  //           reject(err)
  //         }
  //       )
  //     }
  //   })
  // }

  // /**
  //  * 顾名思义，Promse.race就是赛跑的意思，意思就是说，
  //  * Promise.race([p1, p2, p3])里面哪个结果获得的快，
  //  * 就返回那个结果，不管结果本身是成功状态还是失败状态。
  //  */
  // static race(promises) {
  //   return new Promise((resolve, reject) => {
  //     promises.forEach(promise => {
  //       Promise.resolve(promise).then(resolve, reject)
  //     })
  //   })
  // }

  // /**
  //  * 等到所有promises都已敲定（settled）（每个promise都已兑现（fulfilled）或已拒绝（rejected））。
  //  * 返回一个promise，该promise在所有promise完成后完成。并带有一个对象数组，每个对象对应每个promise的结果。
  //  * @param {*} promises 
  //  */
  // static allSettled(promises) {
  //   return new Promise((resolve, reject) => {
  //     if (!promises.length) {
  //       resolve([])
  //     }
  //     const result = []
  //     let resolvedPromise = 0
  //     for (let i = 0, l = promises.length; i < l; i++) {
  //       Promise.resolve(promises[i]).then(
  //         value => {
  //           result[i] = {
  //             state: FULFILLED_STATE,
  //             value
  //           }
  //           if (++resolvedPromise === l) {
  //             resolve(result)
  //           }
  //         },
  //         err => {
  //           result[i] = {
  //             state: REJECTED_STATE,
  //             reason: err
  //           }
  //           if (++resolvedPromise === l) {
  //             resolve(result)
  //           }
  //         }
  //       )
  //     }
  //   })
  // }

  // static any(promises) {
  //   return new Promise((resolve, reject) => {
  //     if (!promises.length) {
  //       resolve()
  //     }
  //     for (let i = 0, l = promises.length; i < l; i++) {
  //       Promise.resolve(promises[i]).then(
  //         value => {
  //           resolve(value)
  //         }
  //       )
  //     }
  //   }) 
  // }
}

Promise.defer = Promise.deferred = function(){
  let dfd = {}
  dfd.promise = new Promise((resolve, reject)=>{
      dfd.resolve = resolve
      dfd.reject = reject
  })
  return dfd
}

module.exports = Promise