var request = require("regular-request");
var jpegExtractor = require("jpeg-extractor");
var fileOnWrite = require('file-on-write');

var url = 'http://root:123@127.0.0.1:11164/axis-cgi/mjpg/video.cgi';

var je = jpegExtractor().on('image', function (image) {
    //console.log('--> ' + image.toString('hex'));
});

var cnt = 0;
var fow = new fileOnWrite({
    filename: function () {
        return 'file_' + (cnt++);
    },
    path: '_output/',
    ext: '.jpg'
});

request(url).pipe(je).pipe(fow);