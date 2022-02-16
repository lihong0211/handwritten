function uniq (arr) {
  const temp = []
  arr.map(item => {
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