function add () {
  let args = [...arguments]
  return function curring () {
    if (!arguments.length) {
      return args.reduce((res, cur) => res + cur)
    } else {
      args.push(...arguments)
      return curring
    }
  }
}

add(1)(2, 3)(4)(5)()

function curring (fn) {
  const args = [].slice.call(arguments, 1)
  return function _fn () {
    if (!arguments.length) {
      return fn.apply(this, args)
    } else {
      args.push(...arguments)
      return _fn
    }
  }
}

function add () {
  return [].reduce.call(arguments, (res, cur) => res + cur)
}

curring(add, 1)(2, 3)(4)(5)()