const { response } = require('../app');

const router = require('express').Router();

module.exports = (db) => {

  router.post('/song', (req, res) => {
    console.log('this is the feed/song endpoint', req.body)
    // if (res.body.id)
    db.query(
      `
      INSERT INTO songs (song_name, song_artist) 
      VALUES (${req.body.songName}, ${req.body.artistName});
      `
    )
    .catch(err => {
      console.log(err);
    })
  })

  return router;
}
