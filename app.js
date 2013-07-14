
/**
 * created by : @ichetandhembre
 */

var express = require('express')
  , qs = require('querystring')
  , request = require('request');

var app = express();

var array1 = [];
var appAccessToken;
// all environments
var port =  process.env.PORT || 5000;
console.log(port);

app.listen(port);
var remoteUrl = 'http://consoletweet.herokuapp.com/authtoken';
var localUrl = 'http://justunfollow.net:5000/authtoken'
var  oauth =
    { callback: remoteUrl
        , consumer_key: '5IRnp9TMI1kNQjC9bGQog'
        , consumer_secret: 'enBGmi2iSfBf5d22E1297G9VBjpFrjwcT7mPtFNqDg'
    }
    , url = 'https://api.twitter.com/oauth/request_token'
    ;

app.get('/',function(req,res) {
     	request.post({url:url, oauth:oauth}, function (e, r, body) {
	        var access_token = qs.parse(body)
                appAccessToken = access_token.oauth_token;
                console.log(access_token.oauth_token);  
	       res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token="+access_token.oauth_token); 
       })
});

app.get('/authtoken',function(req,response){
    
    var oauth1 =
     { consumer_key: '5IRnp9TMI1kNQjC9bGQog'
     , consumer_secret: 'enBGmi2iSfBf5d22E1297G9VBjpFrjwcT7mPtFNqDg'
     , token: req.query.oauth_token
     , verifier: req.query.oauth_verifier
     }
     , url = 'https://api.twitter.com/oauth/access_token'
     ;

    request.post({url:url,oauth:oauth1},function(e,r,body){
        var access_token = qs.parse(body);
        array1[access_token.oauth_token] = access_token.oauth_token_secret;
        console.log(access_token.oauth_token)
        response.send("logged in!! run following commond : tweet -a "+access_token.oauth_token);
    });
});

app.get('/sendtweet',function(req,res){
    var oauthtoken = req.query.oauth;
    var tweet = req.query.tweet;
    console.log(tweet)
    var oauth2 = {
        consumer_key: '5IRnp9TMI1kNQjC9bGQog'
        , consumer_secret: 'enBGmi2iSfBf5d22E1297G9VBjpFrjwcT7mPtFNqDg'
        , token: oauthtoken
        , token_secret: array1[oauthtoken]
    }
        , url = 'https://api.twitter.com/1.1/statuses/update.json'
    ;
   request.post({url:url,oauth:oauth2,body:"status="+tweet},function(e,r,body){
        
        if(e) {
          res.send(e);
        }
        body = JSON.parse(body); 
        console.log(body.errors);
       if(body["errors"]) {
       	 res.send(body.errors[0].message);
       } else {
         res.send("tweet sent .."); 
       }
    })


})


process.on('uncaughtException',function(err){
    console.log(err);
    console.log("Closing");
    app.close();
});

process.on('SIGTERM', function(err){
    console.log("Closing");
    app.close();
});

