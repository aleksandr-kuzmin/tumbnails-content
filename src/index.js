// import Worker from 'worker-loader!./canvas.worker.js'
// import Worker from './canvas.worker'

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const button  = document.getElementById('button')
  const worker = new Worker('./src/canvas.worker.js')
  var offscreen = canvas.transferControlToOffscreen()
  worker.postMessage({ type: 'init', offscreen }, [offscreen])
  button.onclick = () => {
    worker.postMessage({ type: 'draw' })
  }
}
