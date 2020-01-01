import * as container from '../Container'
import util from '../../helper/util'
import './index.scss'

class Loading {
  constructor() {
    this.$wrapper = null
    this.$spinner = null
    this.isInited = false
  }

  show() {
    util.showEle(this.$wrapper)
    container.showContainer()
  }

  hide() {
    util.hideEle(this.$wrapper)
    container.hideContainer()
  }

  init() {
    if (this.isInited) return

    const wrapper = document.createElement('div')
    const spinner = document.createElement('div')
    util.addClass(wrapper, 'loading-circle')
    util.addClass(spinner, 'loading-spinner')
    wrapper.appendChild(spinner)
    container.append(wrapper)
    util.hideEle(wrapper)

    this.$wrapper = wrapper
    this.$spinner = spinner
    this.isInited = true
  }
}

const instance = new Loading()
instance.init()

export const loading = instance

