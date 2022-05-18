(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();
  const query = require('./query');

  /* === HONORS ROUTES === */

  /* --- READ OPERATIONS ---*/

  router.get('/', (req, res, next) => {
    var networkList = [
      'sponsor_to_honorand',
      'sponsor_to_person',
      'coappearance'
    ];
    return res.json(networkList);
  });

  /* See info on sponsors and their honorands */
  router.get('/sponsor_to_honorand', (req, res, next) => {
    // Read items
    return query.dbSelect(
      res,
      `SELECT
        *
      FROM public."__ Inscription Sponsorship of Honorand __" AS sponsor_to_honorand
      ORDER BY sponsor_to_honorand."IE" ASC;`
    );
  });

  /* Read basic info of all relations between sponsors and people appearing on their inscriptions */
  router.get('/sponsor_to_person', (req, res, next) => {
    // Read items
    return query.dbSelect(
      res,
      `SELECT
        *
      FROM public."__ Inscription Sponsor and Person Appearing __" AS sponsor_to_person
      ORDER BY sponsor_to_person."IE" ASC;`
    );
  });

  /* Read basic info of all relations between sponsors and people appearing on their inscriptions */
  router.get('/coappearance', (req, res, next) => {
    // Read items
    return query.dbSelect(
      res,
      `SELECT
        *
      FROM public."__ Inscription Co-Appearance __" AS coappearance
      ORDER BY coappearance."IE" ASC;`
    );
  });

  /* --- End Read Operations */

  /* === End Honors Routes === */

  module.exports = router;

})();
