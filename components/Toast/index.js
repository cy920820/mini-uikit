import util from '../../helper/util'
import * as container from '../../components/Container'
import './index.scss'
class Toast {
  constructor() {
    this.$el = null
    this.$wrapper = null
    this.inited = false
  }

  show(text, time, cb, position) {
    if (typeof time === 'function') {
      cb = time
      time = null
    }

    this.$el.innerHTML = text
    this.$el.style.top = position

    util.showEle(this.$wrapper)
    container.showContainer()
    util.scaleIn(this.$el)

    setTimeout(() => {
      this.hide(cb)
    }, time || 1800)

  }

  hide(cb) {
    util.scaleOut(this.$el, () => {
      this.$el.innerHTML = ''
      util.hideEle(this.$wrapper)
      container.hideContainer()
      cb && cb()
    })
  }

  showCenter(text, time, cb) {
    this.show(text, time, cb, '50%')
  }

  showTop(text, time, cb) {
    this.show(text, time, cb, '12%')
  }

  showBottom(text, time, cb) {
    this.show(text, time, cb, '88%')
  }

  init() {
    if (this.inited) return

    const wrapper = document.createElement('div')
    const content = document.createElement('div')
    util.addClass(wrapper, 'toast')
    util.addClass(content, 'toast-content')
    wrapper.appendChild(content)
    container.append(wrapper)
    util.hideEle(wrapper)
    this.$wrapper = wrapper
    this.$el = content
    this.inited = true
  }
}

const instance = new Toast()
instance.init()

export const toast = instance

