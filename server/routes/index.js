var express = require('express');
var router = express.Router();


module.exports = () => {
  /* GET home page. */
  router.get('/', function (req, res, next) {
    console.log("The index router was called")
    res.render('index', { title: 'Express' });
  });
  return router;
}

// module.exports = router;
