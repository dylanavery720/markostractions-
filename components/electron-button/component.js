module.exports = {
  minutes: (e)=> {
    e.preventDefault()
    let viewer = document.querySelector('.viewer')
    viewer.innerHTML = window.location.href='https://en.wikipedia.org/wiki/Special:Random'
  },
  hours: ()=> {
    console.log('Hours')
  },
  days: ()=> {
    console.log('Days')
  }
}
