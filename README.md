# mini-uikit

Mini-Uikit 是基于原生 js 实现，不依赖任何框架，是一款轻量的高频 ui 组件库; 该组件库中目前只封装了 alert, toast, loading, actionSheet 等使用频率较高的组件，使用场景偏向一些简单的 H5 移动端项目，避免为了使用这些组件而引入一个大而全的 UI 库和框架。

## Example

## Getting Started

### Installation

```bash
$ npm install mini-uikit -S
or
$ yarn add mini-uikit -S

```

### Usage

可以通过模块化方式引入

```js
import * as uikit from 'mini-uikit'
import 'mini-uikit/dist/lib.css'

uikit.loading.show()
uikit.toast.showTop('测试')
uikit.actionsheet({/* options */})
uikit.alert('测试', 'test')

```

或直接引入文件，比如使用 CDN

```html
<link href="https://unpkg.com/mini-uikit@0.0.1/dist/lib.css">
<script src="https://unpkg.com/mini-uikit@0.0.1/dist/index.js"></script>

<script>
  uikit.loading.show()
  uikit.toast.showTop('测试')
  uikit.actionsheet({/* options */})
  uikit.alert('测试', 'test')
</script>
```

### API

#### Loading

`uikit.loading.show()`

```js
import * as uikit from 'mini-uikit'

uikit.loading.show()

setTimeout(() => {
  uikit.loading.hide()
}, 2000)
```

#### Toast

`uikit.toast.showCenter(options)`

options:

- content: `string` 必选
- time: number 显示多少毫秒，默认 1500，可选
- cb: 消失后的回调，可选

```js
import * as uikit from 'mini-uikit'

// demo 1.
uikit.toast.showTop('test')

// demo 2.
uikit.toast.showCenter('test', 5000)

// demo 3.
uikit.toast.showBottom('test', () => {
// do something you want
})
```

#### ActionSheet

`uikit.actionsheet(options)`

options:

- title: `string`， 可选
- options: array 可以操作的选项，必选（option-item 结构：{ text: String, disable: Boolean, onClick: Function }）

```js
import * as uikit from 'mini-uikit'

uikit.actionsheet({
  options: [
    {
      text: 'test1',
      disable: false,
      onClick: (i, text) => {}
    },
    {
      text: 'test2',
      disable: true
    },
    {
      text: 'test3',
      onClick: (i, text) => {
      }
    }
  ],
  title: '测试',
  onClick(i, text) {
    // 没有指定 click 选项的 item 点击回调
  },
  onCancel() {
    // 取消回调
  }
})
```

#### Alert

##### 基础用法

`uikit.alert(title, content, btns)`

options:

- title: `string`， 可选
- content: string，必选
- btns: `array | function`，可选（button 结构：{ text: String, onClick: Function }）

```js
import * as uikit from 'mini-uikit'

// demo 1.
uikit.alert('test1', ' 这只是一个测试')

// demo 2.
uikit.alert(
  'test2',
  '这是另外一个测试',
  [
    { text: '取消', onClick: () => {} },
    { text: '确定', onClick: () => {} }
  ]
)
```

##### 自定义选项

`uikit.alert.config(options)`

options:

- `z-index`：在页面有其他元素的使用了定位并且层级比较高时可以使用这个参数调整 alert 的层级
- `btnText`: 默认按钮的文案是 “确定”，可以通过这个参数修改

```js

uikit.alert.config({
  zIndex: 9999, // alert 的 z-index
  btnText: 'ok' // 默认按钮的文案
})

```
