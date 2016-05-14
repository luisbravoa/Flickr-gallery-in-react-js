console.log('holas');
require("./style.css");

var Flickr = require('./services/Flickr');

var flickr = new Flickr();

flickr.sayHello();