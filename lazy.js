function lazy () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(item => {
      if (item.isIntersecting) {
        item.target.src = item.target.dataset.src
        io.unobserve(item.target)
      }
    })
  })
  const imgs = querySelectorAll('[data-src]')
  imgs.forEach(item => {
    io.observe(item)
  })
}