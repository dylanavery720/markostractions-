// require('marko/node-require').install()
const electron = require('electron')
const remote = electron.remote
const mainProcess = remote.require('./main')
const template = require('./components/view.marko')

template.renderSync()
    .appendTo(document.body);
