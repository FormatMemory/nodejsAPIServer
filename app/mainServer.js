var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var setPort = 3000; //server listen port 

app.use( bodyParser.json() );       // to support JSON-encoded bodies

// Initialize the app.
var server = app.listen(process.env.PORT || setPort, function () {
    var port = server.address().port;
    console.log("Smartcar API system now running on port", port);
  });

//app.listen(port);


// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}


/*-----------------------------------------------------*/
/*-----------------------------------------------------*/
//default say hello
app.get('/', function (req, res, handleError) {
  res.send('Welcome to smartcar API system.');
});

//get Vehicle Info
//return vin, color, doorCount, driveTrain
app.get('/vehicles/:id', function(req, res, handleError) {
  console.log('['+req.method+']'+' Vehicle Info'+' :id = '+ req.params.id);
  //var newVehicle = vehicleInfo(req.params.id);
  res.json(111);
});

//get Security Info
//return frontLeft, frontRight lock Info
app.get('/vehicles/:id/doors', function(req, res, handleError){
  console.log('['+req.method+']'+' Security Info'+' :id = '+ req.params.id);

});

//get Fuel Range
//return fuel percentage
app.get('/vehicles/:id/fuel', function(req, res, handleError){
  console.log('['+req.method+']'+' Fuel Range'+' :id = '+ req.params.id);

})

//get Battery Range
//return battery percentage
app.get('/vehicles/:id/battery', function(req, res, handleError){
  console.log('['+req.method+']'+' Vehicle Info'+' :id = '+ req.params.id);

})

//Post Engin Operation in json
//return status: success|error
app.post('/vehicles/:id/engin', function(req, res, handleError){
  console.log('['+req.method+']'+' Engin Operation'+' :id = '+ req.params.id);
});


