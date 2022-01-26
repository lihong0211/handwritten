const p = new Promise (resolve => {
  setTimeout(() => {
    resolve(1)
  }, 3000)
}).then(res => {
  return new Promise((resolve, reject) => {
    resolve(res * 3)
  }).then(res => {
    return res
  })
})

async function test () {
  console.log(await p)
}

test()