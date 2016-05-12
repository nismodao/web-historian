var path = require('path');
var archive = require('../helpers/archive-helpers');

// require more modules/folders here!
var fs = require('fs');
var head = require('./http-helpers');


var mimeTypes = {                 
  '.js': 'text/javascript',
  '.html': 'text/html',
  ' .css': 'text/css'
};



exports.handleRequest = function (request, response) {

  var lookup = path.basename(decodeURI(request.url)) || 'index.html';

  var f = __dirname + '/public/' + lookup;
  if (request.method === 'GET') {
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
      if (request.url === '/') {
        response.writeHead(200, headers);        
        response.end(data);
        //response.write(data);
      } 
    });
  }
  if (request.method === 'POST' && request.url === '/') {
    var data = '';
    var urlList = '';
    response.writeHead(302, head.headers);
    //console.log(response);
    request.on('data', function(chunk) {
      data += chunk;
    });
    request.on('end', function() {
      console.log('Upon end data', data);
      console.log('writeFile path is ', __dirname + '/archives/sites.txt');
      urlList += data.slice(4) + '\n';

      fs.appendFile(archive.paths.list, urlList + '\n', function(err) {

        response.end();
      });
    });
  }
};


      


  // fs.exists(f, function (exists) {
  //   if (exists) {
 //res.end(archive.paths.list);


