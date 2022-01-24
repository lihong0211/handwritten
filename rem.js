function setRem () {
  var resize ='orientationchange' in window ?'orientationchange' :'resize';//orientationchange：移动端存在的监听事件
  function change(){
      var html = doc.documentElement;
      var width = doc.documentElement.clientWidth || win.innerWidth
      html.style.fontSize = width / 75 +'px';// 除以的数字根据效果图给的基准（一般移动端效果图750px、PC端1440px），得到一个相对容易计算的数值，就可以进行rem的使用了 
  }
  change();
  win.addEventListener(resize, change)
  win.addEventListener('load', change)
  doc.addEventListener('DOMContentLoaded',change)
}