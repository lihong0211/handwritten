const img = document.getElementById('test')

function lazy () {
  const rect = img.getBoundingClientRect()
  if (rect.left < window.innerWidth && rect.right > 0 && rect.top < window.innerHeight && rect.bottom > 0) {
    img.src = img.getAttribute('data-src')
    window.removeEventListener('scroll')
  }
}

window.onscroll = lazy
