
jpeg-extractor
==================
  
The module is designed to work with any streams that contains pictures in jpeg format (not only HTTP, like a mjpeg, but also any other).
    
Install
-------------

```
npm install jpeg-extractor
```
  
Example
--------------

Example of extracting images from MJPG stream to the console and written to the directory.
```javascript
var request = require("regular-request");
var jpegExtractor = require("jpeg-extractor");
var fileOnWrite = require('file-on-write');

var url = 'http://root:123@127.0.0.1:11164/axis-cgi/mjpg/video.cgi';

var je = jpegExtractor().on('image', function (image) {
    console.log('--> ' + image.toString('hex'));
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
```


Alternatives
-------------

[mjpeg-consumer](https://github.com/mmaelzer/mjpeg-consumer.git) - I like this project. But unfortunately, it works only with HTTP streams. 
If there are several pictures in the chunk, it does not retrieve them. 
I used this project as a template for my project. Of course, I'm used a different extraction algorithm.


License
-------------
 
 [MIT](LICENSE)
 
