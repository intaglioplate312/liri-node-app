//At the top of the `liri.js` file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
var dataKeys = require("./keys.js");
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs'); //file system

//8Make it so liri.js can take in one of the following commands:

//my-tweets
//node liri.js my-tweets
//This will show your last 20 tweets and when they were created at in your terminal/bash window
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

//spotify-this-song
//This will show the following information about the song in your terminal/bash window
//Artist(s)
//The song's name
//A preview link of the song from Spotify
//The album that the song is from
//If no song is provided then your program will default to "The Sign" by Ace of Base.


var spotify = new Spotify({
    id: 'b19cf4c559204e82bb7d2ff12172bacf',
    secret: '93f148e7622b4aadbe0e6603b86010bc'
});

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
});

//movie-this
//This will output the following information to your terminal/bash window:
//* Title of the movie.
//* Year the movie came out.
//* IMDB Rating of the movie.
//* Rotten Tomatoes Rating of the movie.
//* Country where the movie was produced.
//* Language of the movie.
//* Plot of the movie.
//* Actors in the movie.
//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.


request('http://www.google.com', function(error, response, body) {
    console.log('error:', error); // Print the error if one occurred 
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
    console.log('body:', body); // Print the HTML for the Google homepage. 
});

//do-what-it-says
//Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//Feel free to change the text in that document to test out the feature for other commands.
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify') {
                spotifyThis(dataArr[1]);
            }
            if (dataArr[0] === 'omdb') {
                omdbThis(dataArr[1]);
            }
        }
    });

    //Bonus
    //In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
    //Make sure you append each command you run to the `log.txt` file. 
    //Do not overwrite your file each time you run a command