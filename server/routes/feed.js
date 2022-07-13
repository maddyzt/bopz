const { response } = require('../app');

const router = require('express').Router();

module.exports = (db) => {

  // the song endpoint adds Shazamed song to the songs table and posts table
  router.post('/song', (req, res) => {
    let tagId = "";
    db.query(
    `SELECT * FROM songs WHERE song_url = $1;`, [req.body.songURL]
    )
    // data is the song info for 1 song
    .then(data => {

      // only adds the song to the songs table if it does not exist yet
      if (data.rows[0]) {

        tagId = req.body.id;
        console.log('song exists')
          db.query(`SELECT id FROM songs WHERE song_url = $1;`, [req.body.songURL])
  
          .then(data => {
  
            console.log('after selecting existing song id', data.rows[0])
            let queryStringPost = `INSERT INTO posts (song_id, user_id, tag_id)
            VALUES ($1, $2, $3) RETURNING *;`
            // hard coding the user ID for now
            db.query(queryStringPost, [data.rows[0].id, 1, tagId])
          
          // insert into the posts table, getting the most recent song for now...
  
          .then(data => {
  
            console.log('after insert into posts', data);
            res.json(data);
          })
        .catch(err => {
          console.log(err);
        })
      })
      
      } else if (!data.rows[0]) {
        tagId = req.body.id;
        console.log('song does not exist')
        console.log ('db query empty, adding song');
        // insert into the songs table
        let queryStringSong = `INSERT INTO songs (song_name, song_artist, song_url)
        VALUES ($1, $2, $3) RETURNING *;`
        db.query(queryStringSong, [req.body.songName, req.body.songArtist, req.body.songURL])
        .then(data => {
          // insert into the posts table, getting the most recent song for now...
  
          console.log('after insert into songs', data.rows[0])
          let queryStringPost = `INSERT INTO posts (song_id, user_id, tag_id)
          VALUES ($1, $2, $3) RETURNING *;`
          // hard coding the user ID for now
          db.query(queryStringPost, [data.rows[0].id, 1, tagId])
          
  
          .then(data => {
  
            console.log('after insert into posts', data);
            res.json(data);
          })
        .catch(err => {
          console.log(err);
        })
      })
      }
    })
  })

  router.post('/likes/update', (req, res) => {
    console.log('update reqbody', req.body)
    queryParams = [req.body.id, req.body.likes]
    queryString = `UPDATE posts SET likes = $2 WHERE tag_id = $1 RETURNING *;`
    db.query(queryString, queryParams)
    .then(data => {
      res.send(data);
      console.log('likes update successful:', data);
    })
    .catch (err => {
      console.log(err);
    })
  })

  router.post('/likes', (req, res) => {
    queryParams = [req.body.id]
    queryString = `SELECT likes FROM posts WHERE tag_id = $1;`
    db.query(queryString, queryParams)
    .then(data => {
      console.log('post to select all likes is successful', data)
      res.json(data);
    })
  })

  router.get('/posts', (req, res) => {
    // queryParams = [req.body.username]
    // hard coding user for now
    queryString = `SELECT * FROM posts JOIN songs ON song_id = songs.id JOIN users ON user_id = users.id
    WHERE user_id = 1;`
    db.query(queryString)
    .then (data => {
      res.json(data);
    })
  })

  router.get('/user', (req, res) => {
    console.log('user endpoint reached')
    queryString = `SELECT * FROM users WHERE id = 1;`
    db.query(queryString)
    .then(data => {
      res.json(data);
    })
  });

  return router;
}
