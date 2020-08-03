onmessage = (e) => {
  const fontFace = new FontFace('PermanentMarker', 'url(\'../fonts/PermanentMarker-Regular.ttf\')')
  fontFace.load().then(() => {
    this.fonts.add(fontFace)
    const ctx = e.data.getContext('2d')
    ctx.lineWidth = 10
    ctx.strokeRect(75, 140, 150, 110)
    ctx.fillRect(130, 190, 40, 60)
    ctx.beginPath()
    ctx.moveTo(50, 140)
    ctx.lineTo(150, 60)
    ctx.lineTo(250, 140)
    ctx.closePath()
    ctx.stroke()

    ctx.font = '50px PermanentMarker'
    ctx.fillStyle = "orangered";
    ctx.textBaseline = "top";
    ctx.fillText('Some text', 300, 100)
  }).catch((err) => {
    console.log(err)
  })
}
