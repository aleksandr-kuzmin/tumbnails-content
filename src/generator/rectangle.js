import { rand } from '../math'

export const generateRectangleData = (pageSize, maxSize, minSize) => {
  const width = Math.floor(rand(maxSize.width, minSize.width))
  const height = Math.floor(rand(maxSize.height, minSize.height))
  const x = Math.floor(rand(pageSize.width - width))
  const y = Math.floor(rand(pageSize.height - height))
  return {
    x, y, width, height
  }
}
