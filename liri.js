// node.js variables
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var fs = require("fs");
var request = require("request");
var dataKeys = require("./keys.js")

// arguments
var action = process.argv[2];
var value = process.argv[3];

// keys
var client = new Twitter({
    consumer_key: dataKeys.twitterKeys.consumer_key,
    consumer_secret: dataKeys.twitterKeys.consumer_secret,
    access_token_key: dataKeys.twitterKeys.access_token_key,
    access_token_secret: dataKeys.twitterKeys.access_token_secret
});
var spotify = new Spotify({
    id: dataKeys.spotifyKeys.clientId_key,
    secret: dataKeys.spotifyKeys.clientSecret_key
});
// spotifyThis funciton
function spotifyThis() {
    spotify.search({ type: 'track', query: value }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (var i = 0; i < 3; i++) {
            console.log(" ");
            console.log("Artist(s): " + data.tracks.items[i].artists[0].name);
            console.log("Song Name: " + data.tracks.items[i].name);
            console.log("Spotify Link: " + data.tracks.items[i].preview_url);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("==================================================" + "\n");
        }
    });
};
// omdb
function movieThis(body) {
    var jsonBody = JSON.parse(body);
    console.log('');
    console.log('Title: ' + jsonBody.Title);
    console.log('Year: ' + jsonBody.Year);
    console.log('IMDb Rating: ' + jsonBody.imdbRating);
    console.log('Rotten Tomatoes Rating: ' + jsonBody.tomatoRating);
    console.log('Country:' + ' ' + jsonBody.Country);
    console.log('Language: ' + jsonBody.Language);
    console.log('Plot: ' + jsonBody.Plot);
    console.log('Actors: ' + jsonBody.Actors);
    console.log("==================================================" + "\n");
};
switch (action) {
    //node liri.js my-tweets
    case 'tweet-me':
        if (action && value) {
            console.log("Only 'node liri.js tweet-me' needed.");
            return;
        }
        client.get('https://api.twitter.com/1.1/statuses/user_timeline.json', { screen_name: 'JustoffLSD', count: 20 }, function(error, tweets, response) {
            tweets.forEach(function(element) {
                console.log(element.text + "\n" + element.created_at);
                console.log("==================================================" + "\n");
            });
        });
        break;
        //node liri.js spotify-this-song
    case 'spotify-this-song':
        if (!value) {
            spotify.search({ type: 'track', query: 'The Sign, Ace of Base' }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log(" ");
                console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name);
                console.log("Song Name: " + data.tracks.items[0].name);
                console.log("Spotify Link: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("==================================================" + "\n");
            });
            return;
        }
        spotifyThis();
        break;
        //node liri.js movie-this
    case 'movie-this':
        if (!value) {
            request("http://www.omdbapi.com/?apikey=40e9cece&t=" + "Mr. Nobody" + '&tomatoes=true&r=json', function(error, response, body) {
                movieThis(body);
            });
            return;
        }
        request("http://www.omdbapi.com/?apikey=40e9cece&t=" + value + '&tomatoes=true&r=json', function(error, response, body) {
            movieThis(body);
        });
        break;
    case 'do-what-it-says':
        fs.readFile('./random.txt', 'utf8', function(err, data) {
            var dataArr = data.split(',');
            value = dataArr[1];
            if (dataArr[0] === "spotify-this-song") {
                spotifyThis(dataArr[1]);
            } else if (dataArr[0] === "movie-this") {
                movieThis(dataArr[1]);
            }
        });
        break;
        //When somehting goes wrong...
    default:
        console.log('... something went vey very wrong');
        break;
};