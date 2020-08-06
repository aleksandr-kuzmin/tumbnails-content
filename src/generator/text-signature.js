import { rand } from '../math'
import { generateRectangleData } from './rectangle'

export const generateTextSignatureData = (
  pageSize,
  maxSize,
  minSize,
  maxFontSize,
  minFontSize
) => {
  const rectangle = generateRectangleData(pageSize, maxSize, minSize)
  const fontSize = rand(maxFontSize, minFontSize)
  return { fontSize, ...rectangle }
}
