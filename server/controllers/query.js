(function() {
  'use strict';

  const dB = require('./db');


  function dbSelect(res, query_string, query_params) {
    // Performs a select statement either with params or not

    // Called to read list of items in db
    const results = [];
    var query = null;
    dB.pool.connect((err, client, done) => {
      // Handle connection errors
      if (err) {
        done();
        console.log(err);
        return res.status(500).json({success: false, data: err});
      }
      // SQL Query > Select Data
      if(query_params === undefined) {
        query = client.query(new dB.Query(query_string));
      }
      else {
        query = client.query(new dB.Query(query_string, query_params));
      }
      // Stream results back one row at a time
      query.on('row', (row) => {
        results.push(row);
      });
      // After all data is returned, close connection and return results
      query.on('end', () => {
        done();
        return res.json(results);
      });
    });
  }

  module.exports = {
    dbSelect: dbSelect
  };

})();
