var http = require('http');
var app = http.createServer(function(request, response) {
  response.end('hi');
});
app.listen(8000)