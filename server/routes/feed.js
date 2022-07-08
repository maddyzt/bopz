const { response } = require('../app');

const router = require('express').Router();

module.exports = (db) => {

  router.post('/song', (req, res) => {
    // only adds the song to the db if it does not exist yet

    db.query(
    `SELECT * FROM songs WHERE song_url = $1;`, [req.body.songURL]
    )
    .then(data => {
      console.log('songexists', data)

      if (!data.rows[0]) {

      console.log ('db query empty, adding song')

      queryString = `INSERT INTO songs (song_name, song_artist, song_url) 
      VALUES ($1, $2, $3);`
      db.query(queryString, [req.body.songName, req.body.songArtist, req.body.songURL])

    .catch(err => {
      console.log(err);
    })
  }})
})

  return router;
}
