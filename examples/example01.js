
var request         = require("request");
var jpegExtractor   = require("../lib/jpeg-extractor");
var fileOnWrite     = require('file-on-write');

request({ url: "http://root:root@127.0.0.1:11111/axis-cgi/mjpg/video.cgi?resolution=800x450&fps=25" })
    .pipe(new jpegExtractor({
        send : function (img) {
            console.log('--> '+img.toString('hex'));
        }
    }))
    .pipe(new fileOnWrite({
        path: 'output/',
        ext: '.jpg'
    }));



