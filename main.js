const electron = require('electron');
const fs = require('fs');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

let mainWindow = null;

app.on('ready', function () {

  console.log('The application is ready.');

  mainWindow = new BrowserWindow();

  mainWindow.loadURL('file://' + __dirname + '/index.marko');

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
