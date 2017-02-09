'use strict';

var UserHandler = require( process.cwd() + "/app/controllers/user.js");
var LopHandler = require( process.cwd() + "/app/controllers/lop.js");


module.exports = function (app, db) {
	var userHandler = new UserHandler(db);
	var lopHandler = new LopHandler(db);

	app.route('/').get(function (req, res) {
		res.render('index.pug');
	});

	app.route('/getUser').get(userHandler.getUser);
	app.route('/loginUser').get(userHandler.loginUser);
	app.route('/signOutUser').get(userHandler.signOutUser);
	app.route('/service/oauth/twitter_callback').get(userHandler.loginUserCallback);

	app.route('/addLop').post(lopHandler.addLop);
	app.route('/listLops').get(lopHandler.listLops);
	app.route('/pics/*').get(lopHandler.pics);	 	
	app.route('/like').post(lopHandler.like);	 	
	app.route('/deleteLop').post(lopHandler.deleteLop);	 	
	 	
	app.route('/favicon.ico').get (function(req, res) {
	    res.sendStatus(204);
	});

	app.route('*').get(function(req,res){ console.log('-----   recusado:' ,req.url);return;});

	// app.route('/api/:id/clicks')
	// 	.get(isLoggedIn, clickHandler.getClicks)
	// 	.post(isLoggedIn, clickHandler.addClick)
	// 	.delete(isLoggedIn, clickHandler.resetClicks);

};
