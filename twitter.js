//testing page for twitter

var dataKeys = require("./keys.js");
var twitter = require('twitter');

function getTweets() {
    var client = new twitter(dataKeys.twitterKeys);
    var params = { screen_name: 'JustoffLSD', count: 20 };

    client.get('statuses/user_timeline', params, function(error, tweets, response) {

        if (!error) {
            var data = []; //empty array to hold data
            for (var i = 0; i < tweets.length; i++) {
                data.push({
                    'Tweets: ': tweets[i].text,
                    'created at: ': tweets[i].created_at,
                });
            }
            console.log(data);
            writeToLog(data);
        }
    });
};