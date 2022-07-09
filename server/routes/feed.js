const { response } = require('../app');

const router = require('express').Router();

module.exports = (db) => {
  // the song endpoint adds Shazamed song to the songs table and posts table
  router.post('/song', (req, res) => {

    db.query(
    `SELECT * FROM songs WHERE song_url = $1;`, [req.body.songURL]
    )
    .then(data => {
      console.log('songexists')
      // only adds the song to the db if it does not exist yet
      if (!data.rows[0]) {

      console.log ('db query empty, adding song');

      // insert into the songs table
      let queryStringSong = `INSERT INTO songs (song_name, song_artist, song_url) 
      VALUES ($1, $2, $3);`
      db.query(queryStringSong, [req.body.songName, req.body.songArtist, req.body.songURL]);
      
      // insert into the posts table, getting the most recent song for now...
      let queryStringPost = `INSERT INTO posts (song_id, user_id) 
      VALUES ((SELECT id FROM songs ORDER BY id DESC LIMIT 1), $1);`

      // hard coding the user ID for now
      db.query(queryStringPost, [1])
    .catch(err => {
      console.log(err);
    })
      }
    })
  })

  return router;
}
