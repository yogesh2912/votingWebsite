var PlayerModel=require('../model/player');

var mongoose = require('mongoose');


var url="mongodb://localhost:27017/voting";
mongoose.connect(url,{useNewUrlParser: true})
	.then((db)=>{
	console.log("Connected to database");
	var x=PlayerModel({
		   imagepath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Ajinkya_Rahane_2016.jpg/230px-Ajinkya_Rahane_2016.jpg',
        	name: 'Ajinkya Rahane',
            birthplace: 'Munbai',
            ODICenturies:3,
            TestCenturies:11,
            noOfVotes:35
     });
	x.save()
	.then((data)=>{
		console.log("Data saved");
	})
	.catch((err)=>{
		console.log("Data not saved");
	})
	});

