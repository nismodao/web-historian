var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    if (err) {
      callback(err);
    } else {
      console.log('data is', data.split('\n'));
      callback(data.split('\n'));
    }
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', function (err, data) {
    if (err) {
      callback(err);
    } else {
      data = data.split('\n');
      var bool = false;
      data.forEach(function(value) {
        if (value === url) {
          bool = true;
        }
      });
      callback(bool);
    }
  });
};


exports.addUrlToList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    data = data.split('\n');
    if (err) {
      callback(err);
    } else {
      data.push(url);
      callback(data); 
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, function (err, files) {
    var bool = false;
    if (err) {
      bool = false;
    } else {
      if (files.indexOf(url) > -1) {
        bool = true;
      }
    }
    callback(bool);
  });
};

exports.downloadUrls = function(urlArray) {
  urlArray.forEach(function(val) {
    fs.appendFile(exports.paths.archivedSites + '/' + val, val, function(err) {
      if (err) {
        throw err;
      } 
    });
  });
};
  //input = read list url is function so call it -- returns array of urls

  //iterate through array, 
    //write a new file corresponding to the url <-- output









