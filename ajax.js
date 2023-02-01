function ajax({
  method = 'GET',
  url = null,
  responseType = 'json'
}) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = responseType

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return

      if (/^[23]\d{2}$/.test(xhr.status)) {
        // console.log(xhr.response)
        resolve(xhr.response)
      } else {
        reject(xhr.responseText)
      }
    }

    xhr.onerror = function () {
      reject(xhr.responseText)
    }

    xhr.send()
  })
}

await ajax({
  url: 'https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType/bcd.json'
})