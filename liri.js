require("dotenv").config();

const fs = require("fs");

const axios = require("axios");
const moment = require("moment");
const keys = require("./keys.js");
const Spotify = require('node-spotify-api')

const spotify = new Spotify(keys.spotify);
var whatever = false;

const action = process.argv[2];
const value = process.argv[3];
cases();
function cases() {
switch (action) {
    case "concert-this":
        concert(value);
        break;

    case "spotify-this-song":
        spotifyThis(value);
        break;

    case "movie-this":
        movie(value);
        break;

    case "do-what-it-says":
    if(!whatever){
        do_what();
    }
        // do_what();
        break;
}}

function concert(artist) {


    // Then run a request with axios to the OMDB API with the movie specified
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            response.data.forEach(function (event) {
                console.log(event.venue.name);
                console.log(event.venue.city);
                console.log(moment(event.datetime).format('MM/DD/YYYY'));
            })
        });

};
function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("Artist: " + data.tracks.items[0].artists[0].name)
        console.log("Song: " + "'" + data.tracks.items[0].name + "'")
        console.log("Preview URL: " + data.tracks.items[0].preview_url)
        console.log("Album: " + data.tracks.items[0].album.name)
        
        // console.log(JSON.stringify(data.tracks.items.album.artists[0].name, null, 2));
        //   console.log(JSON.stringify(data, null, 2));
        
        //   fs.writeFile("songs_data.json", JSON.stringify(data, null, 2), function(err){
        //     console.log(err);
    });

    //       console.log(JSON.stringify(result, null, 2));

};

function movie(movieName) {
    if (movieName === "") {
        axios
            .get("http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                console.log(response.data);
            })
    }
    else {

        axios
            .get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
            .then(function (response) {
                console.log(response.data.Title);
                console.log(response.data.Year);
                console.log(response.data.imdbRating);
                console.log(response.data.Ratings[1].Value);
                console.log(response.data.Country);
                console.log(response.data.Language);
                console.log(response.data.Plot);
                console.log(response.data.Actors);


            })
    };

};
function do_what() {

fs.readFile("random.txt", "utf8", function(error, data) {

  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }
  // We will then print the contents of data
  console.log(data);

  // Then split it by commas (to make it more readable)
  var dataArr = data.split(",");

  // We will then re-display the content as an array for later use.
  console.log(dataArr);

  dataArr[0] = action;
  dataArr[1] = value;
  whatever = true;
  cases();

});

};

