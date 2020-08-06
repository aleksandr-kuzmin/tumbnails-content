import { rand } from '../math'

export const generateCurveSignatureData = (pageSize) => {
  const x = Math.floor(rand(pageSize.width - 200))
  const y = Math.floor(rand(pageSize.height - 200))
  return { x, y }
}
