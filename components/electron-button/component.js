module.exports = {
  read: (e)=> {
    e.preventDefault()
    let viewer = document.querySelector('.viewer')
    viewer.innerHTML = window.location.href='https://en.wikipedia.org/wiki/Special:Random'
  },
  watch: (e)=> {
    e.preventDefault()
    let viewer = document.querySelector('.viewer')
    viewer.innerHTML = window.location.href='http://random.accessyoutube.org.uk/'
  },
  // days: ()=> {
  //   console.log('Days')
  // }
}
