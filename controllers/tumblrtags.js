var tumblr = require('tumblr');
var process_colors = require ('../utils/colors')

var oauth = {
  consumer_key:    'Zh4CqiwLMyr2OouhtbHRYoJDcTkydZZgqAcEmIShLUp9H2WCMJ',
  consumer_secret: '2x9ZsWZIbYSjAkSeXkkBwAbQgEpKa2rtxFzgSS4banNDDtEhMr',
  token: 'x',
  token_secret: 'y'
};

var tagged = new tumblr.Tagged(oauth);
var count;


function model(post, yyz,response, next){
	var photos = post["photos"];
	var photoSizes = photos[0]["alt_sizes"];
	var miniature_link;
	var img_link;
	for (var i = photoSizes.length - 1; i >= 0; i--) {
		if(photoSizes[i]['width']===250){
			img_link=photoSizes[i]['url'];								
		}else if(photoSizes[i]['width']===75){
			miniature_link=photoSizes[i]['url'];
		}
	}

	if (img_link){
		yyz.push({slug:post['slug'],
				img_link:img_link,
				miniature_link:miniature_link,
				permalink:post['permalink'],
				colour:'#ace007'});
		process_colors(yyz[yyz.length-1], function(color){
			yyz[yyz.length-1]["colour"]="#"+color;
			responses(response.shift(),response, next, yyz);
		});

	}
	else{
		responses(response.shift(),response, next, yyz);		
	}
}

function responses(post,response,next,yyz){
	

	if(!post){
		next(yyz);
		
	}
	else if(post["type"]==="photo"){
		
			model(post,yyz,response,next)
			//count++;			
			//
	}
	else{
		return responses(response.shift(),response,next,yyz);
	}
}




module.exports = function(tag, next){
	var yyz = [];
	tagged.search(tag, function(error,response){		
		if (error){
			console.log(error);
			throw new Error(error);
		}
		else{
			//console.log(response);
			responses(response.shift(),response, next, yyz);

		}
	})	
}


//