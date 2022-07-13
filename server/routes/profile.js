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

  return router;
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
