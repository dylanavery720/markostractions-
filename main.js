const electron = require('electron')
const fs = require('fs')

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

app.on('ready', ()=> {
  mainWindow = new BrowserWindow()
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', ()=> {
    mainWindow = null
  })
})

const alerty = exports.alerty = ()=> {
  console.log('alert!');
}
