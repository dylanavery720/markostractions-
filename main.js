const electron = require('electron')
const fs = require('fs')
const windows = new Set()

const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow = null

const createWindow = exports.createWindow = () => {
  let newWindow = new BrowserWindow();
  windows.add(newWindow)
  newWindow.loadURL(`file://${__dirname}/index.html`);
  // return newWindow
}

app.on('ready', ()=> {
  mainWindow = new BrowserWindow()
  mainWindow.loadURL('file://' + __dirname + '/index.html')
  mainWindow.webContents.openDevTools();
  mainWindow.on('closed', ()=> {
    mainWindow = null
  })
})

// const alerty = exports.alerty = ()=> {
//   console.log('alert!');
// }
