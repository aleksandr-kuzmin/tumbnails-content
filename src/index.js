// import Worker from 'worker-loader!./canvas.worker.js'
// import Worker from './canvas.worker'

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const worker = new Worker('./src/canvas.worker.js')
  const offscreen = canvas.transferControlToOffscreen()
  worker.postMessage(offscreen, [offscreen])
}
