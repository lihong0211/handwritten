class LinkListNode {
  constructor (key = null, val = null) {
    this.key = key
    this.val = val
    this.prev = null
    this.next = null
  }
}

class Set {
  constructor (arr) {
    this.init()
    if (Array.isArray(arr) && arr.length > 0) {
      arr.forEach(item => {
        this.add(item)
      })
    }
  }
  init () {
    this.hash = {}
    this.size = 0
    this.head = new LinkListNode()
    this.tail = new LinkListNode()
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  add (val) {
    if (this.hash[val]) return
    const node = new LinkListNode(val, val)
    const prev = this.tail.prev
    prev.next = node
    node.prev = prev
    node.next = this.tail
    this.tail.prev = node
    this.hash[val] = node
    this.size++
  }

  delete (val) {
    const node = this.hash[val]
    if (!node) return

    const prev = node.prev
    const next = node.next
    prev.next = next
    next.prev = prev

    delete this.hash[val]
    this.size--
  }

  has (val) {
    return val in this.hash
  }

  clear () {
    this.init()
  }

  forEach (cb) {
    let linkList = this.head.next
    while (linkList.next) {
      cb.call(null, linkList.val, linkList.val)
      linkList = linkList.next
    }
  }

  entries () {
    return this.iterator('entries')
  }

  keys () {
    return this.iterator('values')
  }

  values () {
    return this.iterator('values')
  }

  iterator (type) {
    let linkList = this.head.next
    function next () {
      if (linkList) {
        const val = linkList.val
        const value = type === 'values' ? val : [val, val]
        const done = linkList.next === null
        linkList = linkList.next
        return {
          done,
          value: done ? undefined : value
        }
      }
    }
    return { next }
  }
}
