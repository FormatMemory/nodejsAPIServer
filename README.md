# nodejsAPIServer

The Logic flow looks like this:

####client --request--> Smartcar API --request--> GM API

----------------------------------
###How to run

To run the program, simply run ```node mainServer.js``` in the same folder with ***mainServer.js***.
The default port is 8080. You can easily change it by changing **setPort** variable in ***mainServer.js*** .

###Environment

To run the program, you need **Node.js** installed.
**Express** framework is also needed.
You may also need to install **request** and **body-parser** via ***npm***.

###API

Here are the available calls to this API:

        GET /vehicles/:id
        GET /vehicles/:id/doors
        GET /vehicles/:id/fuel
        GET /vehicles/:id/battery
        POST /vehicles/:id/engine

#####Example:
```
curl 127.0.0.1:8080/1234

curl 127.0.0.1:8080/1234/doors

```


==============================
#####You can also find this project on [my Github](https://github.com/FormatMemory/nodejsAPIServer)


