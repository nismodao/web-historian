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
    //response.writeHead(302, head.headers);
    //console.log(response);
    request.on('data', function(chunk) {
      data += chunk;
    });
    request.on('end', function() {
      urlList += data.slice(4);
      console.log('Upon end data', urlList);
      fs.writeFile(archive.paths.list, urlList, function(err) {
        archive.isUrlArchived(urlList, function(bool) { 
          //console.log('Result is', result);
          if (bool) {
          //render because page exists
          //use a method that will redirect the page to the inputed urlList
            var f = archive.paths.archivedSites + '/' + urlList;
            console.log('f is', f);
            fs.readFile(f, 'utf8', function (err, data) {
              if (data) {
                console.log('Data from readfile is', data);

                var headers = {'Content-type': mimeTypes['.html']};
                response.writeHead(302, head.headers); //do we need to change the status code?
                response.end(data); 
              }
            });
          } else {
            response.writeHead(302, {'Location': 'http://127.0.0.1:8080/loading.html'});
            response.end();
          }    
            //send them to loading.html
      
        });

      });
    });
  }


};


      
 // response.writeHead(302, {
 //      'Location': 'http://127.0.0.1:8080/loading.html'
 //    });

  // fs.exists(f, function (exists) {
  //   if (exists) {
 //res.end(archive.paths.list);


        //look at the archives/sites directory
        //   if (archive.isUrlArchived(urlList, function(bool){
        //     return bool;
        //   })  {
        //     //render site
        //   }
        // }
          //else send them to the loading page
