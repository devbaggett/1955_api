var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

var app = express();

app.use(bodyParser.urlencoded({extended: true}));
// configure body-parser
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost/1955_api");

var API1955Schema = new mongoose.Schema({
	name: {type: String, required: true, minlength: 2}
}, {timestamps: true, versionKey: false});

mongoose.model('API1955', API1955Schema);
var API1955 = mongoose.model('API1955');

mongoose.Promise = global.Promise;


// ********************* ROUTES *********************

// index
app.get('/', function(req, res){
	API1955.find({}, function(err, boomers){
		if(err){
			console.log("ERROR: ", err);
			res.json({message: "ERROR", error: err});
		}
		else{
			res.json({boomers})
		}
	})
})

// create
app.get("/new/:name", function(req, res){
	var boomer = new API1955(req.params);
  	boomer.save(function(err, boomer){
		if(err){
			console.log("ERROR: ", err);
			res.json({message: "ERROR", error: err});
		}
		else{
			res.json({message: "Success", data: boomer})
		}
	})
})

// remove
app.get("/remove/:name/", function(req, res){
	API1955.remove({name: req.params.name}, function(err){
		if(err){
			console.log("ERROR: ", err);
			res.json({message: "ERROR", error: err});
		}
		else{
			res.json({message: "Success"})
		}
	});
})

// show user
app.get("/:name/", function(req, res){
	API1955.find({name: req.params.name}, function(err, user){
		if(err){
			console.log("ERROR: ", err);
			res.json({message: "ERROR", error: err});
		}
		else{
			res.json({message: "Success", user: user});
		}
	})
})


var server = app.listen(8000, function(){
	console.log("listening on port 8000");
});