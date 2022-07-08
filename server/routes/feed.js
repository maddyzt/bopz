const { response } = require('../app');

const router = require('express').Router();

module.exports = (db) => {

  router.post('/song', (req, res) => {
    if (res.body.id)
    db.query(
      `
      INSERT INTO songs (name, artist) 
      VALUES (${res.body.songName}, ${res.body.artistName});
      `
    )
  })

  return router;
}
