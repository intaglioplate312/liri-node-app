// //testing page for spotify
var Spotify = require('node-spotify-api');
var dataKeys = require("./keys.js");
// var action = process.argv[2];
// var value = process.argv[3];


var spotify = new Spotify({
    id: dataKeys.spotifyKeys.clientId_key,
    secret: dataKeys.spotifyKeys.clientSecret_key

});

spotify.search({ type: 'track', query: 'The Sign, Ace of Base' }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }

    console.log(data);
    for (var i = 0; i < 3; i++) {
        console.log(" ");
        console.log("Artist(s):" + ' ' + data.tracks.items[i].artists[0].name);
        console.log("Song Name:" + ' ' + data.tracks.items[i].name);
        console.log("Spotify Link:" + ' ' + data.tracks.items[i].preview_url);
        console.log("Album:" + ' ' + data.tracks.items[i].album.name);
        console.log("\n--------------------------------------------------------");

    }
});