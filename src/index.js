import { draw } from './draw/draw'
import { generateColor } from './generator/palette'
import { generateRectangleData } from './generator/rectangle'
import { generateTextData } from './generator/text'
import { generateTextSignatureData } from './generator/text-signature'
import { createHighlight } from './primitives/create-highlight'
import { createText } from './primitives/create-text'
import { createTextSignature } from './primitives/create-text-signature'

// import highlight from './samples/highlight.json'
// import text from './samples/text.json'

const DEFAULT_PAGE_SIZE = {
  width: 872,
  height: 1158.6
}

const PAGE_SIZE = DEFAULT_PAGE_SIZE
const MAX_SIZE = { width: 100, height: 100 }
const MIN_SIZE = { width: 100, height: 100 }

const DEFAULT_CANVAS_SIZE = {
  width: 142,
  height: 188
}

const initCanvasSize = (canvas, scale) => {
  canvas.width = DEFAULT_CANVAS_SIZE.width * scale
  canvas.height = DEFAULT_CANVAS_SIZE.height * scale
}

const DEFAULT_CANVAS_SCALE = 3
const DEFAULT_ELEMENTS_COUNT = 1000

const getN = () => {
  const url = new URL(window.location)
  return parseInt(url.searchParams.get('n'), 10)
}

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const clearButton = document.getElementById('clear-button')
  const drawButton = document.getElementById('draw-button')

  initCanvasSize(canvas, DEFAULT_CANVAS_SCALE)

  const n = getN() || DEFAULT_ELEMENTS_COUNT
  const elements = []
  // for (let i = 0; i < n; i++) {
  //   const color = createColor()
  //   const { x, y, width, height } = generateRectangleData(PAGE_SIZE, MAX_SIZE, MIN_SIZE)
  //   const highlight = createHighlight(color, x, y, width, height)
  //   elements.push(highlight)
  // }
  for (let i = 0; i < n; i++) {
    const color = generateColor()
    const { x, y, width, height, fontSize } =
      generateTextSignatureData(PAGE_SIZE, MAX_SIZE, MIN_SIZE, 72, 12)
    const signature = createTextSignature(x, y, width, height, fontSize, 'Arial', color, 'sign')
    elements.push(signature)
  }

  const drawElements = () => {
    draw(canvas, PAGE_SIZE.width, PAGE_SIZE.height, elements)
  }

  clearButton.onclick = () => {
    draw(canvas, 0, 0, [])
    console.log('clear')
  }

  drawButton.onclick = () => {
    drawElements()
    console.log('draw')
  }

  drawElements()
}
