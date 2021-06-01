/**
 * 手写call函数
 * @param {*} ctx 
 */
// 在Function.prototype上修改
Function.prototype.myCall = function () {
    let result
    const args = [...arguments]
    const ctx = args.shift()

    // 绑定this
    ctx.fn = this
    // 执行fn，带上参数  fn执行的时候 fn的this是只想ctx的  也就相当于改变了this指向到ctx上了
    result = ctx.fn(...args)
    // 删除fn
    delete ctx.fn
    // 返回结果
    return result
}

/**
 * 手写apply函数
 * @param {*} ctx 
 */
Function.prototype.myApply = function () {
    let result
    const args = [...arguments]
    const ctx = args.shift()
    ctx.fn = this
    // 这里与call的区别知识参数的不一样
    result = ctx.fn([...args])
    delete ctx.fn
  
    return result
}


/**
 * 手写bind函数
 * @param {*}  
 */
Function.prototype.myBind = function () {
    const args = [...arguments]
    const ctx = args.shift()
    const _this = this

    return function () {
        return _this.apply(ctx, args.concat([...arguments]))
    }
}