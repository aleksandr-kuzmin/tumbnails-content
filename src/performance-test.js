import 'url-polyfill';

import { draw } from './draw/draw'
import { generateColor } from './generator/palette'
import { generateRectangleData } from './generator/rectangle'
import { generateImageSignatureData } from './generator/image-signature'
import { generateCurveSignatureData } from './generator/curve-signature'
import { generateTextSignatureData } from './generator/text-signature'
import { createHighlight } from './primitives/create-highlight'
import { createTextSignature } from './primitives/create-text-signature'
import { createCurveSignature } from './primitives/create-curve-signature'
import { createImageeSignature } from './primitives/create-image-signature'

const DEFAULT_PAGE_SIZE = {
  width: 872,
  height: 1158.6
}

const PAGE_SIZE = DEFAULT_PAGE_SIZE
const MAX_SIZE = { width: 200, height: 200 }
const MIN_SIZE = { width: 100, height: 100 }

const DEFAULT_ELEMENTS_COUNT = 1000

const highlightCreator = () => {
  const color = generateColor()
  const { x, y, width, height } = generateRectangleData(PAGE_SIZE, MAX_SIZE, MIN_SIZE)
  const highlight = createHighlight(color, x, y, width, height)
  return highlight
}

const textSignatureCreator = () => {
  const color = generateColor()
  const { x, y, width, height, fontSize } =
    generateTextSignatureData(PAGE_SIZE, MAX_SIZE, MIN_SIZE, 72, 12)
  const signature = createTextSignature(x, y, width, height, fontSize, 'Arial', color, 'sign')
  return signature
}

const curveSignatureCreator = () => {
  const { x, y } = generateCurveSignatureData(PAGE_SIZE)
  const signature = createCurveSignature(x, y)
  return signature
}

const imageSignatureCreator = () => {
  const { x, y, width, height } = generateImageSignatureData(PAGE_SIZE, MAX_SIZE.width, MIN_SIZE.width)
  const signature = createImageeSignature(x, y, width, height)
  return signature
}

let elementTypeIndex = 0
const mixedElementCreator = () => {
  const creator = elementCreators[elementTypes[elementTypeIndex]]
  elementTypeIndex = (elementTypeIndex + 1) % elementTypes.length
  return creator()
}

const elementCreators = {
  'mixed': mixedElementCreator,
  'highlight': highlightCreator,
  'text-signature': textSignatureCreator,
  'curve-signature': curveSignatureCreator,
  'image-signature': imageSignatureCreator
}
const elementTypes = Object.keys(elementCreators).filter(t => t != 'mixed')

export const performanceTest = (type, canvas, log, n = DEFAULT_ELEMENTS_COUNT) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function() {
      const elements = []
      const elementCreator = elementCreators[type]
      for (let i = 0; i < n; i++) {
        elements.push(elementCreator())
      }

      const drawElements = () => {
        const prevTime = Date.now()
        draw(canvas, PAGE_SIZE.width, PAGE_SIZE.height, elements, this)
        const t = `${Date.now() - prevTime}ms`
        log(t)
      }

      resolve(drawElements)
    }
    img.src = 'https://dev3.pdffiller.com/flash/data/pics/NDg2MjQ7ODQ1Mjk2NTc=/75f7d658b2f8eb23df15f84db1f685db/0.png'
  })
}
