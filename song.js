//testing page for spotify
var Spotify = require('node-spotify-api');



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