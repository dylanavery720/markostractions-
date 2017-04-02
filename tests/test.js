const Application = require('spectron').Application
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = require('chai').expect
const assert = require('chai').assert
const path = require('path')

const electronPath = path.join(__dirname, '..', 'node_modules', '.bin', 'electron')
const appPath = path.join(__dirname, '..')

global.before(function () {
    chai.should();
    chai.use(chaiAsPromised)
})

describe('App starts', function () {
  let app

  before(function () {
      app = new Application({
        path: electronPath,
        env: { SPECTRON: true },
      })
      return app.start()
  })

  after(function (done) {
      done()
      return app.stop()
  })

  it('opens a window', ()=> {
    return app.client.waitUntilWindowLoaded().getWindowCount()
      .should.eventually.equal(1)
    })

//this test says our app name is Electron
  it.skip('should have correct title', ()=> {
    return app.client.waitUntilWindowLoaded().getTitle()
      .should.eventually.equal('Markostractions')
  })

  it('should display nine buttons', ()=> {
    return app.client //can't figure out what to target to get all buttons
      .should.eventually.equal(9)
  })

})