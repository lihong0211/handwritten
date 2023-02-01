
// 接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。

function add () {
  const args = [...arguments]
  return function curring () {
    if (!arguments.length) {
      return args.reduce((res, cur) => res + cur)
    } else {
      args.push(...arguments)
      return curring
    }
  }
}

add(2)(3, 4)(5)()

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

function sum () {
  return [].reduce.call(arguments, (res, cur) => res + cur)
}

curring(sum, 2)(3,4)(5)()