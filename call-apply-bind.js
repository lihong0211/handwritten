Function.prototype.myCall = function () {
  const args = [...arguments]
  const ctx = args.shift()

  ctx.fn = this
  const result = ctx.fn(...args)
  delete ctx.fn
  return result
}

Function.prototype.myApply = function () {
  const args = [...arguments]
  const ctx = args.shift()

  ctx.fn = this
  const result = ctx.fn(args)
  delete ctx.fn
  return result
}

Function.prototype.myBind = function () {
  const args = [...arguments]
  const ctx = args.shift()
  const _this = this
  
  return function () {
    return _this.apply(ctx, args.concat([...arguments]))
  }
}