// 参考：https://www.jianshu.com/p/c8b86b09daf0

// 非立即执行
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

// 立即执行
function debounce (fn, delay) {
  let timer
  return function () {
    const ctx = this
    if (timer) clearTimeout(timer)
    const callNow = !timer
    timer = setTimeout(() => {
      timer = null
    }, delay)
    if (callNow) fn.apply(ctx, arguments)
  }
}

// 完整版
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

// 非立即执行--定时器
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

// 立即执行--时间戳
function throttle (fn, delay) {
  let prev = 0
  return function () {
    const ctx = this
    const now = Date.now()
    if (now - prev > delay) { // delay一般较小，所以第一次会满足条件
      fn.apply(ctx, arguments)
      prev = now
    }
  }
}

// 完整版
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

