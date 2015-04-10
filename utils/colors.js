var fs      = require('fs');
var request = require('request');
var color = require('dominant-color')
// Or with cookies
// var request = require('request').defaults({jar: true});





module.exports= function(yyz, next){
		var url =  yyz["miniature_link"];
		var filename =url.substring(url.lastIndexOf('/')+1)
		var imagepath ="./public/tmp/"+filename;
		request.get({url: url, encoding: 'binary'}, function (err, response, body) {
		  fs.writeFile(imagepath, body, 'binary', function(err) {
		    if(err)
		      console.log(err);
		    else{
		    	//console.log(filename)
			    color(imagepath, function(err, color){
				  // hex color by default 
				  if(err){
				  	console.log(err)
				  }
				  else{
					  //console.log(color) // '5b6c6e' 
					  //yyz["color"]= color;
					  next(color);
				  }
				})
		    }
		  }); 
		});
	console.log('fin de proceso de colores');
};