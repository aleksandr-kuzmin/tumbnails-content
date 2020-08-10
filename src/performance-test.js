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

const MAX_SIZE = { width: 200, height: 200 }
const MIN_SIZE = { width: 100, height: 100 }

const DEFAULT_ELEMENTS_COUNT = 1000

const highlightCreator = (pageSize) => {
  const color = generateColor()
  const { x, y, width, height } = generateRectangleData(pageSize, MAX_SIZE, MIN_SIZE)
  const highlight = createHighlight(color, x, y, width, height)
  return highlight
}

const textSignatureCreator = (pageSize) => {
  const color = generateColor()
  const { x, y, width, height, fontSize } =
    generateTextSignatureData(pageSize, MAX_SIZE, MIN_SIZE, 72, 12)
  const signature = createTextSignature(x, y, width, height, fontSize, 'Arial', color, 'sign')
  return signature
}

const curveSignatureCreator = (pageSize) => {
  const { x, y } = generateCurveSignatureData(pageSize)
  const signature = createCurveSignature(x, y)
  return signature
}

const imageSignatureCreator = (pageSize) => {
  const { x, y, width, height } = generateImageSignatureData(pageSize, MAX_SIZE.width, MIN_SIZE.width)
  const signature = createImageeSignature(x, y, width, height)
  return signature
}

let elementTypeIndex = 0
const mixedElementCreator = (pageSize) => {
  const creator = elementCreators[elementTypes[elementTypeIndex]]
  elementTypeIndex = (elementTypeIndex + 1) % elementTypes.length
  return creator(pageSize)
}

const elementCreators = {
  'mixed': mixedElementCreator,
  'highlight': highlightCreator,
  'text-signature': textSignatureCreator,
  'curve-signature': curveSignatureCreator,
  'image-signature': imageSignatureCreator
}
const elementTypes = Object.keys(elementCreators).filter(t => t != 'mixed')

export const performanceTest = (type, pageSize, canvas, log, n = DEFAULT_ELEMENTS_COUNT) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function() {
      const elements = []
      const elementCreator = elementCreators[type]
      for (let i = 0; i < n; i++) {
        elements.push(elementCreator(pageSize))
      }

      const drawElements = () => {
        const prevTime = Date.now()
        draw(canvas, pageSize.width, pageSize.height, elements, this)
        const t = `${Date.now() - prevTime}ms`
        log(t)
      }

      resolve(drawElements)
    }
    img.src = 'https://dev3.pdffiller.com/flash/data/pics/NDg2MjQ7ODQ1Mjk2NTc=/75f7d658b2f8eb23df15f84db1f685db/0.png'
  })
}
