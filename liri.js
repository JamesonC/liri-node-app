require("dotenv").config();
var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var operand = process.argv[2];
var nodeArgs = process.argv;
var input = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
        input = input + "+" + nodeArgs[i];
    } else {
        input += nodeArgs[i];

    }
}

switch (operand) {
    case 'movie-this':
        movieThis();
        break;

    case 'concert-this':
        bandsInTown();
        break;

    default:
        console.log('Sorry!');
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
                    console.log("---------------------");
                    console.log("Name of Venue: " + response.data[j].venue.name);
                    console.log("Venue Location: " + response.data[j].venue.city + ", " + response.data[j].venue.region);
                    console.log("Date of Event: " + response.data[j].datetime);
                    console.log("---------------------");
                }
            })
        .catch(function (error) {
            console.log(error);
        });
}