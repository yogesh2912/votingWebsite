var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var schema =new Schema({
	imagepath:{type:String,required:true},
	name:{type:String,required:true},
	birthplace:{type:String,required:true},
	ODICenturies:{type:Number,required:true},
	TestCenturies:{type:Number,required:true},
	noOfVotes:{type:Number,required:true}
});

var Players=mongoose.model('Player',schema);

module.exports=Players;