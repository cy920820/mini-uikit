import * as container from '../Container'
import './index.scss'
import util from '../../helper/util'

class ActionSheet {
  constructor(container) {
    this.hideCancel = false
    this.OPTIONS_IDX = 'options-idx'
    this.CANCEL_BTN = 'cancel'
    this.isRendered = false
    this.optionHandlers = []
    this.options = null
    this.$container = container

    const actionSheet = document.createElement('div')
    this.$actionSheet = actionSheet

    util.addClass(actionSheet, 'actionSheet')
    util.fastclick(actionSheet, e => {
      const el = e.target || e.srcElement
      const btnIdx = el.getAttribute(this.OPTIONS_IDX)
      if (!btnIdx) return

      if (btnIdx === this.CANCEL_BTN) {
        this.hide(true)
      } else {
        const btn = this.options[btnIdx]
        if (btn.disable) return
        if (typeof btn.onSelect === 'function') {
          btn.onSelect(btnIdx, btn.text)
        }
        this.cancel()
      }
    })

    this.cancel = this.cancel.bind(this)
  }

  renderTitle(title) {
    let el = document.createElement('div')
    util.addClass(el, 'actionSheet-title')
    el.innerHTML = title
    return el
  }

  renderOptions(options) {
    let el = document.createElement('div')
    util.addClass(el, 'actionSheet-options')

    options.forEach((option, idx) => {
      let node = document.createElement('div')
      util.addClass(node, 'actionSheet-option bd-1px')
      node.setAttribute(this.OPTIONS_IDX, idx)
      node.innerHTML = option.text
      this.optionHandlers[idx] = option.onSelect
      if (option.disable) {
        util.addClass(node, 'actionSheet-disable')
      } else if (option.destructive) {
        util.addClass(node, 'actionSheet-destructive')
      }
      el.appendChild(node)
    })
    return el
  }

  renderCancelBtn(text) {
    let el = document.createElement('div')
    el.innerHTML = text
    el.setAttribute(this.OPTIONS_IDX, this.CANCEL_BTN)
    util.addClass(el, 'actionSheet-option actionSheet-cancel')
    return el
  }

  render(title, options, hideCancel, cancelBtnText) {
    this.$actionSheet.appendChild(this.renderTitle(title))
    this.$actionSheet.appendChild(this.renderOptions(options))
    if (!hideCancel) {
      this.$actionSheet.appendChild(this.renderCancelBtn(cancelBtnText))
    }
    this.$container.append(this.$actionSheet)
    util.hideEle(this.$actionSheet)
  }

  show(title, options, onCancel, hideCancel, cancelBtnText) {
    if (this.isRendered) return

    this.options = options
    this.hideCancel = hideCancel
    this.onCancel = onCancel

    options = options.map(opt => {
      if (typeof opt === 'object') {
        return opt
      }
      else {
        return {
          text: opt,
          disable: false,
          destructive: false
        }
      }
    })

    this.render(title, options, hideCancel, cancelBtnText)

    util.showEle(this.$actionSheet)
    this.$container.showContainerWithMask()
    util.bottomIn(this.$actionSheet)
    this.$container.$mask.onclick(this.cancel)

    this.isRendered = true
  }

  hide(isCancelBtn) {
    if (isCancelBtn && !this.hideCancel && typeof this.onCancel === 'function') {
      this.onCancel()
    }

    this.$container.hideContainerWithMask()
    util.bottomOut(this.$actionSheet, () => {
      util.hideEle(this.$actionSheet)
      this.$actionSheet.innerHTML = ''
      this.isRendered = false
      this.$container.$mask.offclick(this.cancel)
      this.optionHandlers = []
    })
  }

  cancel() {
    this.hide(false)
  }
}

const instance = new ActionSheet(container)

export const actionsheet = function (title, options, onCancel, hideCancel = false, cancelBtnText = '取消') {
  instance.show(title, options, onCancel, hideCancel, cancelBtnText)
}
