const status = {
    pending: Symbol('pending'),
    fullfiled: Symbol('fullfiled'),
    rejected: Symbol('rejected')
}

function isFunction (fn) {
    return typeof fn === 'function'
}

function isPromise(value) {
    return (
      value &&
      isFunction(value.then) &&
      isFunction(value.catch) &&
      isFunction(value.finally)
    )
  }


class MyPromise {
    constructor (exector) {
        // 初始化状态为 pending
        // 传递给 then 的 onFulfilled 参数
        // 错误原因
        try {
            this.status = status.pending
            this.value = undefined
            this.error = undefined
            this.nextCallback = undefined
            exector(this.onFullfilled, this.onRejected)
        } catch (error) {
            this.onRejected(error)
        }

    }

    onFullfilled (value) {
        setTimeout (() => {
            if (this.status === status.pending) {
                this.value = value
                this.status = status.fullfiled
                this.error = undefined
                this.throwErrorIfNotCatch()
            }
        })
    }

    onRejected (error) {
        setTimeout (() => {
            if (this.status === status.pending) {
                this.value = undefined
                this.status = status.rejected
                this.error = error
                this.throwErrorIfNotCatch()
            }
        })
    }

    then (onFullfilled, onRejected) {
        return new MyPromise((resolve, reject) => {
            const handle = (reason => {
                try {
                    function handleResolve (value) {
                        const value = isFunction(onFullfilled) ? onFullfilled(value) : value
                        resolve(value)
                    }
        
                    function handleReject (error) {
                        return isFunction(onRejected) ? resolve(onRejected(error)) : reject(error)
                    }
        
                    if (this.status === status.fullfiled) {
                        return handleResolve(this.value)
                    }
                    if (this.status === status.rejected) {
                        return handleReject(this.error)
                    }
                } catch (error) {
                    reject(error)
                }
                
            })

            const nextCallback = () => {
                handle(this.error)
                this.error = undefined
            }

            if (this.status === status.pending) {
                this.nextCallback = nextCallback
            } else {
                nextCallback()
            }
        })
    }

    catch (onRejected) {
        return this.then((null, onRejected))
    }

    finally (onFinally) {
        return this.then(() => {
            onFinally()
            return this.value
        }, () => {
            onFinally()
            throw this.error
        })
    }

    throwErrorIfNotCatch () {
        setTimeout (() => {
            if (this.error !== undefined) {
                console.log('Uncaught in promise')
            }
        })
    }

}

MyPromise.resolve = function (value) {
    return new MyPromise(resove => {
        this.resolve(value)
    })
}

MyPromise.reject = function (reason) {
    return new MyPromise(null, reject => {
        reject(reason)
    })
}

MyPromise.all = function (values) {
    return new MyPromise((resolve, reject) => {
        let ret = {}
        let isError = false
        values.forEach((p, index) => {
            if (isError) {
                return
            }
            MyPromise.resolve(p).then(value => {
                ret[index] = value
                const result = Object.values(ret)
                if (values.length === result.length) {
                    resolve(result)
                }
            }).catch(error => {
                isError = true
                reject(error)
            })
        })
    })
}

MyPromise.race = function (values) {
    return new MyPromise(function (resolve, reject) {
        values.forEach(function (value) {
            MyPromise.resolve(value).then(resolve, reject)
        })
    })
}