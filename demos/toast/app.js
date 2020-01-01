import * as uikit from '../../components'

document.getElementById('btn').onclick = function () {
  uikit.toast.show('是吗', () => {
    alert('结束了')
  })
}
