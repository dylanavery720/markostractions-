require('marko/node-require').install();
const electron = require('electron')
const remote = electron.remote
const mainProcess = remote.require('./main')
const template = require('./components/view.marko');

template.renderSync({ name:'Devin aka D Diddy Bop and her lousy band of miscreants' })
    .appendTo(document.body);
