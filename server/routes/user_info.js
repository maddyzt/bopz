const router = require('express').Router();
const SpotifyWebApi = require('spotify-web-api-node');
const spotifyApi = new SpotifyWebApi();



module.exports = () => {

  router.post('/', (req, res) => {
    // Each route must set the access token, API fetch will be rejected otherwise
    spotifyApi.setAccessToken(req.body.sessionToken);

    spotifyApi.getMe()
      .then(
        function (data) {
          console.log(data)
          res.send(data)
        }
      )
      .catch((err) => {
        console.log('This is the error:', err)
        console.log('This is the token: ', req.query.token)
      })
  });

  return router;
}