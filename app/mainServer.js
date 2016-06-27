var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
var setPort = 8080; //server listen port

// Initialize the app.
var server = app.listen(process.env.PORT || setPort, function () {
    var port = server.address().port;
    console.log('Smartcar API system now running on port', port);
  });

//get vehicle info from GM API
//return json type info
function gmAPIGetter(url, args, next) {
    args['responseType'] = 'JSON';
    request.post({
        url: 'http://gmapi.azurewebsites.net/' + url.replace(/^\//g, ''),
        json: args,
        headers: {
            'Content-Type': 'application/json'
        },

    }, next);
};

/*----------------Get And Get Response-----------------------------------*/
/*------------------------------------------------------------------------*/
//default say hello
app.get('/', function (req, res) {
  res.send('Welcome to smartcar API system.');
});

//get Vehicle Info
//return vin, color, doorCount, driveTrain
app.get('/vehicles/:id', function(req, res) {
    gmAPIGetter('getVehicleInfoService', {
        id: req.params.id
    }, function(error, respond, body) {
       console.log('['+req.method+']'+' Vehicle Info'+' :id = '+ req.params.id);
        if(res == null){
          console.log('No Response');
          return;
        }
        if (body.status != 200||error) {
          console.error('[ERROR]'+' Vehicle Info'+' :id = '+ req.params.id);
            res.status(body.status).json({
                error: body.reason
            });
        } else {
          console.log('Success.\n');
            res.json({
                vin: body.data.vin.value,
                color: body.data.color.value,
                doorCount: body.data.fourDoorSedan.value == 'True' ? 4 : 2,
                driveTrain: body.data.driveTrain.value
            });
        }
    });
});
//

//get Security Info
//return frontLeft, frontRight lock Info
app.get('/vehicles/:id/doors',function(req, res) {
    gmAPIGetter('getSecurityStatusService', {
        id: req.params.id
    }, function(error, response, body) {
      console.log('['+req.method+']'+' Security Info'+' :id = '+ req.params.id);
      if(res == null){
        console.log('No Response');
        return;
      }
      if (body.status != 200||error) {
        console.error('[ERROR]'+' Security Info'+' :id = '+ req.params.id);
          res.status(body.status).json({
              error: body.reason
          });
        } else {
          console.log('Success.\n');
            res.json(body.data.doors.values.map(function(door) {
                return {
                    location: door.location.value,
                    locked: door.locked.value == 'True'
                }
            }));
        }
    });
});

//get Fuel/Battery Range
//return Fuel/battery percentage
app.get('/vehicles/:id/:range(fuel|battery)', function(req, res) {
    gmAPIGetter('getEnergyService', {
        id: req.params.id
    }, function(error, response, body) {
      console.log('['+req.method+']'+req.params.range+' :id = '+ req.params.id);
      if(res == null){
        console.log('No Response');
        return;
      }
      if (body.status != 200||error) {
        console.error('[ERROR]'+req.params.range+' :id = '+ req.params.id);
          res.status(body.status).json({
              error: body.reason
          });
        } else {
          console.log('Success.\n');
            res.json({
                percent: parseFloat(req.params.range == 'fuel' ? body.data.tankLevel.value : body.data.batteryLevel.value)
            });
        }
    });
});


//post Engine Operation in json
//return status: success|error
app.post('/vehicles/:id/engine', function(req, res) {
    console.log('['+req.method+']'+' Engine Operation'+' :id = '+ req.params.id);
    if(res == null){
      console.log('No Response');
      return;
    }
    if (req.body.action != 'START' && req.body.action != 'STOP') {
        res.json({
            error: req.body.action + ' is not a valid action.'
        });
        return;
    }
    gmAPIGetter('actionEngineService', {
        id: req.params.id,
        command: req.body.action == 'START' ? 'START_VEHICLE' : 'STOP_VEHICLE',
    }, function(error, response, body) {
      if (body.status != 200||error) {
        console.error('[ERROR]'+' Engine Operation'+' :id = '+ req.params.id);
          res.status(body.status).json({
              error: body.reason
          });
        } else {
          console.log('Success.\n');
            res.json({
                status: body.actionResult.status == 'EXECUTED' ? 'success' : 'error'
            });
        }
    });
});


//Catch Unknown Endpoint
app.use(function(req, res) {
    console.log('Wrong endpoint...\n');
    res.status(404).json({
        error: 'Wrong endpoint'
    });
});
