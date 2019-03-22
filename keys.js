console.log('this is loaded');

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};

// `"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";`
// the `app_id = codingbootcamp` works