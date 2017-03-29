module.exports = {
  minutes: (e)=> {
    e.preventDefault()
    window.location.href='https://en.wikipedia.org/wiki/Special:Random'
  },
  hours: ()=> {
    console.log('Hours')
  },
  days: ()=> {
    console.log('Days')
  }
}
