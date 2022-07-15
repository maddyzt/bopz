const SpotifyWebApi = require("spotify-web-api-node");

const scopes = [
  "ugc-image-upload",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "streaming",
  "app-remote-control",
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-read-private",
  "playlist-modify-private",
  "user-library-modify",
  "user-library-read",
  "user-top-read",
  "user-read-playback-position",
  "user-read-recently-played",
  "user-follow-read",
  "user-follow-modify",
];

// credentials are optional
const spotifyApi = new SpotifyWebApi({
  clientId: "a18068c5cef44a94a879d8455bf4c855",
  clientSecret: "4fd794840f1c4c2487a292ba8db7c020",
  redirectUri: "http://localhost:3000",
});

const getAuthUrl = () => {
  return spotifyApi.createAuthorizeURL(scopes);
};

module.exports = {
  spotifyApi,
  getAuthUrl,
};
