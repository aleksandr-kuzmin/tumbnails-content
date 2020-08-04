console.log('some-worker: load')

onmessage = (e) => {
  switch (e.data.type) {
    case 'init':
      postMessage('some-worker: init')
      break
    case 'some-message':
      postMessage('some-worker: some-message')
      break
  }
}
