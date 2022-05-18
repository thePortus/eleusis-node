(function() {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const app = express();

  router.get('/', (req, res) => res.status(200).send({
    message: 'Welcome to the Eleusis API v2!',
  }));

  module.exports = router;

})();
