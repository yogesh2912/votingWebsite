var express = require('express');
var router = express.Router();

var passport=require('passport');

var Player=require('../model/player');
var User=require('../model/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'GoVote' });
});
router.get('/user/signup',function(req,res,next){
	var messages=req.flash('error');
  res.render('user/signup',{messages:messages,hasError:messages.length>0});
});

router.post('/signup',passport.authenticate('local.signup',{
	successRedirect:'/user/profile',
	failureRedirect:'/user/signup',
	failureFlash:true
}));


router.get('/user/login',function(req,res,next){
	var messages=req.flash('error');
  //res.render('user/login');
  res.render('user/login',{messages:messages,hasError:messages.length>0});
});

router.post('/login',passport.authenticate('local.signin',{
	successRedirect:'/user/profile',
	failureRedirect:'/user/login',
	failureFlash:true
}));
router.get('/user/profile',isLoggedIn,function(req,res,next){
	res.render('user/profile',{name:req.user.email});
	
})

router.get('/logout',function(req,res,next){
	req.logout();
	res.redirect('/');
});

router.get('/players',function(req,res){
	Player.find(function(err,docs){
		var playerChunks = [];
    	var chunkSize = 3;
    	for(var i=0; i<docs.length; i+=chunkSize) {
      		playerChunks.push(docs.slice(i, i+chunkSize));
    	}
    	res.render('players', { title: 'Players',players:playerChunks });
    });
});

router.get('/players/:id',function(req,res){
	var playerId=req.params.id;
	Player.findById(playerId,function(err,player){
		console.log(player);
		res.render('about',{content:player});
	});
   
});

router.get('/vote/:id',isLoggedIn1,function(req,res){
	var rem='suruat';
	var candidate='';
	var noOfV=0;
	var playerId=req.params.id;

	
	Player.findById(playerId,function(err,player){
		candidate=player.name;
		noOfV=player.noOfVotes;
		perform();
	});
	function perform(){
		console.log(candidate);
		console.log(req.user.email);
		console.log(noOfV);
		User.findOne({'email':req.user.email},function(err,user){
			if(err) throw err;
			console.log("see");
			console.log(user);
			if(!user.isVPlayer){
					Player.updateOne({name:candidate},{$set:{noOfVotes:noOfV+1}},function(err,dd){
					if(err) throw err;
					rem='Thanx for voting';
					console.log("Successfully updated");
					res.render('done',{mess:rem});
				});
			}
			else{
				rem='You have already Voted';
				res.render('done',{mess:rem});
			}
			User.updateOne({email:req.user.email},{$set:{isVPlayer:1,bestPlayer:candidate}},function(err,df){
				if(err) throw err;
				console.log("updated");
			});
			
		});
		
	}
	
	

	
});
router.get('/resultPlayers',function(req,res){
	Player.find().sort( {noOfVotes: 1}).exec(function(err,cursor){
		console.log(cursor);
		res.render('resultPlayer',{data:cursor});
	} );
	
});
router.get('/myprofile',isLoggedIn,function(req,res){
	User.findById(req.user.id,function(err,daa){
		console.log(daa);
		res.render('myprofile',{data:daa});
	});
	
});
module.exports = router;

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}

function isLoggedIn1(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/user/login');
}
