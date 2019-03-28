require("dotenv").config();

//Constants We Need to RUN the Application
const axios = require('axios');
const moment = require('moment');
let fs = require("fs");

//Spotify API requirements
let keys = require("./keys.js");
let Spotify = require('node-spotify-api');

let spotify = new Spotify(keys.spotify);


//Spotify API Validation Test

// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }

//   console.log(data.tracks.items); 
//   });

//Getting Values for Terminal Interaction and storing in variable for shorthand.
let userInputs = process.argv;
console.log(userInputs);

//Inputs will be stored in two variables for array position 2 and position 3 : we will be using ES6 javascript
let firstCommand = userInputs[2],
  secondCommand = userInputs[3];
console.log("This is the first command " + firstCommand);
console.log("This is the second command " + secondCommand);

//creating the function to run the application LIRI

runLIRI(firstCommand, secondCommand);

function runLIRI(firstCommand, secondCommand) {

  switch (firstCommand) {
    case "concert-this":
      concertThis(secondCommand);
      logger(firstCommand, secondCommand);
      break;
    case "spotify-this-song":
      spotifyThis(secondCommand);
      logger(firstCommand, secondCommand);
      break;
    case "movie-this":
      omdbThis(secondCommand);
      logger(firstCommand, secondCommand);
      break;
    case "who-is-your-daddy":
      whoIsYourDaddy();
      logger(firstCommand, secondCommand);
      break;
    default:
      console.error(`
          I'M SORRY I DON'T UNDERSTAND WHAT YOU ENTERED, DO THIS
          ******************************************************
          node liri concert-this 'artist or band name'
          node liri spotify-this 'song name goes here'
          node liri movie-this 'movie name goes here'
          node liri who-is-your-daddy`);
      break;
  }
}

function printHeader(number) {
  var divider = "*****************************************************************";
  if (number) {
    console.log(`${divider} [${number < 10 ? "0"+number : number }]`);
  } else {
    console.log(`${divider} [//]`);
  }
}

function logger(firstCommand, value) {

  var text = `${firstCommand}, "${value}";`;

  fs.appendFile("logs.txt", text, function (err) {

    if (err) {
      console.log(err);
    } else {

    }

  });
  return false;
}

function whoIsYourDaddy() {

  fs.readFile("./heyliri.txt", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    // Break the string down by comma separation and store the contents into the output array.
    let output = data.split(";");
    //console.log('output',output);
    let random = Math.floor(Math.random() * output.length);
    //console.log('random', random);
    let entry = output[random].split(",");
    let firstCommand = entry[0].trim();
    let secondCommand = entry[1].trim().replace(/\"/g, '');
    printHeader();
    console.log(`loads a heyliri entry <node liri ${firstCommand} "${secondCommand}">`);
    runLIRI(firstCommand, secondCommand);
  });

}



// Spotify search function
function spotifyThis(input) {

  if (input) {

    let spotifyResponse = input.trim().replace(/\s/g, '+');

    spotify.search({
      type: 'track',
      query: spotifyResponse
    }, function (err, data) {
      if (err) {
        return console.log('Error: ' + err);
      }

      let results = data.tracks.items;
      printHeader();
      console.log(`Results for <${input.toUpperCase()}>`)
      for (var i = 0; i < results.length; i++) {
        let album = results[i].album;
        // console.log(results[i]);
        printHeader(i + 1);
        console.log(`Artist(s): ${album.artists[0].name}`);
        console.log(`Title: ${results[i].name}`);
        console.log(`Album: ${album.name}`);
        console.log(`Sample URL: ${album.external_urls.spotify}`);
        printHeader();
      }
    });

  } else {

    console.error("Incorrect input for spotify-this-song. So you get Hanson's 'MmmBop'");
    spotifyThis("MmmBop by Hanson");

  }
}

// Bands in Town Search Function

function concertThis(input) {

  if (input) {
    let artist = input.trim();
    let urlQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(urlQuery)
      .then(function (response) {
        let results = response.data;
        printHeader();
        console.log(`Results for <${artist.toUpperCase()}>`);
        for (var i = 0; i < results.length; i++) {
          let venue = results[i].venue;
          printHeader(i + 1);
          console.log("This is the Venue: " + venue.name);

          console.log("This is the Location of the Venue: " + venue.city + ", " + venue.country);

          console.log("Date of Event: " + moment(results[i].datetime).format('MM/DD/YYYY'));

        }
        printHeader();

      })
      .catch(function (err) {
        console.log(err);
      })
      .then(function () {

      });
  } else {
    console.error("Incorrect input for concert-this");
  }
}