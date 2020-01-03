import * as container from '../Container'
import util from '../../helper/util'
import './index.scss'

function isButton(obj) {
  const type = util.getType(obj)
  return /^(Object | Array | Function)$/.test(type)
}

class Dialog {
  constructor() {
    this.zIndex = 1003
    this.btnText = '确定'
    this.$wrapper = null
    this.$dialog = null
    this.handlers = []
    this.BUTTON_IDX = 'btn-idx'
  }

  createButtons(options) {
    let buttons = []
    const type = util.getType(options)
    if (type === 'Object') {
      buttons = [options]
    } else if (type === 'Function') {
      buttons = [{
        text: '确定',
        onClick: options
      }]
    } else if (type === 'Array') {
      buttons = options // 有可能每一项的数据类型不是 Object
    }

    if (!buttons.length) {
      buttons = [{text: '确定'}]
    }

    buttons = buttons.map(btn => {
      if (util.getType(btn) !== 'Object') {
        return {text: btn}
      } else {
        return btn
      }
    })

    return buttons
  }

  renderTitle(title) {
    let el = document.createElement('div')
    el.innerHTML = title
    util.addClass(el, 'dialog-title')
    return el
  }

  renderContent(content) {
    let el = document.createElement('div')
    el.innerHTML = content
    util.addClass(el, 'dialog-content')
    return el
  }

  renderButtons(buttons, handlers) {
    let btns = document.createElement('div')
    util.addClass(btns, 'dialog-btns')

    if (buttons.length === 2) {
      util.addClass(btns, 'dialog-btns-double')
    }

    buttons.forEach((btn, index) => {
      let el = document.createElement('div')
      util.addClass(el, 'dialog-btn bd-1px')
      el.innerHTML = btn.text
      el.setAttribute(this.BUTTON_IDX, index)
      btns.appendChild(el)
      handlers[index] = btn.onClick
    })

    return btns
  }

  render(title, content, buttons) {
    // 组装元素
    const $title = this.renderTitle(title)
    const $content = this.renderContent(content)
    const $buttons = this.renderButtons(buttons, this.handlers)

    this.$dialog.appendChild($title)
    this.$dialog.appendChild($content)
    this.$dialog.appendChild($buttons)

    this.$wrapper.appendChild(this.$dialog)
  }

  destroy() {
    this.$wrapper.parentNode.removeChild(this.$wrapper)
    this.$wrapper = null
    this.$dialog = null
    this.handlers = []
  }

  show() {
    container.append(this.$wrapper)
    util.showEle(this.$wrapper)
    container.showContainerWithMask()
    util.scaleIn(this.$dialog)
  }

  hide() {
    container.hideContainerWithMask()
    util.scaleOut(this.$dialog, () => this.destroy())
  }

  alert(title, content, buttons) {
    this.init()

    if (arguments.length === 1) {
      content = title
      title = undefined
    } else if (isButton(content)) {
      buttons = content
      content = title
      title = undefined
    }

    buttons = this.createButtons(buttons)

    this.render(title, content, buttons)

    this.show()
  }

  confirm(title, content, callback) {
    if (arguments.length === 1) {
      content = title
      title = undefined
    } else if (typeof content === 'function') {
      callback = content
      content = title
    }

    this.alert(title, content, [
      {
        text: '取消',
        onClick: function () {
          if (callback) callback(false)
        }
      },
      {
        text: '确定',
        onClick: function () {
          if (callback) callback(true)
        }
      }
    ])
  }

  init() {
    const wrapper = document.createElement('div')
    const dialog = document.createElement('div')
    util.addClass(wrapper, 'dialog')
    util.addClass(dialog, 'dialog-main')
    wrapper.style.zIndex = this.zIndex
    wrapper.appendChild(dialog)
    util.hideEle(wrapper)
    container.append(wrapper)

    this.$wrapper = wrapper
    this.$dialog = dialog

    util.fastclick(wrapper, (e) => {
      let btn = e.target || e.srcElement
      let idx = btn.getAttribute(this.BUTTON_IDX)

      if (idx) {
        const handler = this.handlers[idx]
        if (typeof handler === 'function') handler(e)
        this.hide()
      }
    })
  }
}

export const dialog = new Dialog()
