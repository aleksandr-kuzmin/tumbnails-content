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
}

function drawText(ctx) {
  ctx.font = '50px PermanentMarker'
  ctx.fillStyle = "orangered";
  ctx.textBaseline = "top";
  ctx.fillText('Some text', 300, 100)
}

function draw(ctx) {
  drawHouse(ctx)
  drawText(ctx)
}

onmessage = (e) => {
  switch (e.data.type) {
    case 'init':
      self.offscreen = e.data.offscreen
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
