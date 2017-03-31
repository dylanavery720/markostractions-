const electron = require('electron')
const remote = electron.remote
const mainProcess = remote.require('./main')
const currentWindow = remote.getCurrentWindow()
