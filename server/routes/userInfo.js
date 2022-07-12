const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();



module.exports = () => {

  router.get('/', (req, res) => {

    console.log('These are the params for /user:', req.query.token);

    spotifyApi.setAccessToken(req.query.token);

    spotifyApi.getMe()
      .then(
        function (data) {
          console.log('This is the user email:', data.body.email)
          res.send(data.email)
        }
      )
  });

  return router;
}