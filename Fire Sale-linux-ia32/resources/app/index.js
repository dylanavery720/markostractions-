var helloComponent = require('./components/hello.marko');

helloComponent.renderSync({ name:'Marko' })
    .appendTo(document.body);
