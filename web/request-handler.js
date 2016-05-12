var path = require('path');
var archive = require('../helpers/archive-helpers');

// require more modules/folders here!
var fs = require('fs');
var head = require('./http-helpers');


var mimeTypes = {                 
  '.js' : 'text/javascript',
  '.html': 'text/html',
  ' .css' : 'text/css'
};



exports.handleRequest = function (request, response) {

  var lookup = path.basename(decodeURI(request.url)) || 'index.html';
  //var lookup = request.url;

  var f = __dirname + '/public/' + lookup;
  console.log("dirname is ", __dirname);
  fs.readFile(f, 'utf8', function (err, data) {

    if (data) {
    var headers = {'Content-type': mimeTypes[path.extname(lookup)]};
      response.writeHead(200, headers);
      //console.log(data);
      response.end(data);
      if (err) { 
        response.writeHead(500); 
        response.end('Server Error!'); 
      }
    } else {
      response.writeHead(404); //no such file found!
      response.end();
    }
    if (request.method === 'GET' && request.url === '/') {
      console.log("lookup is", lookup);
      console.log("f is", f);
      console.log(request.method);
      console.log(request.url);
      console.log(head.headers);
      response.writeHead(200, headers);
      console.log(data);
      
      response.end(data);
      //response.write(data);

    }

  });

};


      


  // fs.exists(f, function (exists) {
  //   if (exists) {
 //res.end(archive.paths.list);


