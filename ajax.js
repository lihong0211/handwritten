function ajax ({
  url = null,
  method = 'GET',
  responseType = 'text',
  async = true
}) {
  return new Promise((resolve, reject) => {
    const XHR = XMLHttpRequest || ActiveXObject
    const xhr = new XHR()

    xhr.open(method, url, async)
    xhr.responseType = responseType
    
    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) return
      if (/^[23]\d{2}$/.test(xhr.status)) {
        resolve(xhr.responseText)
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