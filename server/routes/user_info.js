const router = require("express").Router();
const { spotifyApi } = require("../helpers/spotify");

module.exports = () => {
  router.post("/", (req, res) => {
    // Each route must set the access token, API fetch will be rejected otherwise
    spotifyApi.setAccessToken(req.body.sessionToken);

    spotifyApi
      .getMe()
      .then((data) => {
        console.log("User Data", data.body);
        res.send(data);
      })
      .catch((err) => {
        console.log(err);
        console.log("This is the token: ", req.query.token);
        res.status(err.statusCode).send(err);
      });
  });

  return router;
};
