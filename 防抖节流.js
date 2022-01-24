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