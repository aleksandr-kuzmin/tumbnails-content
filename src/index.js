import { createDraw } from './draw'

import highlight from './samples/highlight.json'

const DEFAULT_CANVAS_SIZE = {
  WIDTH: 142,
  HEIGHT: 188
}

const DEFAULT_PAGE_SIZE = {
  WIDTH: 872,
  HEIGHT: 1158.6
}

const initCanvasSize = (canvas, scale) => {
  canvas.width = DEFAULT_CANVAS_SIZE.WIDTH * scale
  canvas.height = DEFAULT_CANVAS_SIZE.HEIGHT * scale
}

const DEFAULT_CANVAS_SCALE = 3

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const drawButton = document.getElementById('draw-button')

  initCanvasSize(canvas, DEFAULT_CANVAS_SCALE)

  const draw = createDraw()

  drawButton.onclick = () => {
    draw(canvas, DEFAULT_PAGE_SIZE.WIDTH, DEFAULT_PAGE_SIZE.HEIGHT, [highlight])
    console.log('draw')
  }

  draw(canvas, DEFAULT_PAGE_SIZE.WIDTH, DEFAULT_PAGE_SIZE.HEIGHT, [highlight])
}
