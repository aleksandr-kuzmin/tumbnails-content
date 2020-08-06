import { rand } from '../math'

export const generateTextData = (pageSize, maxFontSize, minFontSize) => {
  const x = rand(pageSize.width - 100)
  const y = rand(pageSize.height - 100)
  const fontSize = rand(maxFontSize, minFontSize)
  const text = 'sign'
  return { x, y, fontSize, text }
}
