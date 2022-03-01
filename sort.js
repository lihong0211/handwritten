/* eslint-disable */
function swap (arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

const bubbleSort = function (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = len - 1; j > i; j--) {
      if (arr[j] < arr[j - 1]) {
        swap(arr, j, j - 1)
      }
    }
  }
  console.log(arr, 'bubbleSort')
}

const selectSort = function (arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    let minIdx = i
    for (let j = i; j < len; j++) {
      if (arr[minIdx] > arr[j]) {
        minIdx = j
      }
    }
    swap(arr, i, minIdx)
  }
  console.log(arr, 'selectSort')
}

const insertSort = function (arr) {
  const len = arr.length
  for (let i = 1; i < len; i++) {
    const temp = arr[i]
    let prevIndex = i - 1
    // 从后往前赋值
    while (prevIndex >= 0 && arr[prevIndex] > temp) {
      arr[prevIndex + 1] = arr[prevIndex]
      prevIndex -= 1
    }
    arr[prevIndex + 1] = temp
  }
  console.log(arr, 'insertSort')
}

const quickSort = function (arr) {
  if (arr.length < 2) return arr
  const len = arr.length
  const mark = arr[0]
  const left = []
  const right = []
  for (let i = 0; i < len; i++) {
    if (arr[i] < mark) {
      left.push(arr[i])
    } else if (arr[i] > mark) {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(mark, quickSort(right))
}

var mergeSort = function (arr) {
  if (arr.length < 2) return arr
  const mid = Math.floor(arr.length / 2)
  const left = arr.slice(0, mid)
  const right = arr.slice(mid)
  return merge(mergeSort(left), mergeSort(right))
}

function merge (left, right) {
  const result = []
  const len = left.length + right.length
  for (let i = 0, li = 0, ri = 0; i < len; i++) {
    if (li === left.length) {
      result.push(right[ri])
      ri++
    } else if (ri === right.length) {
      result.push(left[li])
      li++
    } else if (left[li] < right[ri]) {
      result.push(left[li])
      li++
    } else {
      result.push(right[ri])
      ri++
    }
  }
  return result
}

function shellSort (arr) {
  const len = arr.length
  let gap = arr.length / 2
  while(gap >= 1) {
    for (let i = gap; i < len; i++) {
      temp = arr[i];
      let preIndex = i - gap;
      while (preIndex >= 0 && arr[preIndex] > temp) {
          arr[preIndex + gap] = arr[preIndex];
          preIndex -= gap;
      }
      arr[preIndex + gap] = temp;
    }
    gap /= 2
  }
  console.log(arr, 'shellSort')
}

function countSort (arr) {
  const len = arr.length
  let max = arr[0]
  let min = arr[0]
  for (let i = 0; i < len; i++) {
    max = Math.max(max, arr[i])
    min = Math.min(min, arr[i])
  }
  const countArr = Array(max - min + 1).fill(0)
  for (let i = 0; i < len; i++) {
    countArr[arr[i] - min] += 1
  }
  for (let i = 0, j = 0; i < countArr.length; i++) {
    while(countArr[i] > 0) {
      arr[j] = min + i
      countArr[i] -= 1
      j++
    }
  }
  console.log(arr, 'countSort')
}

function bucketSort (arr) {
  let max = arr[0]
  let min = arr[0]
  const len = arr.length
  for (let i = 0; i < len; i++) {
    max = Math.max(max, arr[i])
    min = Math.min(min, arr[i])
  }

  const bucketNum = Math.floor((max - min) / len) + 1
  const bucketArr = Array(bucketNum)
  for (let i = 0; i < bucketNum; i++) {
    bucketArr[i] = []
  }

  for (let i = 0; i < len; i++) {
    const idx = Math.floor((arr[i] - min) / len)
    bucketArr[idx].push(arr[i])
  }

  for (let i = 0, j = 0; i < bucketNum; i++) {
    bucketArr[i].sort((m, n) => m - n)
    while(bucketArr[i].length) {
      arr[j] = bucketArr[i].shift()
      j++
    }
  }
  console.log(arr, 'bucketSort')
}

const test = [1, 8, 5, 2, 10, 15, 55, 29]

bubbleSort([...test])
selectSort([...test])
insertSort([...test])
console.log(quickSort([...test]), 'quickSort')
console.log(mergeSort([...test]), 'mergeSort')
bucketSort([...test], 'bucketSort')
shellSort([...test], 'shellSort')
countSort([...test], 'countSort')
