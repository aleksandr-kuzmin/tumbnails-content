console.log('some-worker')

onmessage = (e) => {
  switch (e.data.type) {
    case 'init':
      postMessage('some-worker received init')
      break
    case 'some-message':
      postMessage('some-worker received some-message')
      break
  }
}
