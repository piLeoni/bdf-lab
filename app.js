const { $Font } = require('bdfparser')
const getline = require('readlineiter')
;(async () => {

const font = await $Font(getline("./assets/fonts/Roboto-Medium-6pt.bdf"))
console.log(`This font's global size is \
${font.headers.fbbx} x ${font.headers.fbby} (pixel), \
it contains ${font.length} glyphs.`)


const a = font.glyph('a')
const c = font.glyph('c')
const ac = a
  .draw()
  .crop(6, 8, 1, 2)
  .concat(c.draw().crop(6, 8, 1, 2))
  .shadow()
const ac_8x8 = ac.enlarge(8, 8)
ac_8x8.draw2canvas(document.getElementById('mycanvas').getContext('2d'))


const hello = font.draw('Hello!', {direction: 'rl'}).glow()
hello.draw2canvas(document.getElementById('mycanvas2').getContext('2d'))


const font_preview = font.drawall()
font_preview.draw2canvas(document.getElementById('mycanvas3').getContext('2d'))

})()