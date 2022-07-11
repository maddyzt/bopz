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
      VALUES ($1, $2, $3) RETURNING *;`
      db.query(queryStringSong, [req.body.songName, req.body.songArtist, req.body.songURL])
      .then(data =>{
      // insert into the posts table, getting the most recent song for now...
      console.log(data)
      console.log(data.rows[0])
      let queryStringPost = `INSERT INTO posts (song_id, user_id) 
      VALUES ($1, $2);`
      // hard coding the user ID for now
      db.query(queryStringPost, [data.rows[0].id, 1])
      })
    .catch(err => {
      console.log(err);
    })
      }
    })
  })

  router.get('/user', (req, res) => {
    console.log('endpoint reached')
    queryString = `SELECT * FROM users WHERE id = 1;`
    db.query(queryString)
    .then(data => {
      res.json(data);
    })
  });

  return router;
}
