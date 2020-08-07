import { rand } from '../math'

export const generateImageSignatureData = (pageSize, maxSize, minSize) => {
  const width = Math.floor(rand(maxSize, minSize))
  const height = width
  const x = Math.floor(rand(pageSize.width - width))
  const y = Math.floor(rand(pageSize.height - height))
  return { x, y, width, height }
}
