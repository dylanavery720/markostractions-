require('marko/node-require').install();

const template = require('./components/view.marko');

template.renderSync({ name:'Devin aka D Diddy Bop and her lousy band of miscreants' })
    .appendTo(document.body);
