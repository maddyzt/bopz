const { response } = require('../app');

const router = require('express').Router();

module.exports = (db) => {

  // the song endpoint adds Shazamed song to the songs table and posts table
  router.post('/song', (req, res) => {
    let tagId = "";
    let userId;
    db.query(
    `SELECT * FROM songs WHERE song_url = $1;`, [req.body.songURL]
    )
    // data is the song info for 1 song
    .then(data => {

      // only adds song to posts table if song exists already
      if (data.rows[0]) {
        userId = req.body.userId;
        console.log('req body userid', req.body)
        tagId = req.body.id;
        console.log('song exists')
          db.query(`SELECT id FROM songs WHERE song_url = $1;`, [req.body.songURL])
  
          .then(data => {
  
            console.log('after selecting existing song id', data.rows[0])
            let queryStringPost = `INSERT INTO posts (song_id, user_id, tag_id)
            VALUES ($1, $2, $3) RETURNING *;`
            db.query(queryStringPost, [data.rows[0].id, userId, tagId])
          
  
          .then(data => {
  
            console.log('after insert into posts', data);
            res.json(data);
          })
        .catch(err => {
          console.log(err);
        })
      })
      // adds song to songs and posts table if song does not exist
      } else if (!data.rows[0]) {
        userId = req.body.userId;
        tagId = req.body.id;
        console.log('song does not exist')
        console.log ('db query empty, adding song');
        // insert into the songs table
        let queryStringSong = `INSERT INTO songs (song_name, song_artist, song_url, album, cover_art)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`
        db.query(queryStringSong, [req.body.songName, req.body.songArtist, req.body.songURL, req.body.albumName, req.body.coverArt])
        .then(data => {
  
          console.log('after insert into songs', data.rows[0])
          let queryStringPost = `INSERT INTO posts (song_id, user_id, tag_id)
          VALUES ($1, $2, $3) RETURNING *;`
          db.query(queryStringPost, [data.rows[0].id, userId, tagId])
          
  
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

  router.post('/user', (req, res) => {
    queryParams = [req.body.username]
    queryString = `SELECT * from users WHERE username = $1;`
    db.query(queryString, queryParams)
    .then (data => {
      console.log('/user data endpoint response', data)
      res.json(data);
    })
  });

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

  router.post('/date', (req, res) => {
    queryParams = [req.body.id]
    queryString = `SELECT to_char(created_at AT TIME ZONE 'America/New_York', 'Month DD YYYY HH24:MI') AS created_at FROM posts WHERE tag_id = $1;`
    db.query(queryString, queryParams)
    .then(data => {
      console.log('post to get date', data)
      res.json(data);
    })
  })

  router.post('/posts', (req, res) => {
    console.log('username from posts request', req.body.username);
    queryParams = [req.body.username]
    queryString = `SELECT * FROM posts JOIN songs ON song_id = songs.id JOIN users ON user_id = users.id
    WHERE user_id = (SELECT id FROM users WHERE username = $1) OR user_id IN (
      SELECT followed FROM followers WHERE follower = (SELECT id FROM users WHERE username = $1)) ORDER BY created_at DESC;`
    db.query(queryString, queryParams)
    .then (data => {
      res.json(data);
    })
  })


  router.post('/myposts', (req, res) => {
    console.log('username from posts request', req.body.username);
    queryParams = [req.body.username]
    queryString = `SELECT * FROM posts JOIN songs ON song_id = songs.id JOIN users ON user_id = users.id
    WHERE user_id = (SELECT id FROM users WHERE username = $1);`
    db.query(queryString, queryParams)
    .then (data => {
      res.json(data);
    })
  })

  // router.get('/user', (req, res) => {
  //   console.log('user endpoint reached')
  //   queryString = `SELECT * FROM users WHERE id = 1;`
  //   db.query(queryString)
  //   .then(data => {
  //     res.json(data);
  //   })
  // });

  return router;
}
