//testing page for OMDB
var request = require('request');
var fs = require("fs");
//var action = process.argv[2];
var value = process.argv[2];


// function movieThis(value) {
//     if (!value) {
//         value = 'Mr. Nobody';

request("http://www.omdbapi.com/?apikey=40e9cece&t=" + 'Crash' + '&tomatoes=true&r=json', function(error, response, body) {
    if (error) {
        return console.error(error);
    }

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