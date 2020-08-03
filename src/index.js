// import Worker from 'worker-loader!./canvas.worker.js'

window.onload = () => {
  const button = document.getElementById('button')
  const canvas = document.getElementById('canvas')
  if (!button || !canvas) {
    return
  }

  const worker = new Worker('./src/canvas.worker.js')

  const offscreen = canvas.transferControlToOffscreen()
  worker.postMessage({ type: 'context', offscreen }, [offscreen])
}
