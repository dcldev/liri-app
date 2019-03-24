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
  var firstCommand = userInputs[2], secondCommand = userInputs[3];
  console.log("This is the first command " + firstCommand);
  console.log("This is the second command " + secondCommand);

  //creating the function to run the application LIRI

  runLIRI(firstCommand, secondCommand);

  function runLIRI(firstCommand, secondCommand) {
      
  }