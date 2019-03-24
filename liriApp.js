require("dotenv").config();

//Constants We Need to RUN the Application
const axios = require('axios');
const moment = require('moment');
var fs = require("fs");

//Spotify API requirements
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data.tracks.items); 
  });