
var http = require("http")

var app = http.createServer(function(request, response) {
  response.end('hi');
});

app.listen(8000);

console.log("> app running at: http://127.0.0.1:8000/");