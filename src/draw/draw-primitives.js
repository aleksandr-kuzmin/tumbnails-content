export const clear = (ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export const fillRect = (ctx, x, y, width, height, fillColor, fillAlpha) => {
  ctx.fillStyle = `#${fillColor}`
  ctx.globalAlpha = fillAlpha
  ctx.fillRect(x, y, width, height)
}

export const fillText = (ctx, x, y, fontSize, fontColor, fontFamily, text) => {
  ctx.font = `${fontSize}px ${fontFamily}`
  ctx.fillStyle = `#${fontColor}`
  ctx.globalAlpha = 1
  ctx.fillText(text, x, y)
}
