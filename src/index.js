import CanvasWorker from './canvas.worker.js'

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const button  = document.getElementById('button')
  const worker = new CanvasWorker()
  var offscreen = canvas.transferControlToOffscreen()
  worker.postMessage({ type: 'init', offscreen }, [offscreen])
  button.onclick = () => {
    worker.postMessage({ type: 'draw' })
  }
}
