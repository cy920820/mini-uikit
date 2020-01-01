import * as uikit from '../../components'
import util from '../../helper/util'

const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
  console.log(1)
  uikit.loading.show()

  setTimeout(() => {
    uikit.loading.hide()
  }, 2500)
})
