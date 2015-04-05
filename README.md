
jpeg-extractor
==================
  
A node.js implementation MJPEG-stream parser into individual frames with JPEG-images

  
Install
-------------

```
npm install jpeg-extractor
```
  
Usage
-------------

```javascript
var request         = require("request");
var jpegExtractor   = require("jpeg-extractor");
request({ url: "http://root:root@127.0.0.1:11111/axis-cgi/mjpg/video.cgi?resolution=800x450&fps=25" })
    .pipe(new jpegExtractor({
        pipeLine: false,     
        send : function (img) {
            console.log('--> '+img.toString('hex'));
        }
    }));
```
  
  
Options
------------

### pipeLine {Boolean}
- default `true`  
Allow write data to the output pipe

### send {Function(data)}
- default - `function(){}` 
Provides a method for processing a buffer with the image out of the stream.
  
  
  
Example
--------------

```javascript
var request         = require("request");
var jpegExtractor   = require("jpeg-extractor");
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
```

License
-------------
 
 [MIT](LICENSE)
 
