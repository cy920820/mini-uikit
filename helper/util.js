import { libName, duration } from '../components/config'

export default {
  clsPrefixed(cls) {
    return `${libName}-${cls}`
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
    if (clsNames) {
      clsNames = this.trim(clsNames)
      return this.splitSpaces(clsNames)
    } else {
      return []
    }
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
    let clsNames = node.className

    if (clsNames) {
      let clsList = this.splitSpaces(cls)

      clsList.forEach(cls => {
        cls = this.clsPrefixed(cls)
        let pattern = new RegExp(`(^|\\s+)${cls}(\\s+|$)`, 'g')
        clsNames = clsNames.replace(pattern, ' ')
      })

      node.className = this.trim(clsNames)
    }
  },

  showEle(el) {
    this.rmClass(el, 'hidden')
  },

  hideEle(el) {
    this.addClass(el, 'hidden')
  },

  createInAnime(cls) {
    return function (node) {
      this.addClass(node, cls)
      setTimeout(() => {
        node.rmClass(node, cls)
      }, 0)
    }
  },

  createOutAnime(cls) {
    return function (node, callback) {
      this.addClass(node, cls)
      setTimeout(() => {
        this.rmClass(node, cls)
        if (callback) callback()
      }, duration)
    }
  },

  fadeIn(node) {
    this.createInAnime('fade-in')(node)
  },

  fadeOut(node, cb) {
    this.createInAnime('fade-out')(node, cb)
  },

  bottomIn(node) {
    this.createInAnime('bottom-in')(node)
  },

  bottomOut(node, cb) {
    this.createInAnime('bottom-out')(node, cb)
  },

  scaleIn(node) {
    this.createInAnime('scale-in')(node)
  },

  scaleOut(node, cb) {
    this.createInAnime('scale-out')(node, cb)
  }
}
