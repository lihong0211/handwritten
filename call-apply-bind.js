Function.prototype.myCall = function () {
  const args = [...arguments]
  const ctx = args.shift()
  ctx.fn = this
  const result = ctx.fn(...args)
  delete ctx.fn
  return result
}

var test = {
  name: 'lihong'
}

function b () {
  console.log(this)
  console.log(this.name)
}

b.myCall(test)


Function.prototype.myApply = function () {
  const args = [...arguments]
  const ctx = args.shift()
  ctx.fn = this
  const result = ctx.fn(args)
  delete ctx.fn
  return result
}


Function.prototype.myBind = function () {
  const args = [...arguments] // 绑定函数时的参数
  const ctx = args.shift()
  const _this = this

  return function () {
      console.log(this) // 返回的函数的执行上下文
      console.log(_this) // f b() {}
      return _this.apply(ctx, args.concat([...arguments])) // 返回的函数执行时的参数
  }
}

var test = {
  name: 'lihong'
}

function b () {
  console.log(this.name)
}

b.myBind(test, 1, 2, 3)(4, 5)
