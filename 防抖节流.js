function debounce (fn, delay) {
  let timer = null
  return function () {
    const ctx = this
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(ctx, arguments)
    }, delay)
  }
}

function debounce (fn, delay, immediate) {
  let timer, result

  const debounced = function () {
    const ctx = this
    const args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      if (!timer) {
        result = fn.apply(ctx, args)
      }
      timer = setTimeout(() => {
        timer = null
      }, delay)
    } else {
      timer = setTimeout(() => {
        result = fn.apply(ctx, args)
      }, delay)
    }
    return result
  }

  debounced.cancel = function () {
    clearTimeout(timer)
    timer = null
  }

  return debounced
}

function throttle (fn, delay) {
  let canRun = true
  return function () {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(this, arguments)
      canRun = true
    }, delay)
  }
}