import util from '../helper/util'
import { libName } from '../components/config'

test('trim', () => {
  expect(util.trim('')).toBe('')
  expect(util.trim(' main container ')).toBe('main container')
})

test('clsPrefixed', () => {
  let cls = 'mask'
  expect(util.clsPrefixed(cls)).toBe(`${libName}-${cls}`)
})

test('hasClass', () => {
  let oDiv = document.createElement('div')
  oDiv.className = 'main content'
  expect(util.hasClass(oDiv, 'main')).toBe(true)
})

test('clsList', () => {
  let oDiv = document.createElement('div')
  oDiv.className = ' main content foo   '
  expect(util.clsList(oDiv).join('')).toBe([ 'main', 'content', 'foo' ].join(''))
})

test('addClass', () => {
  let oDiv = document.createElement('div')
  oDiv.className = ' main content foo   '
  const cls = 'foo'
  util.addClass(oDiv, cls)
  expect(oDiv.className).toBe([ 'main', 'content', 'foo', `${libName}-${cls}` ].join(' '))
})

test('rmClass', () => {
  let oDiv = document.createElement('div')
  oDiv.className = ' main content foo   '
  const cls = 'foo'
  util.addClass(oDiv, cls)
  util.rmClass(oDiv, cls)
  expect(oDiv.className).toBe([ 'main', 'content', 'foo' ].join(' '))
})

test('hideEle', () => {
  let oDiv = document.createElement('div')
  util.hideEle(oDiv)
  expect(oDiv.className).toBe(`${libName}-hidden`)
})

test('showEle', () => {
  let oDiv = document.createElement('div')
  oDiv.classList.add(`${libName}-hidden`)
  util.showEle(oDiv)
  expect(oDiv.className).toBe('')
})

test('getType', () => {
  const result = util.getType(() => {})
  expect(result).toBe('Function')
})
