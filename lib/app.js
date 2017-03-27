var helloComponent = require('./hello');

helloComponent.renderSync({ name:'Marko' })
    .appendTo(document.body);
