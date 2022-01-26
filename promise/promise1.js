const PENDING_STATE = 'pending'
const FULFILLED_STATE = 'fulfilled'
const REJECTED_STATE = 'rejected'

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
  init () {
    this.status = PENDING_STATE
    this.reason = null
    this.val = null
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }
  
  bind () {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  resolve (val) {
    if (this.status === PENDING_STATE) {
      this.val = val
      this.status = FULFILLED_STATE
      this.onFulfilledCallbacks.forEach(cb => cb())
    }
  }

  reject (reason) {
    if (this.status = REJECTED_STATE) {
      this.reason = reason
      this.status = REJECTED_STATE
      this.onRejectedCallbacks.forEach(cb => cb())
    }
  }

  processor (promise, x, resolve, reject) {
    if (promise === x) {
      reject(new TypeError('equal'))
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
    return new Promise((resolve, reject) => {
      const wrapOnFulfilled = () => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.val)
            this.processor(this, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      const wrapOnRejected = () => {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            this.processor(this, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === FULFILLED_STATE) {
        wrapOnFulfilled()
      } else if (this.status === REJECTED_STATE) {
        wrapOnRejected()
      } else {
        this.onFulfilledCallbacks.push(wrapOnFulfilled)
        this.onRejectedCallbacks.push(wrapOnRejected)
      }
    })
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
      err => {
        cb()
        throw err
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
    return reason instanceof Promise
      ? reason
      : new Promise(null, reject => {
        reject(reason)
      })
  }

  static all (promises) {
    return new Promise((resolve, reject) => {
      const len = promises.length
      if (!len) resolve([])
      let resolved = 0
      let result = []
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          res => {
            result[i] = res
            if (++resolved === len) {
              resolve(result)
            }
          },
          err => {
            reject(err)
          }
        )
      }
    })
  }

  static any (promises) {
    return new Promise((resolve, reject) => {
      const len = promises.length
      if (!len) resolve('')
      let rejected = 0
      const result = []
      for (let i = 0; i < len; i++) {
        promises[i].then(
          res => {
            resolve(res)
          },
          err => {
            result[i] = err
            if (++rejected === len) {
              reject(new AggregateError([
                new Error(result),
              ], 'result'))
            }
          }
        )
      }
    })
  }

  static race (promises) {
    return new Promise((resolve, reject) => {
      const len = promises
      for (let i = 0; i < len; i++) {
        promises[i].then(
          res => {
            resolve(res)
          },
          err => {
            reject(err)
          }
        )
      }
    })
  }

  static allSetted (promises) {
    return new Promise((resolve, reject) => {
      const len = promises
      if (!len) resolve([])
      let resolved = 0
      const result = []
      for (let i = 0; i < len; i++) {
        promises[i].then(
          res => {
            result[i] = {
              status: FULFILLED_STATE,
              value: res
            }
            if (++resolved === len) {
              resolve(result)
            }
          },
          err => {
            result[i] = {
              status: REJECTED_STATE,
              reason: err
            }
            if (++resolved === len) {
              resolve(result)
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

// module.exports = Promise

async function testFinally () {
  const p = new Promise((resolve, reject) => {
   setTimeout(() => {
    reject('测试finally')
   }, 1000) 
  }).finally(() => {
    console.log('finally执行')
  })
  console.log('finally', (await p))
}

async function testAll () {
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p1-res')
    }, 1000)
  })
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('p2-res')
    }, 3000)
  })
  const res = await Promise.all([p1, p2])
  console.log('all', res)
}

async function testCatch () {
  await new Promise((resolve, reject) => {
    reject('测试catch')
  }).catch((reason) => {
    console.log(reason)
  })
}

async function testAny () {
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('p1-rej')
    }, 1000)
  })
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('p2-rej')
    }, 3000)
  })
  await Promise.any([p1, p2]).catch(err => console.log('any', err.errors))
  // console.log('any', res)
}

async function testRace () {
  const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('p1-rej')
    }, 1000)
  })
  const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('p2-rej')
    }, 3000)
  })
  const res = await Promise.race([p1, p2])
  console.log('race', res)
}

// testCatch()
// testFinally()
// testAll()
// testAny()
testRace()

