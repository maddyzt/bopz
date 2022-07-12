const router = require('express').Router();

module.exports = (db) => {
  //Saves user email to database if it doesn't exist
  router.post('/', (req, res) => {

    let userEmail = req.query.email;
    let userName = req.query.username;

    // Check if user email is in database
    const check = "SELECT id FROM users WHERE email = $1;";
    // Insert user info to database
    const command = "INSERT INTO users (username, email) VALUES ($1, $2);";

    const testCommand = "INSERT INTO users (username, email) VALUES ($1, $2);"

    db.query(check, [userEmail])
      .then((data) => {
        // If results at provided email are empty
        if (data.rows.length === 0) {
          console.log('Email was not present in database')
          // Insert user info into database
          db.query(command, [userName, userEmail])
            .then((secondData) => {
              console.log('Successfully inserted data: ', secondData.rows)
            })
            .catch((err) => {
              console.log(err);
            })
        }

        if (data.rows.length > 0) {
          console.log('Email is present')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  });

  return router;
}