import { clear, fillRect, fillText } from './draw-primitives'

function drawHighlight(ctx, x, y, width, height, _scale, content) {
  const { fillColor, fillAlpha } = content
  fillRect(ctx, x, y, width, height, fillColor, fillAlpha)
}

function drawText(ctx, x, y, width, height, scale, content) {
  // NOTE: 0.73 - alphabetic baseline offset for 1.21 line height
  // y += height * 0.73
  const fontSize = content.fontSize * scale.y
  fillText(ctx, x, y, fontSize, content.fontColor, content.fontFamily, content.text)
}

function drawSignature(ctx, x, y, width, height, scale, content) {
  const fontSize = content.fontSize * scale.y
  fillText(ctx, x, y, fontSize, content.color, content.fontFamily, content.text)
}

const elementHandlers = {
  'highlight': drawHighlight,
  'text': drawText,
  'signature': drawSignature
}

export const draw = (canvas, width, height, elements) => {
  const ctx = canvas.getContext('2d')
  const scale = {
    x: canvas.width / width,
    y: canvas.height / height
  }

  clear(ctx)
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    const handler = elementHandlers[element.type]
    if (handler) {
      const { content } = element
      const x = content.x * scale.x
      const y = content.y * scale.y
      const width = content.width * scale.x
      const height = content.height * scale.y
      handler(ctx, x, y, width, height, scale, content)
    }
  }
}
