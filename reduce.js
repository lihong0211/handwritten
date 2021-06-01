Array.prototype.myReduce = function () {
    const arr = this
    const len = arr.length
    const cb = [...arguments][0]
    const args = [...arguments].slice(1)
    let idx = 0
    let initVal = args ? args : arr[0]
    let accumulator = initVal
    while (idx < len) {
        accumulator = cb.apply(undefined, [accumulator, arr[idx], idx, arr]) 
        idx++
    }
    return accumulator
}

const arr = [1, 2, 3, 4]
arr.myReduce((accumulator, cur, idx, arr) => {
    return accumulator + cur
})