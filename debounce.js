const debounce = (fn, delay) => {
    let timer = null
    return function () {
        // 如果前面还前面有一个任务，就取消上一个任务
        clearTimeout(timer)
        // 再添加一个任务
        timer = setTimeout(() => {
            fn.apply(this, arguments)
        }, delay)
    }
}

const throttle = (fn, delay) => {
    let canRun = true
    return function () {
        // 如果canRun为false，表明还有一个待执行待任务，直接return
        if (!canRun) return
        canRun = false
        setTimeout(() => {
            fn.apply(this, arguments)
            // fn已经执行了后把标记置为true，表示可以执行下一次任务
            canRun = true
        }, delay)
    }
}