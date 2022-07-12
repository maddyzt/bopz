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

  router.post('/likes/add', (req, res) => {
    console.log(req.body);
  })

  router.post('/likes', (req, res) => {
    queryParams = [req.body.songName, req.body.songArtist, req.body.username]
    queryString = `SELECT likes FROM posts WHERE song_id = (SELECT id FROM songs
      WHERE song_name = $1 AND song_artist = $2) AND user_id = (SELECT id FROM users
      WHERE username = $3);`
    db.query(queryString, queryParams)
    .then(data => {
      res.json(data);
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
