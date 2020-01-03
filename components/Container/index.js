import util from '../../helper/util'
import './index.scss'

let containerShowCounts = 0
let maskShowCounts = 0

let $container = null
let $maskEl = null

// 初始化容器组件
init()

export const $mask = {
  el: $maskEl,
  cbs: [],
  onclick(fn) {
    this.cbs.push(fn)
  },
  offclick(fn) {
    this.cbs = this.cbs.filter((item) => item !== fn)
  }
}

// faskclick
util.fastclick($maskEl, (e) => {
  $mask.cbs.forEach(cb => {
    cb(e)
  })
})

export function showContainer() {
  containerShowCounts += 1
  util.showEle($container)
}

export function showContainerWithMask(){
  maskShowCounts += 1
  util.showEle($maskEl)
  showContainer()
  util.fadeIn($maskEl)
}

export function hideContainer() {
  containerShowCounts -= 1
  if (containerShowCounts === 0) {
    util.hideEle($container)
  }
}

export function hideContainerWithMask() {
  maskShowCounts -= 1

  if (maskShowCounts === 0) {
    util.fadeOut($maskEl, () => {
      util.hideEle($maskEl)
      hideContainer()
    })
  }
}

export function append(node) {
  $container.appendChild(node)
}

function init() {
  $container = document.createElement('div')
  $maskEl = document.createElement('div')
  util.addClass($container, 'container')
  util.addClass($maskEl, 'mask')
  append($maskEl)

  util.hideEle($container)
  util.hideEle($maskEl)
  document.body.appendChild($container)
}
