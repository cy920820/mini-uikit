import util from '../../helper/util'
import '../common.scss'

class Container {
  constructor() {
    this.$container = ''
    this.$mask = {
      el: this.maskEl,
      cbs: [],
      onclick(fn) {
        this.cbs.push(fn)
      },
      offclick(fn) {
        this.cbs = this.cbs.filter((item) => item !== fn)
      }
    }
    this.counts = 0
    this.maskCounts = 0
  }

  show() {
    this.counts += 1
    util.showEle('hidden')
  }

  showWithMask(){
    this.maskCounts += 1
    const maskEl = this.$mask.el
    util.showEle(maskEl)
    this.show()
    util.fadeIn(maskEl)
  }

  hide() {
    this.counts -= 1
    if (this.counts === 0) {
      util.hideNode(this.$container, 'hidden')
    }
  }

  hideWithMask() {
    this.maskCounts -= 1

    if (this.maskCounts === 0) {
      const maskEl = this.$mask.el
      util.fadeOut(maskEl, () => {
        util.hideEle(maskEl)
        this.hide()
      })
    }

    let maskEl = this.$mask.el
    util.showEle(maskEl)
    this.show()
    util.fadeIn(maskEl)
  }

  append(node) {
    this.$container.appendChild(node)
  }

  init() {
    this.$container = document.createElement('div')
    this.$maskEl = document.createElement('div')
    util.addClass(this.$container, 'container')
    util.addClass(this.$maskEl, 'mask')
    this.append(this.$maskEl)

    util.hideEle(this.$container)
    util.hideEle(this.$maskEl)
    document.body.appendChild(this.$container)

    // faskclick
  }
}

const container = new Container()
container.init()
