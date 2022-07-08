const { response } = require('../app');

const router = require('express').Router();

module.exports = (db) => {

  router.post('/song', (req, res) => {
    console.log('this is the feed/song endpoint', req.body)
    // if (res.body.id)
    queryString = `INSERT INTO songs (song_name, song_artist) 
    VALUES ($1, $2);`
    db.query(queryString, [req.body.songName, req.body.songArtist])
    .catch(err => {
      console.log(err);
    })
  })

  return router;
}
