import { clear, fillRect, fillText, strokeCurve } from './draw-primitives'

function drawHighlight(ctx, x, y, width, height, _scale, content) {
  const { fillColor, fillAlpha } = content
  fillRect(ctx, x, y, width, height, fillColor, fillAlpha)
}

function drawText(ctx, x, y, width, height, scale, content) {
  // NOTE: 0.73 - alphabetic baseline offset for 1.21 line height
  // y += height * 0.73
  const fontSize = Math.floor(content.fontSize * scale.y)
  fillText(ctx, x, y, fontSize, content.fontColor, content.fontFamily, content.text)
}

export function drawTextSignature(ctx, x, y, width, height, scale, content) {
  const fontSize = Math.floor(content.fontSize * scale.y)
  fillText(ctx, x, y, fontSize, content.color, content.fontFamily, content.text)
}

function drawCurveSignature(ctx, x, y, width, height, scale, content) {
  for (let i = 0; i < content.curves.length; i++) {
    const curve = content.curves[i]
    ctx.strokeStyle = `#${curve.color}`
    ctx.lineWidth = curve.lineWidth * scale.x
    ctx.beginPath()
    const size = content.size
    const points = curve.controlPoints
    ctx.moveTo(x + points[0] * size * scale.x, y + points[1] * size * scale.y)
    for (let i = 2; i < points.length; i += 2) {
      ctx.lineTo(x + points[i] * size * scale.x, y + points[i + 1] * size * scale.y)
    }
    ctx.stroke()
  }
}

function drawImageSignature(ctx, x, y, width, height, scale, context, img) {
  ctx.drawImage(img, x, y, width, height)
}

const elementHandlers = {
  'highlight': {
    'none': drawHighlight,
  },
  'text': {
    'none': drawText,
  },
  'signature': {
    'text': drawTextSignature,
    'curve': drawCurveSignature,
    'image': drawImageSignature
  }
}

export const draw = (canvas, width, height, elements, img) => {
  const ctx = canvas.getContext('2d')
  const scale = {
    x: canvas.width / width,
    y: canvas.height / height
  }

  clear(ctx)
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    const handler = elementHandlers[element.type][element.subType]
    if (handler) {
      const { content } = element
      const x = content.x * scale.x
      const y = content.y * scale.y
      const width = content.width * scale.x
      const height = content.height * scale.y
      handler(ctx, x, y, width, height, scale, content, img)
    }
  }
}
