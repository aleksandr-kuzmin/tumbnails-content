export const rand = (max, min = 0) => {
  return Math.random() * (max - min) + min
}
