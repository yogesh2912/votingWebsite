var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');

var userSchema =new Schema({
	//fname:{type:String,required:true},
	//lname:{type:String,required:true},
	email:{type:String,required:true},
	password:{type:String,required:true},
	isVTeam:{type:Number,default:0},
	isVPlayer:{type:Number,default:0},
	bestPlayer: { type: String, default: 'Not available'},
	bestTeam: { type: String, default: 'Not available'}
});

userSchema.methods.encryptPassword=function(password){
	return bcrypt.hashSync(password,bcrypt.genSaltSync(5),null);
};
userSchema.methods.validPassword=function(password){
	return bcrypt.compareSync(password,this.password);
};




module.exports=mongoose.model('User',userSchema);