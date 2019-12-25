import conf from '../components/config'

export default {
  clsPrefixed(cls) {
    return `${conf.libName}-${cls}`
  },

  trim(str) {
    if (!String.prototype.trim) {
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
    } else {
      return str.trim()
    }
  },

  splitSpaces(str) {
    return str.split(/\s+/)
  },

  hasClass(node, cls) {
    let clsAry = this.splitSpaces(node.className)
    return clsAry.indexOf(cls) > -1
  },

  clsList(node) {
    let clsNames = node.className
    clsNames = this.trim(clsNames)
    return this.splitSpaces(clsNames)
  },

  addClass(node, cls) {
    let clsList = this.splitSpaces(cls)
    let nodeClsList = this.clsList(node)
    clsList.forEach(name => {
      name = this.clsPrefixed(name)
      if (!this.hasClass(node, name)) {
        nodeClsList.push(name)
      }
    })
    node.className = nodeClsList.join(' ')
  },

  rmClass(node, cls) {
    let nodeClsList = node.className
    let clsList = this.splitSpaces(cls)

    clsList.forEach(cls => {
      cls = this.clsPrefixed(cls)
      let pattern = new RegExp(`(^|\\s+)${cls}(\\s+|$)`, 'g')
      nodeClsList = nodeClsList.replace(pattern, ' ')
    })

    node.className = this.trim(nodeClsList)
  },

  showEle(el) {
    this.rmClass(el, 'hidden')
  },

  hideEle() {
    this.addClass(el, 'hidden')
  }
}
