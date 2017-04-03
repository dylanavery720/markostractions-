const electron = require('electron')
const fs = require('fs')
const windows = new Set()

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const dialog = electron.dialog;

let topWindow = null

const createWindow = exports.createWindow = (url) => {
  let childWindow = new BrowserWindow({height: 600, width: 700, title: 'loading...'})
  windows.add(childWindow)
  childWindow.loadURL(url)
  topWindow.hide()
  childWindow.on('close', () => {
    const result = dialog.showMessageBox(childWindow, {
      type: 'warning',
      title: 'close this distraction?',
      message: 'Do you want another distraction?',
      buttons: [
        'Yes',
        'Quit!'
      ],
      defaultId: 0,
      cancelId: 1
    })
    childWindow.webContents.send('clicked')
    if(result === 1) app.quit()
 })
 childWindow.on('closed', () => {
   topWindow.show()
   windows.delete(childWindow)
   childWindow = null
 });
 return childWindow
}

app.on('ready', ()=> {
  topWindow = new BrowserWindow()
  topWindow.loadURL('file://' + __dirname + '/index.marko')
  topWindow.webContents.openDevTools();
  topWindow.on('closed', ()=> {
    topWindow = null
  })
})
