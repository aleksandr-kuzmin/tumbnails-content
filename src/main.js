import { draw } from './draw/draw'
import { createTextSignature } from './primitives/create-text-signature'

export const main = (pageSize, button) => {
  // setTimeout(() => {
    const drawElements = () => {
      const x = 100
      let y = 100
      const width = null, height = null
      const fontSize = 72
      const fontFamilies = ['NewRockerEot', /* 'NewRockerSvg', */ 'NewRockerTtf', 'NewRockerWoff', 'NewRockerWoff2']
      const color = '000'
      for (let fontFamily of fontFamilies) {
        const signature = createTextSignature(x, y, width, height, fontSize, fontFamily, color, 'Sign')
        const elements = [signature]
        draw(canvas, pageSize.width, pageSize.height, elements, this)
        y += 100
      }
    }

    requestAnimationFrame(drawElements)

    button.onclick = () => {
      requestAnimationFrame(drawElements)
      console.log('draw')
    }
  // }, 1000)
}
