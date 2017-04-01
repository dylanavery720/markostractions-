const electron = require('electron')
const fs = require('fs')
const windows = new Set()

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let topWindow = null

const createWindow = exports.createWindow = (url) => {
  let childWindow = new BrowserWindow({parent: topWindow, height: 300, width: 300});
  windows.add(childWindow)
  childWindow.loadURL(url);
  childWindow.on('close', () => {
    childWindow.send('clicked')
 })
}

app.on('ready', ()=> {
  topWindow = new BrowserWindow()
  topWindow.loadURL('file://' + __dirname + '/index.html')
  topWindow.webContents.openDevTools();
  topWindow.on('closed', ()=> {
    topWindow = null
  })
})

// const alerty = exports.alerty = ()=> {
//   console.log('alert!');
// }
