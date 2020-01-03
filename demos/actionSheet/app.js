import * as uikit from '../../components'

// (function () {
//   uikit.actionsheet('标题', [
//     {
//       text: '选项一',
//       onSelect: function (result) {
//         console.log(result)
//       }
//     },
//     {
//       text: '选项二',
//       disabled: true
//     }
//   ])
// })()

btn.addEventListener('click', () => {
  uikit.actionsheet('标题', [
    {
      text: '选项一',
      onSelect(idx) {
        console.log(`idx: ${idx}`)
      }
    },
    {
      text: '选项二',
      disable: true
    },
    {
      text: '选项三',
      destructive: true,
      onSelect(idx, text) {
        console.log(`idx: ${idx}, text: ${text}`)
      }
    }
  ], () => {
    alert('取消啦')
  })
})
