const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();



module.exports = () => {

  router.get('/', (req, res) => {
    // Each route must set the access token, API fetch will be rejected otherwise
    spotifyApi.setAccessToken(req.query.token);

    spotifyApi.getMe()
      .then(
        function (data) {
          console.log(data)
          res.send(data)
        }
      )
  });

  return router;
}