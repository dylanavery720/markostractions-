const electron = require('electron')
const fs = require('fs')
const windows = new Set()

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let topWindow = null

const createWindow = exports.createWindow = (url) => {
  let childWindow = new BrowserWindow({parent: topWindow, height: 600, width: 700, title: 'loading...'})
  windows.add(childWindow)
  childWindow.loadURL(url)
  childWindow.on('close', () => {
    childWindow.send('clicked')
 })
}

app.on('ready', ()=> {
  topWindow = new BrowserWindow()
  topWindow.loadURL('file://' + __dirname + '/index.marko')
  topWindow.webContents.openDevTools();
  topWindow.on('closed', ()=> {
    topWindow = null
  })
})
