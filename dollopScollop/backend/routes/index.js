var express = require('express');
var router = express.Router();
var bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient(
  6379,
  'dollop-scollop.redis.cache.windows.net',
  { auth_pass: 'OXPysj73RzCOqaxaczbzOTgOQcNELroChnzmvRO2kH4=' }
);

client.on('connect', function() {
  console.log('Redis client connected');
});

client.on('error', function(err) {
  console.log('Something went wrong ' + err);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  // // client.get('KEYS', function(error, result) {
  // //   if (error) {
  // //     console.log(error);
  // //     throw error;
  // //   }
  // //   // const resultObj = JSON.parse(result);
  // //   console.log('GET result ->' + result);
  // });
  res.render('index', { title: 'Express' });
});

module.exports = router;
