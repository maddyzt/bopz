const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command).then((data) => {
      res.json(data.rows);
    });
  });

  router.get("/songs", (req, res) => {
    console.log("endpoint reached");
    queryString = `SELECT * FROM songs`;
    db.query(queryString).then((data) => {
      shuffleArray(data.rows);
      res.json(data);
    });
  });

  router.post("/following", (req, res) => {
    let username = req.body.friendUsername;
    queryParams = [username]
    queryString = `SELECT COUNT(follower) AS follower_count FROM followers JOIN users ON follower = users.id WHERE
    follower = (SELECT id FROM users WHERE username = $1);`
    db.query(queryString, queryParams)
    .then(data => {
      res.json(data);
  })
})

router.post("/followed", (req, res) => {
  let username = req.body.friendUsername;
  queryParams = [username]
  queryString = `SELECT COUNT(followed) AS followed_count FROM followers JOIN users ON follower = users.id WHERE
  followed = (SELECT id FROM users WHERE username = $1);`
  db.query(queryString, queryParams)
  .then(data => {
    res.json(data);
})
})

  router.post("/likes", (req, res) => {
    let username = req.body.username;
    console.log('username reached backend for likes:', username);
    queryParams = [username]
    queryString = `SELECT likes AS likes_count FROM posts WHERE
    user_id = (SELECT id FROM users WHERE username = $1);`
    db.query(queryString, queryParams)
    .then(data => {
      res.json(data);
  })
  })

  router.post('/follow/status', (req, res) => {
    console.log('follow status usernames', req.body);
    let myUsername = req.body.myUsername;
    let friendUsername = req.body.friendUsername;
    queryParams = [myUsername, friendUsername];
    queryString = `SELECT * FROM followers WHERE follower = (SELECT
      id FROM users WHERE username = $1) AND followed = (SELECT
      id FROM users WHERE username = $2);`
    db.query(queryString, queryParams)
    .then (data => {
      console.log('follow status data', data)
      res.json(data);
    })
  })

  router.post('/follow/add', (req, res) => {
    let myUsername = req.body.myUsername;
    let friendUsername = req.body.friendUsername;
    queryParams = [myUsername, friendUsername];
    queryString = `INSERT INTO followers (follower, followed) VALUES ((SELECT
      id FROM users WHERE username = $1), (SELECT
      id FROM users WHERE username = $2)) RETURNING *;`
    db.query(queryString, queryParams)
    .then (data => {
      res.json(data);
    })
  })

  router.post('/follow/remove', (req, res) => {
    let myUsername = req.body.myUsername;
    let friendUsername = req.body.friendUsername;
    console.log('myusername friendusername', myUsername, friendUsername);

    queryParams = [myUsername, friendUsername];
    queryString = `DELETE FROM followers WHERE follower = (SELECT
      id FROM users WHERE username = $1) AND followed = (SELECT
      id FROM users WHERE username = $2);`
    db.query(queryString, queryParams)
    .then (data => {
      res.json(data);
    })
  })


  router.post("/posts", (req, res) => {
    console.log('req.body.friendUsername', req.body.friendUsername)
    let username = req.body.friendUsername;
    queryParams = [username]
    queryString = `SELECT * FROM posts JOIN songs ON song_id = songs.id JOIN users ON
    user_id = users.id WHERE user_id = (SELECT id FROM users
    WHERE username = $1);`
    db.query(queryString, queryParams)
    .then(data => {
      console.log('posts for profile data', data)
      res.json(data);
  })
  })

  router.post("/comments", (req, res) => {
    console.log('req.body.friendUsername', req.body.friendUsername)
    let username = req.body.friendUsername;
    queryParams = [username]
    queryString = `SELECT *, to_char(created_at AT TIME ZONE 'America/New_York', 'Month DD YYYY HH24:MI') AS date FROM comments JOIN users ON commenter = users.id WHERE commented = (SELECT id FROM users
    WHERE username = $1);`
    db.query(queryString, queryParams)
    .then(data => {
      console.log('comments for profile data', data)
      res.json(data);
  })
  })
  
  router.get('/:id', (req, res) => {
    const username = req.params.id;
    const queryString = `SELECT * FROM users WHERE username = $1;`

    db.query(queryString, [username])
    .then(data => {
      res.json(data);
    })
  })

  return router;
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
