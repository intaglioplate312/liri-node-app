//testing page for twitter

var dataKeys = require("./keys.js");
var twitter = require('twitter');

function myTweets() {
    var client = new twitter(dataKeys.twitterKeys);
    var params = { screen_name: 'JustoffLSD', count: 20 };

    client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', function(error, tweets, response) {
        tweets.forEach(function(element) {
            console.log(element.text + '     ' + "\n" + element.created_at);
            console.log("\n--------------------------------------------------------");
        });
    });
};
myTweets();