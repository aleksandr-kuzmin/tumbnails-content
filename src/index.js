import CanvasWorker from './canvas.worker.js'
import SomeWorker from './some.worker.js'

const printWorkerMessage = (e) => {
  console.log(e.data)
}

window.onload = () => {
  const canvas = document.getElementById('canvas')
  const button  = document.getElementById('button')

  const someWorker = new SomeWorker()
  someWorker.onmessage = printWorkerMessage
  someWorker.postMessage({ type: 'init' })

  const worker = new CanvasWorker()
  worker.onmessage = printWorkerMessage
  var offscreen = canvas.transferControlToOffscreen()
  worker.postMessage({ type: 'init', offscreen }, [offscreen])

  button.onclick = () => {
    worker.postMessage({ type: 'draw' })
    someWorker.postMessage({ type: 'some-message' })
  }
}
