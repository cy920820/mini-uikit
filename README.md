# mini-uikit

## Introduction

MiniUikit 是基于原生 js 实现，不依赖任何框架，是一款轻量的高频 ui 组件库; 该组件库中目前只封装了 alert, toast, loading, actionSheet 等使用频率较高的组件，使用场景偏向一些简单的 H5 移动端项目，避免为了使用这些组件而引入一个大而全的 UI 库和框架。

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
