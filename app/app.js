require("./style.css");

var Flickr = require('./services/Flickr');

var flickr = new Flickr();

flickr.search('batman', function (data) {
    console.log(data);
}, function (error) {
    console.log(error);
});