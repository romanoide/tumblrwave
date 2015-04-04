var tumblr = require('tumblr');
var oauth = {
  consumer_key: 'Zh4CqiwLMyr2OouhtbHRYoJDcTkydZZgqAcEmIShLUp9H2WCMJ',
  consumer_secret: '2x9ZsWZIbYSjAkSeXkkBwAbQgEpKa2rtxFzgSS4banNDDtEhMr',
  token: 'x',
  token_secret: 'y'
};

var tagged = new tumblr.Tagged(oauth);

module.exports = function(tag, next){
	var yyz = [];
	tagged.search(tag, function(error,response){		
		if (error){
			console.log(error);
			throw new Error(error);
		}
		var post;
		
		for (var x=0;x<response.length;x++)
		{
			post = response[x];
			

			//console.log(post['slug']);
			if(post['type']==="photo"){
				var photos = post["photos"];
				var photoSizes = photos[0]["alt_sizes"];
				console.log(photos);
					for (var i = photoSizes.length - 1; i >= 0; i--) {
						if(photoSizes[i]['width']===250){
							yyz[x]={slug:post['slug'],
									image_permalink:photoSizes[i]['url']}

						}
					};				
			}

		}
		next(yyz);
		
	})
	
}