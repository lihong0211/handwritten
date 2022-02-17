// 参考：https://www.jianshu.com/p/c8b86b09daf0

// 所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。

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

// 所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。节流会稀释函数的执行频率。

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

