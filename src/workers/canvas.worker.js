console.log('canvas-worker: load')

function clear(ctx, width, height) {
  ctx.clearRect(0, 0, width, height)
  postMessage('canvas-worker: clear')
}

function drawHouse(ctx) {
  ctx.fillStyle = "black";
  ctx.lineWidth = 10
  ctx.strokeRect(75, 140, 150, 110)
  ctx.fillRect(130, 190, 40, 60)
  ctx.beginPath()
  ctx.moveTo(50, 140)
  ctx.lineTo(150, 60)
  ctx.lineTo(250, 140)
  ctx.closePath()
  ctx.stroke()
  postMessage('canvas-worker: drawHouse')
}

function drawText(ctx) {
  ctx.font = '50px PermanentMarker'
  ctx.fillStyle = "orangered";
  ctx.textBaseline = "top";
  ctx.fillText('Some text', 300, 100)
  postMessage('canvas-worker: drawText')
}

function draw(ctx) {
  drawHouse(ctx)
  drawText(ctx)
}

onmessage = (e) => {
  switch (e.data.type) {
    case 'init':
      self.offscreen = e.data.offscreen
      postMessage('canvas-worker: init')
      break
    case 'clear':
      const ctx = self.offscreen.getContext('2d')
      clear(ctx, self.offscreen.width, self.offscreen.height)
      break
    case 'draw':
      if (self.fonts.size > 0) {
        draw(self.offscreen.getContext('2d'))
      } else {
        const fontFace = new FontFace('PermanentMarker', 'url(\'../fonts/PermanentMarker-Regular.ttf\')')
        fontFace.load().then((font) => {
          self.fonts.add(font)
          draw(self.offscreen.getContext('2d'))
        })
      }
      break
  }
}
