(function() {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const query = require('./query');

  /* === INSTITUTION ROUTES === */

  /* --- READ OPERATIONS ---*/

  /* Read basic info of all institutions */
  router.get('/', (req, res, next) => {
    // Read items
    return query.dbSelect(
      res,
      `SELECT
        *
      FROM public."Institution" AS institution
      ORDER BY institution."ID" ASC;`
    );
  });

  /* Read basic info of single institution */
  router.get('/:institution_id', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.institution_id;
    // SQL Query > Select a single institution
    return query.dbSelect(
      res,
      `SELECT
        *
      FROM public."Institution" AS institution
      WHERE institution."ID" = ($1);`,
      [id]
    );
  });

  /* Read all honors granted by the institution */
  router.get('/:institution_id/honors', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.institution_id;
    // SQL Query > Select an institution's honors
    return query.dbSelect(
      res,
      `SELECT
        honor."ID" AS "ID",
        honor."Honor" AS "Honor",
        honor."Origin" AS "Origin",
        honor."Category" AS "Category",
        honor."Type" AS "Type"
      FROM public."Institution Honor" AS institution_honor
        INNER JOIN public."Honor" AS honor
          ON institution_honor."Honor ID" = honor."ID"
      WHERE institution_honor."Institution ID" = ($1)
      ORDER BY honor."ID" ASC;`,
      [id]
    );
  });

  /* Read all people with related honors */
  router.get('/:institution_id/honors_people', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.institution_id;
    // SQL Query > Select an institution's honors
    return query.dbSelect(
      res,
      `SELECT DISTINCT
        honor."ID" AS "Honor ID",
        person."ID" AS "Person ID",
        person."Person" AS "Person",
        public."Earliest Date"(person."ID") AS "Person Earliest Date",
        person."Origin" AS "Person Origin",
        person."Category" AS "Person Category",
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
        person."Uncertain Person" AS "Uncertain Person"
      FROM public."Institution Honor" AS institution_honor
        INNER JOIN public."Honor" AS honor
          ON institution_honor."Honor ID" = honor."ID"
        INNER JOIN public."Person Honor Display" as person_honor
          ON honor."ID" = person_honor."Honor ID"
        INNER JOIN public."Person" as person
          ON person."ID" = person_honor."Person ID"
      WHERE institution_honor."Institution ID" = ($1)
      ORDER BY honor."ID" ASC;`,
      [id]
    );
  });

  /* Read all inscriptions sponsored by the institution */
  router.get('/:institution_id/inscriptions', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.institution_id;
    // SQL Query > Select an institution's inscriptions
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
        inscription."References" AS "References"
      FROM public."Institution Sponsorship" AS institution_inscription
      INNER JOIN public."Inscription Full"() AS inscription
        ON institution_inscription."Inscription ID" = inscription."ID"
      WHERE institution_inscription."Institution ID" = ($1);`,
      [id]
    );
  });

  /* Read all inscriptions sponsored by the institution */
  router.get('/:institution_id/inscriptions_people', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.institution_id;
    // SQL Query > Select an institution's inscriptions
    return query.dbSelect(
      res,
      `SELECT
        inscription."ID" AS "Inscription ID",
        person."ID" AS "Person ID",
        person."Person" AS "Person",
        public."Earliest Date"(person."ID") AS "Person Earliest Date",
        person."Origin" AS "Person Origin",
        person."Category" AS "Person Category",
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
        person."Uncertain Person" AS "Uncertain Person"
      FROM public."Institution Sponsorship" AS institution_inscription
      INNER JOIN public."Inscription Full"() AS inscription
        ON institution_inscription."Inscription ID" = inscription."ID"
      INNER JOIN public."Person in Inscription" as person_inscription
        on inscription."ID" = person_inscription."Inscription ID"
      INNER JOIN public."Person" as person
        on person."ID" = person_inscription."Person ID"
      WHERE institution_inscription."Institution ID" = ($1);`,
      [id]
    );
  });

  /* Read all people holding institution offices */
  router.get('/:institution_id/officers', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.institution_id;
    // SQL Query > Select an institution's officers
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
        string_agg(DISTINCT honor."Honor", ', ') AS "Offices Held",
        SUM(person_honor."Appearances") AS "Appearances in an Office",
        person."Uncertain Person" AS "Uncertain Person"
      FROM
        public."Institution Honor" AS institution_honor
        INNER JOIN public."Person Honor Display" AS person_honor
          ON institution_honor."Honor ID" = person_honor."Honor ID"
        INNER JOIN public."Person" AS person
          ON person_honor."Person ID" = person."ID"
        INNER JOIN public."Honor" AS honor
          ON person_honor."Honor ID" = honor."ID"
      WHERE institution_honor."Institution ID" = ($1)
      GROUP BY person."ID"
      ORDER BY person."ID" ASC;`,
      [id]
    );
  });

  /* --- End Read Operations */

  /* === End Institution Routes === */

  module.exports = router;

})();
