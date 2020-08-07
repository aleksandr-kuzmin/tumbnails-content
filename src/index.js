import 'url-polyfill';

import { draw } from './draw/draw'
import { performanceTest } from './performance-test'

const getSearchParameter = (name) => {
  const url = new URL(window.location)
  return url.searchParams.get(name)
}

const DEFAULT_CANVAS_SIZE = {
  width: 142,
  height: 188
}

const initCanvasSize = (canvas, scale) => {
  canvas.width = DEFAULT_CANVAS_SIZE.width * scale
  canvas.height = DEFAULT_CANVAS_SIZE.height * scale
}

const DEFAULT_CANVAS_SCALE = 2

const defaultMain = () => {
}

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const clearButton = document.getElementById('clear-button')
  const drawButton = document.getElementById('draw-button')
  const log = document.getElementById('log')

  initCanvasSize(canvas, DEFAULT_CANVAS_SCALE)

  const type = getSearchParameter('type')
  if (!type) {
    defaultMain()
  } else {
    performanceTest(type, canvas, (t) => {
      log.value += t + '\n'
      console.log(t)
    }, parseInt(getSearchParameter('n'), 10)).then((drawElements) => {
      clearButton.onclick = () => {
        draw(canvas, 0, 0, [])
        console.log('clear')
      }

      drawButton.onclick = () => {
        drawElements()
        console.log('draw')
      }

      drawElements()
    })
  }
}
