Function.prototype.call = function () {
  const args = [...arguments]
  const ctx = args.shift()

  ctx.fn = this
  const res = ctx.fn(...args)

  delete ctx.fn
  return res
}

Function.prototype.apply = function () {
  const args = [...arguments]
  const ctx = args.shift()

  ctx.fn = this
  const res = ctx.fn(args)

  delete ctx.fn
  return res
}

Function.prototype.bind = function () {
  const args = [...arguments]
  const ctx = args.shift()
  const _this = this
  return function () {
    return _this.apply(ctx, args.concat([...arguments]))
  }
}