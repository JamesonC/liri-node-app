// credentials for Spotify API
require("dotenv").config();

// call for Spotify API
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// axios import to make http requests
var axios = require("axios");

// requiring packages
var fs = require("fs");
var moment = require('moment');

// variables for command line arguments
var operand = process.argv[2];
var nodeArgs = process.argv;
var input = "";

// for loop that takes in multiple node CLIs
for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        input = input + "+" + nodeArgs[i];
    } else {
        input += nodeArgs[i];
    }
}

// switch statement that executes user input
switch (operand) {
    case 'movie-this':
        movieThis();
        break;

    case 'concert-this':
        bandsInTown();
        break;

    case 'spotify-this-song':
        spotifyThis();
        break;

    case 'do-what-it-says':
        doWhatItSays();
        break;

    default:
        console.log('Sorry! Allowed commands are movie-this, concert-this, spotify-this-song, and/or do-what-it-says');
}

// reads file within random.txt and executes appropriate function
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data);

        var dataArr = data.split(",");

        operand = dataArr[0];
        input = dataArr[1];

        switch (operand) {
            case 'movie-this':
                movieThis();
                break;

            case 'spotify-this-song':
                spotifyThis();
                break;

            case 'concert-this':
                bandsInTown();
                break;

            default:
                console.log('Sorry!');
        }

    });

}

function spotifyThis() {
    spotify
        .search({
            type: 'track',
            query: input
        })
        .then(function (response) {
            for (var k = 0; k < response.tracks.items.length; k++) {
                console.log("---------------------");
                console.log("Artist: ", response.tracks.items[k].artists[0].name);
                console.log("Song Name: ", response.tracks.items[k].name);
                console.log("Preview Link: ", response.tracks.items[k].external_urls.spotify);
                console.log("Album Name: ", response.tracks.items[k].album.name);
                console.log("---------------------");
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function movieThis() {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
            function (response) {
                console.log("---------------------");
                console.log("Title: " + response.data.Title);
                console.log("Release Year: " + response.data.Year);
                console.log("IMBD Rating: " + response.data.imdbRating);
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
                console.log("Country Produced: " + response.data.Country);
                console.log("Language: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("---------------------");
            })
        .catch(function (error) {
            console.log(error);
        });
}

function bandsInTown() {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(
            function (response) {
                for (var j = 0; j < response.data.length; j++) {
                    let eventDate = response.data[j].datetime;

                    console.log("---------------------");
                    console.log("Name of Venue: " + response.data[j].venue.name);
                    console.log("Venue Location: " + response.data[j].venue.city + ", " + response.data[j].venue.region);
                    console.log("Event Date: ", moment(eventDate).format('LLLL'));
                    console.log("---------------------");
                }
            })
        .catch(function (error) {
            console.log(error);
        });
}