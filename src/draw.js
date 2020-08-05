import TumbnailDrawWorker from './tumbnail.worker.js'

export const createDraw = () => {
  let worker
  const offscreens = new Map()
  let index = 0
  const draw = (canvas, width, height, elements) => {
    if (!worker) {
      worker = new TumbnailDrawWorker()
    }
    if (!offscreens.has(canvas)) {
      const offscreen = canvas.transferControlToOffscreen()
      offscreens.set(canvas, { index, offscreen })
      worker.postMessage({ type: 'add-canvas', index, offscreen }, [offscreen])
      index++
    }
    const { index: offscreenIndex } = offscreens.get(canvas)
    worker.postMessage({ type: 'draw', index: offscreenIndex, width, height, elements })
  }
  return draw
}
