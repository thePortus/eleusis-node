(function() {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const query = require('./query');

  /* === PEOPLE ROUTES === */

  /* --- READ OPERATIONS ---*/

  /* Read basic info of all people */
  router.get('/', (req, res, next) => {
    // Read items
    return query.dbSelect(
      res,
      `SELECT
        *,
        public."Earliest Date"(person."ID")
      FROM public."Person" AS person
      ORDER BY person."ID" ASC;`
    );
  });

  /* Read basic info of single person */
  router.get('/:person_id', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.person_id;
    // SQL Query > Select single person
    return query.dbSelect(
      res,
      `SELECT
        *,
        public."Earliest Date"(person."ID")
      FROM public."Person" AS person
      WHERE person."ID" = ($1);`,
      [id]
    );
  });

  /* Read all inscriptions on which the person appears */
  router.get('/:person_id/inscriptions', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.person_id;
    // SQL Query > Select single person
    return query.dbSelect(
      res,
      `SELECT
        inscription."ID" AS "ID",
        inscription."IE" AS "IE",
        inscription."Inscription" AS "Inscription",
        inscription."Object Type" AS "Object Type",
        inscription."Inscription Type" AS "Inscription Type",
        inscription."Location" AS "Location",
        inscription."Date" AS "Date",
        inscription."Date Span" AS "Date Span",
        inscription."Word Count" AS "Word Count",
        inscription."Character Count" AS "Character Count",
        inscription."Text" AS "Text",
        inscription."Features" AS "Features",
        inscription."References" AS "References",
        person_inscription."Role" AS "Role"
      FROM public."Person in Inscription" AS person_inscription
        INNER JOIN public."Inscription Full"() AS inscription
          ON person_inscription."Inscription ID" = inscription."ID"
      WHERE person_inscription."Person ID" = ($1)
      ORDER BY inscription."ID" ASC;`,
      [id]
    );
  });

  /* Read all honors which the person holds */
  router.get('/:person_id/honors', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.person_id;
    // SQL Query > Select single person
    return query.dbSelect(
      res,
      `SELECT
        honor."ID" AS "ID",
        honor."Honor" AS "Honor",
        honor."Origin" AS "Origin",
        honor."Category" AS "Category",
        honor."Type" AS "Type",
        SUM(person_honor."Appearances") AS "Appearances"
      FROM public."Person Honor Display" AS person_honor
        INNER JOIN public."Honor" AS honor
          ON person_honor."Honor ID" = honor."ID"
      WHERE person_honor."Person ID" = ($1)
      GROUP BY honor."ID"
      ORDER BY honor."ID" ASC;`,
      [id]
    );
  });

  /* Read all institutions to which theh person belongs */
  router.get('/:person_id/institutions', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.person_id;
    // SQL Query > Select single person
    return query.dbSelect(
      res,
      `SELECT
        institution."ID" AS "ID",
        institution."Institution" AS "Institution",
        institution."Origin" AS "Origin",
        institution."Category" AS "Category",
        institution."Type" AS "Type",
        string_agg(DISTINCT honor."Honor", ', ') AS "Honors Held",
        SUM(person_honor."Appearances") AS "Appearances in an Office"
      FROM public."Person Honor Display" AS person_honor
        INNER JOIN public."Institution Honor" AS institution_honor
          ON person_honor."Honor ID" = institution_honor."Honor ID"
        INNER JOIN public."Institution" AS institution
          ON institution_honor."Institution ID" = institution."ID"
        INNER JOIN public."Honor" AS honor
          ON person_honor."Honor ID" = honor."ID"
      WHERE person_honor."Person ID" = ($1)
      GROUP BY institution."ID"
      ORDER BY institution."ID" ASC;`,
      [id]
    );
  });

  /* --- End Read Operations */

  /* === End People Routes === */

  module.exports = router;

})();
