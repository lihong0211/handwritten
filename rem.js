
// dom文件加载的步骤为：

// 1,解析HTML结构。
// 2,DOM树构建完成。//DOMContentLoaded
// 3,加载外部脚本和样式表文件。
// 4,解析并执行脚本代码。
// 5,加载图片等外部文件。
// 6,页面加载完毕。//load

(function flexible (window, document) {
  const dpr = window.devicePixelRatio

  function setRem () {
    const resize = window.orientationchange ? 'orientationchange' : 'resize' //orientationchange：移动端存在的监听事件
    function change () {
      const html = document.documentElement
      const width = html.clientHeight || window.innerHeight
      // 除以的数字根据效果图给的基准（一般移动端效果图750px、PC端1440px），得到一个相对容易计算的数值，就可以进行rem的使用了 
      html.style.fontSize = width / 75 + 'px'
    }
    change()
    window.addEventListener(resize, change)
    window.addEventListener('load', change)
    document.addEventListener('DOMContentLoaded', change)
  }

  function setBodyFontSize () {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + 'px'
    } else {
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }

  function halfPixelSupport () {
    if (dpr === 1) return
    const testEle = document.createElement('div')
    const testBody = document.createElement('body')
    testEle.style.border = '.5px solid transparent'
    testBody.appendChild(testEle)
    document.appendChild(testBody)
    if (testEle.offsetHeight === 1) {
      document.classList.add('hairlines')
    }
    document.removeChild(testBody)
  }

  // 设置html字体大小
  setRem()
  // 重置body字体大小
  setBodyFontSize()
  // 0.5px 支持
  halfPixelSupport()

})(window, document)
