'use strict';

var ObjectId = require('mongodb').ObjectId; 
var fs =  require('fs');
var formidable = require("formidable");
var form = new formidable.IncomingForm();
form.uploadDir = "./pics";


function LopHandler(db) {

	this.pics= function(req,res) {
		console.log('envinado ',req.path);
		// res.render(process.cwd() + req.path);
		var img = fs.readFileSync(process.cwd() + req.path);
	    res.writeHead(200, {'Content-Type': 'image/gif' });
	    res.end(img, 'binary');
	};
	

	this.like= function(req,res) {
	  var lop = req.body;
      db.collection('lops', function (err, lops) {
      	if (err) throw err;
      	console.log(lop._id,   new ObjectId(lop._id), lop._id ===   ObjectId(lop._id));
      	lops.findOne({ "_id" : new ObjectId(lop._id) },function (err, doc) {
      		doc.likes++;
      		lops.update({ "_id" : new ObjectId(lop._id) },doc);
			res.end(JSON.stringify(doc));
      	});
      });
	};


	this.deleteLop= function(req,res) {
	  var lop = req.body;
      db.collection('lops', function (err, lops) {
      	if (err) throw err;
      	lops.deleteOne({ "_id" : new ObjectId(lop._id) });
      	res.end("");
      });
	};


	this.listLops= function(req,res) {
      db.collection('lops', function (err, lops) {
      	if (err) throw err;
      	lops.find().toArray(function (err, doc) {
      		if (err) throw err;
    	  	res.end(JSON.stringify(doc));
      	})
      });
	};


	this.addLop= function(req,res) {
		form.parse(req, function(err, fields, files) {
		 var lop = fields;
		 lop.picFile = files.picFile;
		 db.collection('lops', function (err, lops) {
		 	if (err) throw err;
		 	// set the imagesource
			lop.imagesrc = lop.image ? lop.image : lop.picFile ? lop.picFile.path : "";
			lops.insert(lop);
			console.log("inserted new lop");
			res.end(JSON.stringify(lop));
		});
		});
	};
}

module.exports = LopHandler;