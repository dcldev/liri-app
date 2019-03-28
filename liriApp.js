require("dotenv").config();

//Constants We Need to RUN the Application
const axios = require('axios');
const moment = require('moment');
var fs = require("fs");

//Spotify API requirements
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


//Spotify API Validation Test

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }

//   console.log(data.tracks.items); 
//   });

//Getting Values for Terminal Interaction and storing in variable for shorthand.
var userInputs = process.argv;
console.log(userInputs);

//Inputs will be stored in two variables for array position 2 and position 3 : we will be using ES6 javascript
var firstCommand = userInputs[2],
  secondCommand = userInputs[3];
console.log("This is the first command " + firstCommand);
console.log("This is the second command " + secondCommand);

//creating the function to run the application LIRI

runLIRI(firstCommand, secondCommand);

function runLIRI(firstCommand, secondCommand) {

  switch (firstCommand) {
    case "concert-this":
      concertThis(secondCommand);
      //add commandline dialog
      break;
    case "spotify-this-song":
      spotifyThis(secondCommand);
      //add commandline dialog
      break;
    case "movie-this":
      omdbThis(secondCommand);
      //add commandline dialog
      break;
    case "who-is-your-daddy":
      whoIsYourDaddy();
      //add commandline dialog
      break;
    default:
      console.error(`
          I'M SORRY I DON'T UNDERSTAND WHAT YOU ENTERED, DO THIS
          *********************************************
          node liri concert-this 'artist or band name'
          node liri spotify-this 'song name goes here'
          node liri movie-this 'movie name goes here'
          node liri who-is-your-daddy`);
      break;
  }
}

function whoIsYourDaddy() {

  fs.readFile("./heyliri.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
  });

}

function spotifyThis(input) {

  let spotifyResponse = input.trim().replace(/\s/g, '+');

  spotify.search({
    type: 'track', query: spotifyResponse}, function (err, data) {
    
    if (err) {
      return console.log('Error occurred: ' + err);
    }

      let results = data.tracks.items;
     
      console.log(`Results for <${input.toUpperCase()}>`)
      for (var i = 0; i < results.length; i++) {
      let album = results[i].album;

      // printHeader(i + 1);
      console.log(`Artist(s): ${album.artists[0].name}`);
      console.log(`Title: ${results[i].name}`);
      console.log(`Album: ${album.name}`);
      console.log(`Sample URL: ${album.external_urls.spotify}`);
    }
  
  });
} {
  console.error("Incorrect input for spotify-this-song. So you get Hanson's 'MmmBop'");
  spotifyThis("MmmBop by Hanson");
}