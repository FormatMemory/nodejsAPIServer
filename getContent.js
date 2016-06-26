var options = {
    hostname: 'http://gmapi.azurewebsites.net/getVehicleInfoService', 
    port: app.get('port'),
    path: '/users',
    method: 'POST',
    //json: {"name":"John", "lastname":"Doe"}
    jason: {"id": "1234", "responseType": "JSON"}
}
request(options, function(error, response, body){
    if(error) console.log(error);
    else console.log(body);
});
