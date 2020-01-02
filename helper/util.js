import { libName, duration } from '../components/config'

export default {
  getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1)
  },

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

  fastclick: (function () {
    let startX = 0
    let startY = 0
    let cancel = false

    function onTouchStart (e) {
      e = e || window.event
      let touches = e.touches
      if (touches.length === 1) {
        startX = touches[0].pageX
        startY = touches[0].pageY
      }
    }

    function onTouchMove (e) {
      e = e || window.event
      const distance = 10
      let pageX = e.touches[0].pageX
      let pageY = e.touches[0].pageY
      if (Math.abs(pageX - startX) > distance || Math.abs(pageY - startY) > distance) cancel = true
    }

    return function (node, cb) {
      node.addEventListener('touchstart', onTouchStart, false)
      node.addEventListener('touchmove', onTouchMove, false)
      node.addEventListener('touchend', (e) => {
        e = e || window.event
        if (cancel === false) {
          cb(e)
          e.preventDefault()
        } else {
          cancel = false
          startX = startY = 0
        }
      }, false)
      if (!navigator.userAgent.toLowerCase().match('mobile')) {
        node.addEventListener('click', cb, false)
      }
    }
  })(),

  showEle(el) {
    this.rmClass(el, 'hidden')
  },

  hideEle(el) {
    this.addClass(el, 'hidden')
  },

  createInAnime(cls) {
    return (node) => {
      this.addClass(node, cls)
      setTimeout(() => {
        this.rmClass(node, cls)
      }, 0)
    }
  },

  createOutAnime(cls) {
    return (node, callback) => {
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
    this.createOutAnime('fade-out')(node, cb)
  },

  bottomIn(node) {
    this.createInAnime('bottom-in')(node)
  },

  bottomOut(node, cb) {
    this.createOutAnime('bottom-out')(node, cb)
  },

  scaleIn(node) {
    this.createInAnime('scale-in')(node)
  },

  scaleOut(node, cb) {
    this.createOutAnime('scale-out')(node, cb)
  }
}
