'use strict';
var soc = require('social-oauth-client');
var user = {};

function UserHandler(db) {

	this.getUser = function(req,res) {
		res.end(JSON.stringify(user));
	};

	this.signOutUser = function(req,res) {
		user = {};
		res.end(JSON.stringify(user));
	};


	
	 	
	// Twitter (REPLACE WITH YOUR OWN APP SETTINGS) 
	var twitter = new soc.Twitter({
	  "CONSUMER_KEY": "5DFVarUEswjLCpVprIh2wa3u1",
	  "CONSUMER_SECRET": "OPMNicZEsPbuka1Ooz86nNJkCq1M9AzCh6MFudKFa4OX7fbsyU",
	  "REDIRECT_URL": "https://pinterest-pepetata.c9users.io/service/oauth/twitter_callback"
	});
	 


	this.loginUser = function(req,res) {
	  // twitter OAuth scope is managed by management console. 
	  var url = twitter.getAuthorizeUrl().then(function(url) {
	    res.end(url);
	  }, function(err) {
	    res.send(err);
	  });
	};

	
	this.loginUserCallback = function(req,res) {
	  // delegate to social-oauth-client 
	  twitter.callback(req, res).then(function(u) {
	  	user={id:u.info.id, name:u.info.name, pic: u.info.profile_image_url, logged:true};
	  console.log('chegou de volta');
	    res.redirect('/');
	  }, function(err) {
	    res.send(err);
	  });
	};
	 
	 // {"tokens":{"auth":{"consumer_key":"5DFVarUEswjLCpVprIh2wa3u1","consumer_secret":"OPMNicZEsPbuka1Ooz86nNJkCq1M9AzCh6MFudKFa4OX7fbsyU","token":"3872296041-RogRSBOJYhaiEPdbOZDxbAh5laaSMhUE2DnEJhr","token_secret":"HdCM2zeOPACgsPHr3f6HCCJpJkycrX7iTKe2sJVcJLMvG"},"qs":{"screen_name":"Flavio_L_F","user_id":"3872296041"}},"info":{"id":3872296041,"id_str":"3872296041","name":"FlavioFerreira","screen_name":"Flavio_L_F","location":"","profile_location":null,"description":"","url":"https://t.co/pkcRa24q8i","entities":{"url":{"urls":[{"url":"https://t.co/pkcRa24q8i","expanded_url":"http://www.flavioluizferreira.com.br","display_url":"flavioluizferreira.com.br","indices":[0,23]}]},"description":{"urls":[]}},"protected":false,"followers_count":0,"friends_count":3,"listed_count":0,"created_at":"Mon Oct 05 15:50:50 +0000 2015","favourites_count":0,"utc_offset":-7200,"time_zone":"Brasilia","geo_enabled":false,"verified":false,"statuses_count":0,"lang":"en","contributors_enabled":false,"is_translator":false,"is_translation_enabled":false,"profile_background_color":"000000","profile_background_image_url":"http://abs.twimg.com/images/themes/theme1/bg.png","profile_background_image_url_https":"https://abs.twimg.com/images/themes/theme1/bg.png","profile_background_tile":false,"profile_image_url":"http://pbs.twimg.com/profile_images/829451757675765763/XHYT0N2P_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/829451757675765763/XHYT0N2P_normal.jpg","profile_link_color":"FAB81E","profile_sidebar_border_color":"000000","profile_sidebar_fill_color":"000000","profile_text_color":"000000","profile_use_background_image":false,"has_extended_profile":true,"default_profile":false,"default_profile_image":false,"following":false,"follow_request_sent":false,"notifications":false,"translator_type":"none","suspended":false,"needs_phone_verification":false},"key":"TWITTER_3872296041","platform":"TWITTER"}
	 	



};

module.exports = UserHandler;