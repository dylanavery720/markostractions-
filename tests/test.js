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

  beforeEach(function () {
      app = new Application({
        path: electronPath,
        env: { SPECTRON: true },
      })
      return app.start()
  })

  afterEach(function (done) {
      done()
      return app.stop()
  })

  it('opens a window', ()=> {
    return app.client.waitUntilWindowLoaded().getWindowCount()
      .should.eventually.equal(1)
    })

  it('opens a window', ()=> {
    return app.client.waitUntilWindowLoaded()
      .browserWindow.isVisible().should.eventually.be.true
    })

  it('opens a window', ()=> {
    return app.client.waitUntilWindowLoaded()
      .browserWindow.isDevToolsOpened().should.eventually.be.false
    })

  it('throws an error when no path is specified', function () {
      return new Application().start().should.be.rejectedWith(Error, 'Application path must be a string')
    })

  describe('browserWindow.getBounds()', function () {
    it('gets the window bounds', function () {
      return app.browserWindow.getBounds().should.eventually.deep.equal({
        x: 240,
        y: 78,
        width: 800,
        height: 622
      })
    })
  })

   describe('browserWindow.isFullScreen()', function () {
      it('returns false when the window is not in full screen mode', function () {
        return app.client.browserWindow.isFullScreen().should.eventually.be.false
      })
    })

      describe('waitUntilWindowLoaded()', function () {
        it('waits until the current window is loaded', function () {
          return app.client.waitUntilWindowLoaded()
            .webContents.isLoading().should.eventually.be.false
        })
      })

// 
// //this test says our app name is Electron
//   it.skip('should have correct title', ()=> {
//     return app.client.waitUntilWindowLoaded().getTitle()
//       .should.eventually.equal('Markostractions')
//   })
//
//   it('should display nine buttons', ()=> {
//     return app.client('.grid').children.length
//       .should.eventually.equal(9)
//   })
})
