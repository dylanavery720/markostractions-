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
    alerty()
  }
}
