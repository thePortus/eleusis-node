(function() {
  'use strict';

const express = require('express');

const { Pool, Query } = require('pg');

// Creating connection with credentials set by environment variables....
const pool = new Pool({
  user: process.env.PGUSER ||'postgres',
  host: process.env.PGHOST || 'localhost',
  port: process.env.PGPORT || '5432',
  database: process.env.PGDATABASE || 'eleusis-dev',
  password: process.env.PGPASSWORD || '',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000
});

module.exports = {
  pool: pool,
  Query: Query
};

})();
