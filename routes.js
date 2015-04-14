var tumblr = require('./controllers/tumblrtags');

module.exports = {
	index: function(req, res) {
		res.render('search');
	},
	tumblr: function (req, res){
		res.render('search');
	},
	results: function (req, res){
		tumblr(req.params.tag, function(yyz){ 
			//console.log(yyz)
			res.render('index',{
				list:yyz
			});
			
		});
	}

}