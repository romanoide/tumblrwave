var express = require('express');
var exphbs = require('express-handlebars');
var http = require('http');
var routes = require('./routes');


var app = express();
var port = process.env.PORT || 8080;

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.disable('etag');

//mongoose.connect('mongodb://localhost/test');

app.get('/', routes.index)

app.get('/tumblr',routes.tumblr);

app.get('/tumblr/:tag',routes.results);


app.get('/', function(req, res){
	res.sendFile('/public/bin/index.html',{ root: __dirname });
});

app.use(express.static(__dirname + '/public/bin'));
console.log(__dirname+'/public/bin');

var server = http.createServer(app).listen(port, function() {
  console.log('Express server listening on port ' + port);
});

