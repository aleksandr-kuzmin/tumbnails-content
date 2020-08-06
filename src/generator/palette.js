import { rand } from '../math'

const generagePalette = () => {
  const palette = []
  for (let i = 0; i < 0x10; i++) {
    for (let j = 0; j < 0x10; j++) {
      for (let k = 0; k < 0x10; k++) {
        palette.push(i.toString(16) + j.toString(16) + k.toString(16))
      }
    }
  }
  return palette
}

const PALETTE = generagePalette()

export const generateColor = () => {
  return PALETTE[Math.floor(rand(PALETTE.length))]
}
