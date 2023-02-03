class LinkListNode {
  constructor (key = null, val = null) {
    this.key = key
    this.val = val
    this.prev = null
    this.next = null
  }
}

class Map {
  constructor () {
    this.init()
  }
  
  init () {
    this.hash = {}
    this.size = 0
    this.head = new LinkListNode()
    this.tail = new LinkListNode()
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  get (key) {
    return this.hash[key] ? this.hash[key].val : undefined
  }

  set (key, val) {
    if (this.hash[key]) {
      this.hash[key].val = val
    } else {
      const node = new LinkListNode(key, val)
      const prev = this.tail.prev
      prev.next = node
      node.prev = prev
      node.next = this.tail
      this.tail.prev = node
      this.hash[key] = node
      this.size++
    }
  }

  delete (key) {
    const node = this.hash[key]
    if (!node) return

    const prev = node.prev
    const next = node.next
    prev.next = next
    next.prev = prev

    delete this.hash[key]
    this.size--
  }

  has (key) {
    return key in this.hash
  }

  clear () {
    this.init()
  }

  forEach (cb) {
    let linkList = this.head.next
    while (linkList.next) {
      cb.call(null, linkList.key, linkList.val)
      linkList = linkList.next
    }
  }

  entries () {
    return this.iterator('entries')
  }

  keys () {
    return this.iterator('keys')
  }

  values () {
    return this.iterator('values')
  }

  iterator (type) {
    let linkList = this.head.next
    function next () {
      if (linkList) {
        const key = linkList.key
        const val = linkList.val
        const done = linkList.next === null
        const value = type === 'keys' ? key
          : type === 'values' ? val 
          : [key, val]
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
