function debounce (fn, delay) {
  let timer
  return function () {
    const ctx = this
    const callNow = !timer
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
    }, delay)
    if (callNow) fn.apply(ctx, arguments)
  }
}

function debounce (fn, delay) {
  let timer
  return function () {
    const ctx = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn.apply(ctx, arguments)
    }, delay)
  }
}

function debounce (fn, delay, immediate) {
  let timer
  return function () {
    const ctx = this
    if (timer) clearTimeout(timer)
    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, delay)
      if (callNow) fn.apply(ctx, arguments)
    } else {
      timer = setTimeout(() => {
        fn.apply(ctx, arguments)
      }, delay)
    }
  }
}

function throttle (fn, delay) {
  let prev = 0
  return function () {
    const ctx = this
    const now = Date.now()
    if (now - prev > delay) {
      fn.apply(ctx, arguments)
      prev = now
    }
  }
}

function throttle (fn, delay) {
  let timer
  return function () {
    const ctx = this
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(ctx, arguments)
        timer = null
      }, delay)
    }
  }
}

function throttle (fn, delay, immediate) {
  let timer
  let prev = 0
  return function () {
    const ctx = this
    if (immediate) {
      const now = Date.now()
      if (now - prev > delay) {
        fn.apply(ctx, arguments)
        prev = now
      }
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(ctx, arguments)
          timer = null
        }, delay)
      }
    }    
  }
}