const electron = require('electron')
const remote = electron.remote
const mainProcess = remote.require('./main')

module.exports = {
  read: (e)=> {
    e.preventDefault()
    window.location.href='https://en.wikipedia.org/wiki/Special:Random'
  },
  watch: (e)=> {
    e.preventDefault()
    window.location.href='http://random.accessyoutube.org.uk/'
  },
  listen: (e)=> {
    window.location.href='https://splice.com/sounds/beatmaker'
  }
  // draw: (e)=> {
  //   window.location.href='https://quickdraw.withgoogle.com/'
  // }
}
