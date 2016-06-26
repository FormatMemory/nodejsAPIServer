var http = require('http')
var map = require('through2-map')

var server = http.createServer(function (req, res) {
  if (req.method != 'POST')
    return res.end('Please send me a POST\n')

  req.pipe(map(function (chunk) {
    //use module require jason from ....
    //convert and formating ---> req
    return chunk.toString().toUpperCase()
  })).pipe(res)
})

//you can mannually set a port to run this server
server.listen(Number(process.argv[2]))
