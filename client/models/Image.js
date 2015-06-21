var m = require('mithril');

/**
 * Helper function that returns what is passed in
 * @name identity
 * @param {ANY} val - data to pass back out
 * @return {ANY} data passed into identity
 */
var identity = function(val) {
  return val;
};

/**
 * Image class that caches in localStorage
 * @constructor
 * @param {String} url - location of the image
 */
var Image = function (url) {
  // check to see if we have image cached
  var storageLoc = 'image#' + url;
  var self = this;
  this.imgdata = localStorage.getItem(storageLoc);

  if (this.imgData === null) {
    // if no, download and stick in cache
    m.request({
      method: 'GET',
      url: '/image',
      data: {
        url: url
      },
      background: true,
      deserialize: identity
    }).then(function(data) {
      if (data === 'null') {
        throw 'Data coming back from server was null';
      } else {
        localStorage.setItem(storageLoc, data);
        self.imgdata = data;
      }
    });
  }
};

module.exports = Image;
