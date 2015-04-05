/*!
 * jpeg-extractor
 *
 * Copyright(c) 2015 Dmitry Rybin <postbox2020@yandex.ru>
 * MIT Licensed
 */


/**
 * Dep`s
 */

var util        = require('util');
var Transform   = require('stream').Transform;


/**
 * Constructor
 *
 * @param opt
 * @returns {JPEGExtractorStream}
 * @constructor
 */

function JPEGExtractorStream(opt) {
    if (!(this instanceof JPEGExtractorStream))
        return new JPEGExtractorStream({});
    Transform.call(this, {readableObjectMode: true});

    var options     = opt || {};
    this.pipeLine  = ('pipeLine' in options) ? !!options.pipeLine : true ;                  // <-- switch-off push method
    this.send      = (typeof options.send === 'function') ? options.send : function () {};  // <-- external defined function

    this._buffer = new Buffer(0);            // <-- work buffer
    this._soi    = new Buffer([0xff, 0xd8]); // <-- start Of image pattern
    this._eoi    = new Buffer([0xff, 0xd9]); // <-- end Of image pattern
}
util.inherits(JPEGExtractorStream, Transform);

/**
 * Find begin idx of jpeg image
 *
 * @param chunk
 * @returns {boolean}
 */

JPEGExtractorStream.prototype._findStart = function(chunk) {
    this.imgStart = chunk.indexOf(this._soi);
    return this.imgStart !== -1
};

/**
 * Find end idx of jpeg image
 *
 * @param chunk
 * @returns {boolean}
 */

JPEGExtractorStream.prototype._findEnd = function(chunk) {
    this.imgEnd = chunk.indexOf(this._eoi);
    if(this.imgEnd !== -1) this.imgEnd += this._eoi.length; // <-- Fix end idx
    return this.imgEnd !== -1
};

/**
 * Work with image
 *
 * @param data
 * @private
 */

JPEGExtractorStream.prototype._send = function(data) {
    this.send(data);                    // <-- send data to external Fn
    if (this.pipeLine) this.push(data); // <-- send data to out of pipe
};

/**
 * Main transform Fn
 *
 * @param chunk
 * @param encoding
 * @param callback
 * @private
 */

JPEGExtractorStream.prototype._transform = function (chunk, encoding, callback) {
    this._buffer = Buffer.concat([this._buffer, chunk]);
    while (this._findStart(this._buffer)) {
        this._buffer = this._buffer.slice(this.imgStart);
        if (this._findEnd(this._buffer)) {
            this._send(this._buffer.slice(0, this.imgEnd)); // <-- push true jpeg
            this._buffer = this._buffer.slice(this.imgEnd)
        } else break;
    }
    callback();
};

/**
 * Exports
 */

module.exports = JPEGExtractorStream;










