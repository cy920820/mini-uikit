import * as uikit from '../../components'
import util from '../../helper/util'

btn.addEventListener('click', () => {
  uikit.dialog.alert('标题', '内容', [
    {
      text: '确定',
      onClick: function () {
        console.log('点击确定')
      }
    }
  ])
})

btn1.addEventListener('click', () => {
  uikit.dialog.confirm('标题', '内容', (result) => {
    alert((function () {
      return result ? '确定' : '取消'
    })())
  })
})

btn2.addEventListener('click', () => {
  uikit.dialog.alert('自定义按钮', '内容', [
    {
      text: '自定义按钮 1',
      onClick: function () {
        console.log('自定义 1')
      }
    },
    {
      text: '自定义按钮 2',
      onClick: function () {
        console.log('自定义 2')
      }
    }
  ])
})
