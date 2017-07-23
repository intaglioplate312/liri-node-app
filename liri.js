//At the top of the `liri.js` file, write the code you need to grab the data from keys.js. Then store the keys in a variable.
var dataKeys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs'); //file system

var action = process.argv[2];
var value = process.argv[3];


//my-tweets
function myTweets() {
    //pulling keys from file
    var client = new twitter(dataKeys.twitterKeys);
    //show your last 20 tweets and when they were created 
    var params = { screen_name: 'JustoffLSD', count: 20 };

    client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', function(error, tweets, response) {
        tweets.forEach(function(element) {
            console.log(element.text + '     ' + "\n" + element.created_at);
            console.log("\n--------------------------------------------------------");
        });
    });
};

//spotify-this-song

function spotifyThis () {
      //pulling keys from file
    var client = new twitter(dataKeys.twitterKeys);
};
  
//This will show the following information about the song in your terminal/bash window
//Artist(s)
//The song's name
//A preview link of the song from Spotify
//The album that the song is from
//If no song is provided then your program will default to "The Sign" by Ace of Base.

//movie-this
function movieThis(value) {
    var omdbURL = "http://www.omdbapi.com/?apikey=40e9cece&t=";
    //If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.
    if (!value) {
        value = 'Mr. Nobody';

        request(omdbURL + value + '&tomatoes=true&r=json', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                jsonBody = JSON.parse(body);
                console.log('================================================ ');
                console.log('Title: ' + jsonBody.Title);
                console.log('Year: ' + jsonBody.Year);
                console.log('IMDb Rating: ' + jsonBody.imdbRating);
                console.log('Rotten Tomatoes Rating: ' + jsonBody.tomatoRating);
                console.log('Language: ' + jsonBody.Language);
                console.log('Plot: ' + jsonBody.Plot);
                console.log('Actors: ' + jsonBody.Actors);
                console.log('================================================ ');

            };
        });
    };
};
//do-what-it-says
//Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhatItSays() {
    fs.readFile('./random.txt', 'utf8', function(error, data) {
        if (error) {
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify-this-song') {
                spotifyThis(dataArr[1]);
            }
            if (dataArr[0] === 'movie-this') {
                omdbThis(dataArr[1]);
            }
        }
    });
};

switch (action) {
    //node liri.js my-tweets
    case 'my-tweets':
        myTweets();
        break;
    case 'spotify-this-song':
        spotifyThis(value);
        break;
    //node liri.js movie-this
    case 'movie-this':
        movieThis(value);
        break;
    //run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    case 'do-what-it-says':
        doWhatItSays();
        break;
};
//Bonus
//In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.
//Make sure you append each command you run to the `log.txt` file. 
//Do not overwrite your file each time you run a command