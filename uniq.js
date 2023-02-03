
function uniq (arr) {
  return [... new Set(arr)]
}

function uniq (arr) {
  return arr.filter((item, index, arr) => index === arr.indexOf(item))
}

function uniq (arr) {
  const res = []
  arr.forEach(item => {
    if (res.includes(item)) return
    res.push(item)
  })
  return res
}

function uniq (arr) {
  const hash = {}
  const res = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] in hash) continue
    res.push(arr[i])
    hash[arr[i]] = arr[i]
  }
  return res
}

console.log(uniq([1, 3, 2, 6, 3, 2, 6, 9]))