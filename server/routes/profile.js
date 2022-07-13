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
    let myUsername = req.body.myUsername;
    let friendUsername = req.body.friendUsername;
    queryParams = [myUsername, friendUsername];
    queryString = `SELECT * FROM followers WHERE follower = (SELECT
      id FROM users WHERE username = $1) AND followed = (SELECT
      id FROM users WHERE username = $2);`
    db.query(queryString, queryParams)
    .then (data => {
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

  return router;
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
