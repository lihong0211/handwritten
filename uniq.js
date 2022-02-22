function uniq (arr) {
  const temp = []
  arr.forEach(item => {
    if (!temp.includes(item)) {
      temp.push(item)
    }
  })
  return temp
}

function uniq (arr) {
  return [...new Set(arr)]
}

function uniq (arr) {
  return arr.filter((item, index, array) => {
    return index === array.indexOf(item)
  }) 
}

function uniq (arr) {
  const hash = {}
  const len = arr.length
  const res = []
  for (let i = 0; i < len; i++) {
    if (!(arr[i] in hash)) {
      res.push(arr[i])
      hash[arr[i]] = arr[i]
    }
  }
  return res
}

console.log(uniq([1, 3, 2, 6, 3, 2, 6, 9]))