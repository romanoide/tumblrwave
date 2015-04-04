var tumblr = require('./controllers/tumblrtags');

module.exports = {
	index: function(req, res) {
		res.render('index');
	},
	tumblr: function (req, res){
		tumblr('cara', function(yyz){ 
			//console.log(yyz)
			res.send('hello world');
		});
	},
	results: function (req, res){
		tumblr(req.params.tag, function(yyz){ 
			console.log(yyz)
			res.render('index',{
				list:yyz
			});
			
		});
	}

}