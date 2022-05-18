(function() {
  'use strict';
  const express = require('express');
  const router = express.Router();
  const query = require('./query');

  /* === HONORS ROUTES === */

  /* --- READ OPERATIONS ---*/

  /* Read basic info of all honors */
  router.get('/', (req, res, next) => {
    // Read items
    return query.dbSelect(
      res,
      `SELECT
        *
      FROM public."Honor" AS honor
      ORDER BY honor."ID" ASC;`
    );
  });

  /* Read basic info of single honor */
  router.get('/:honor_id', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.honor_id;
    // SQL Query > Select single inscription
    return query.dbSelect(
      res,
      `SELECT
        *
      FROM public."Honor" AS honor
      WHERE honor."ID" = ($1);`,
      [id]
    );
  });

  /* Read inscriptions bearing the honor */
  router.get('/:honor_id/inscriptions', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.honor_id;
    // SQL Query > Select single inscription
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
        honor_inscription."Appearances" AS "Appearances"
      FROM public."Honor in Inscription" AS honor_inscription
        INNER JOIN public."Inscription Full"() AS inscription
          ON honor_inscription."Inscription ID" = inscription."ID"
      WHERE honor_inscription."Honor ID" = ($1);`,
      [id]
    );
  });

  /* Read institution(s) granting the honor */
  router.get('/:honor_id/institutions', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.honor_id;
    // SQL Query > Select single inscription
    return query.dbSelect(
      res,
      `SELECT
        institution."ID" AS "ID",
        institution."Institution" AS "Institution",
        institution."Origin" AS "Origin",
        institution."Category" AS "Category",
        institution."Type" AS "Type"
      FROM public."Institution Honor" AS institution_honor
        INNER JOIN public."Institution" AS institution
          ON institution_honor."Institution ID" = institution."ID"
      WHERE institution_honor."Honor ID" = ($1);`,
      [id]
    );
  });

  /* Read people displaying the honor */
  router.get('/:honor_id/people', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.honor_id;
    // SQL Query > Select single inscription
    return query.dbSelect(
      res,
      `SELECT
        person."ID" AS "ID",
        person."Person" AS "Person",
        public."Earliest Date"(person."ID") AS "Earliest Date",
        person."Origin" AS "Origin",
        person."Category" AS "Category",
        person."Gender" AS "Gender",
        CASE
          WHEN person."Category" = 'Athenian'
           AND person."Roman Citizen" = FALSE THEN 'Athenian without Roman Citizenship'
          WHEN person."Category" = 'Athenian'
           AND person."Roman Citizen" = TRUE THEN 'Athenian with Roman Citizenship'
          ELSE 'Non-Athenian'
        END AS "Person Status",
        person."Family" AS "Family",
        person."Extended" AS "Extended Family",
        concat_ws(' ', person."Praenomen", person."Nomen", person."Cognomen") AS "Roman Nomenclature",
        concat_ws(' ', person."Onomos", person."Patronym") AS "Greek Nomenclature",
        person."Deme" AS "Deme",
        SUM(person_honor."Appearances") AS "Honor Appearances",
        person."Uncertain Person" AS "Uncertain Person"
      FROM public."Person Honor Display" AS person_honor
        INNER JOIN public."Person" AS person
          ON person_honor."Person ID" = person."ID"
      WHERE person_honor."Honor ID" = ($1)
      GROUP BY person."ID"
      ORDER BY person."ID" ASC;`,
      [id]
    );
  });

  /* --- End Read Operations */

  /* === End Honors Routes === */

  module.exports = router;

})();
