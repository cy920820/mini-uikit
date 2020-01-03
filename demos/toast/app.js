import * as uikit from '../../components'

document.getElementById('btn').onclick = function () {
  uikit.toast.show('Toast 基本用法', () => {
    alert('执行结束回调')
  })
}
