const electron = require('electron')
const remote = electron.remote
const mainProcess = remote.require('./main')
const currentWindow = remote.getCurrentWindow()


module.exports = {
  read: (e)=> {
    e.preventDefault()
    mainProcess.createWindow('https://en.wikipedia.org/wiki/Special:Random')
  },
  watch: (e)=> {
    e.preventDefault()
    mainProcess.createWindow('http://random.accessyoutube.org.uk/')
  },
  listen: (e)=> {
    mainProcess.createWindow('https://splice.com/sounds/beatmaker')
  }
  // draw: (e)=> {
  //   window.location.href='https://quickdraw.withgoogle.com/'
  // }
}
