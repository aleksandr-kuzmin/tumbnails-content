import 'url-polyfill';
import 'core-js/modules/es.promise'
import { draw } from './draw/draw'
import { clear } from './draw/draw-primitives'
import { main } from './main'
import { performanceTest } from './performance-test'

const DEFAULT_PAGE_SIZE = {
  width: 872,
  height: 1158.6
}

const PAGE_SIZE = DEFAULT_PAGE_SIZE

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

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const clearButton = document.getElementById('clear-button')
  const drawButton = document.getElementById('draw-button')
  const log = document.getElementById('log')

  initCanvasSize(canvas, DEFAULT_CANVAS_SCALE)

  const type = getSearchParameter('type')
  if (!type) {
    main(PAGE_SIZE, drawButton)
  } else {
    performanceTest(type, PAGE_SIZE, canvas, (t) => {
      log.value += t + '\n'
      console.log(t)
    }, parseInt(getSearchParameter('n'), 10)).then((drawElements) => {
      drawButton.onclick = () => {
        drawElements()
        console.log('draw')
      }

      drawElements()
    })
  }

  clearButton.onclick = () => {
    clear(canvas.getContext('2d'))
    console.log('clear')
  }
}
