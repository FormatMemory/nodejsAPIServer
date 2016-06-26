var http = require('http');
var qs = require('querystring');

var server = http.createServer( function(request, response){
  var body = '';
  request.on('data', function(data){
    body += data;
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6) { 
      // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      request.connection.destroy();
    }
  });
  request.on('end', function(err){
    if(err) return console.error(err.message);
    
    var requestContent = 1;
    console.log('['+request.method +']Coming request: '+  body); 
    response.write(body);

     if (result) {
          response.writeHead(200, { 'Content-Type': 'application/json' })
          response.end(JSON.stringify(result))
       } else {
        response.writeHead(404)
        response.end();
      }
  });
  request.on('error', function(err){
    console.log('Problem with request: ' + err.message);
  });
})

server.listen(Number(process.argv[2]));
