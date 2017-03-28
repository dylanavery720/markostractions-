require('marko/node-require').install();

var helloComponent = require('./components/hello.marko');

helloComponent.renderSync({ name:'Devin aka D Diddy Bop and her lousy band of miscreants' })
    .appendTo(document.body);
