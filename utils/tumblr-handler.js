var TumblrPost = require ('../models/Post');

module.exports = function (stream){
	var tpost ={
		blog_name: data['blog_name'],
		id: data['id'],
		post_url: data['post_url'],
		slug: data['slug'],
		timestamp: data['timestamp'],
		state: data['state'],
		format: data['format'],
		reblog_key: data['reblog_key'],
		tags: data['tags'],
		short_url: data['short_url']
	}

	var postEntry = new TumblrPost(tpost);


}