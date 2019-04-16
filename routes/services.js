const express = require('express');
const fs = require('fs');

const router = express.Router();

let results;
fs.readFile('json/services.json', 'utf8', (err, data) => {
  if (err) {
    throw err;
  } else {
    results = JSON.parse(data);
  }
});

/* GET services page. */
router.get('/', (req, res) => {
  res.render('services', {
    title: 'Services',
    services: results,
  });
});

module.exports = router;
