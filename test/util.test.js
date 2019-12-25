import util from '../helper/util'
import conf from '../components/config'

test('trim', () => {
  expect(util.trim('')).toBe('')
  expect(util.trim(' main container ')).toBe('main container')
})

test('clsPrefixed', () => {
  let cls = 'mask'
  expect(util.clsPrefixed(cls)).toBe(`${conf.libName}-${cls}`)
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
  expect(oDiv.className).toBe([ 'main', 'content', 'foo', `${conf.libName}-${cls}` ].join(' '))
})

test('rmClass', () => {
  let oDiv = document.createElement('div')
  oDiv.className = ' main content foo   '
  const cls = 'foo'
  util.addClass(oDiv, cls)
  util.rmClass(oDiv, cls)
  expect(oDiv.className).toBe([ 'main', 'content', 'foo' ].join(' '))
})
