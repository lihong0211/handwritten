const Promise = require("./promise1")

const p = new Promise ((resolve) => {
  const delay = Math.random() * 2 * 1000
  setTimeout(() => {
    resolve('promise正常返回')
  }, delay)
})

function callingWithDeadline (p) {
  return new Promise(async(resolve, reject) => {
    setTimeout(() => {
      reject('超时')
    }, 1000)
    resolve(await p)
  })
  .then(res => {
    return res
  },
  err => {
    console.log(err)
  })
}

await callingWithDeadline(p)