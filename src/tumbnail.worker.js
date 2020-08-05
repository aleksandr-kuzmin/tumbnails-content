function clear(ctx) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

function drawRect(ctx, x, y, width, height, fillColor, fillAlpha) {
  ctx.fillStyle = `#${fillColor}`
  ctx.globalAlpha = fillAlpha
  ctx.fillRect(x, y, width, height)
}

let index = 0
let offscreens = new Map()

function addCanvas(data) {
  const { index, offscreen } = data
  offscreens.set(index, offscreen)
}

function drawHighlight(ctx, x, y, width, height, content) {
  const { fillColor, fillAlpha } = content
  drawRect(ctx, x, y, width, height, fillColor, fillAlpha)
}

const elementHandlers = {
  'highlight': drawHighlight
}

function draw(data) {
  const { index, width, height, elements } = data
  if (!offscreens.has(index)) {
    return
  }
  const offscreen = offscreens.get(index)
  const ctx = offscreen.getContext('2d')
  const scale = {
    x: offscreen.width / width,
    y: offscreen.height / height
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
      handler(ctx, x, y, width, height, content)
    }
  }
}

const messageHandlers = {
  'add-canvas': addCanvas,
  'clear': clear,
  'draw': draw
}

onmessage = (e) => {
  const { data } = e
  const handler = messageHandlers[data.type]
  if (handler) {
    handler(data)
  }
}
