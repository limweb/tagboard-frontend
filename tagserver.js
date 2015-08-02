var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

app.use(express.static(path.join(process.cwd(), 'public')));

app.get('*', function(req, res) {
	console.log(req.originalUrl);
	var index = fs.readFileSync('public/index.html');
	res.sendfile('public/index.html', {root: __dirname })
});


var server = app.listen(8080, function() {

});
	