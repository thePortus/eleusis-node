(function() {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const { Pool, Query } = require('pg');
  const path = require('path');
  const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/eleusis';

  const pool = new Pool({
    connectionString: connectionString
  });

  /* Read basic info of all institutions */
  router.get('/', (req, res, next) => {
    // Send app index page
    res.sendFile(
      path.join(
        __dirname, '..', '..', 'client', 'views', 'api.html'
      )
    );
  });


  module.exports = router;

})();
