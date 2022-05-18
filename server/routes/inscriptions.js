(function() {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const query = require('./query');

  /* === INSCRIPTIONS ROUTES === */

  /* --- READ OPERATIONS ---*/

  /* Read basic info of all inscriptions */
  router.get('/', (req, res, next) => {
    // Read items
    return query.dbSelect(
      res,
      `SELECT
        *
      FROM public."Inscription Full"() AS inscription
      ORDER BY inscription."IE" ASC;`
    );
  });

  /* Read basic info of single inscription */
  router.get('/:inscription_id', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.inscription_id;
    // SQL Query > Select single inscription
    return query.dbSelect(
      res,
      `SELECT
        *
      FROM public."Inscription Full"() AS inscription
      WHERE inscription."ID" = ($1);`,
      [id]
    );
  });

    /* Read honors appearing on inscription */
    router.get('/:inscription_id/honors', (req, res, next) => {
      // Grab data from the URL parameters
      const id = req.params.inscription_id;
      // SQL Query > Select single inscription
      return query.dbSelect(
        res,
        `SELECT
          honor."ID" AS "ID",
          honor."Honor" AS "Honor",
          honor."Origin" AS "Origin",
          honor."Category" AS "Category",
          honor."Type" AS "Type",
          honor_inscription."Appearances" AS "Appearances"
        FROM public."Honor in Inscription" AS honor_inscription
          INNER JOIN public."Honor" AS honor
            ON honor_inscription."Honor ID" = honor."ID"
        WHERE honor_inscription."Inscription ID" = ($1)
        ORDER BY honor."ID" ASC;`,
        [id]
      );
    });

    /* Read honors connected to people appearing on inscription*/
    router.get('/:inscription_id/people_honors', (req, res, next) => {
      // Grab data from the URL parameters
      const id = req.params.inscription_id;
      // SQL Query > Select single inscription
      return query.dbSelect(
        res,
        `SELECT
          honor."ID" AS "Honor ID",
          honor."Honor" AS "Honor",
          honor."Origin" AS "Honor Origin",
          honor."Category" AS "Honor Category",
          honor."Type" AS "Honor Type",
          person."ID" AS "Person ID",
          person."Person" AS "Person",
          public."Earliest Date"(person."ID") AS "Person Earliest Date",
          person."Origin" AS "Person Origin",
          person."Category" AS "Person Category",
          person."Gender" AS "Person Gender",
          CASE
            WHEN person."Category" = 'Athenian'
             AND person."Roman Citizen" = FALSE THEN 'Athenian without Roman Citizenship'
            WHEN person."Category" = 'Athenian'
             AND person."Roman Citizen" = TRUE THEN 'Athenian with Roman Citizenship'
            ELSE 'Non-Athenian'
          END AS "Person Status",
          person."Family" AS "Person Family",
          person."Extended" AS "Person Extended Family",
          concat_ws(' ', person."Praenomen", person."Nomen", person."Cognomen") AS "Roman Nomenclature",
          concat_ws(' ', person."Onomos", person."Patronym") AS "Greek Nomenclature",
          person."Deme" AS "Person Deme",
          person."Uncertain Person" AS "Uncertain Person"
        FROM public."Person Honor Display" AS person_honor
          INNER JOIN public."Honor" AS honor
            ON person_honor."Honor ID" = honor."ID"
          INNER JOIN public."Person" AS person
            ON person_honor."Person ID" = person."ID"
        WHERE person_honor."Inscription ID" = ($1)
        ORDER BY honor."ID" ASC;`,
        [id]
      );
    });

    /* Read institutions relations to honors on inscription*/
    router.get('/:inscription_id/institutions_honors', (req, res, next) => {
      // Grab data from the URL parameters
      const id = req.params.inscription_id;
      // SQL Query > Select single inscription
      return query.dbSelect(
        res,
        `SELECT
          honor_inscription."Honor ID" AS "Honor ID",
          institution."ID" AS "Institution ID",
          institution."Institution" AS "Institution",
          institution."Origin" AS "Origin",
          institution."Category" AS "Category",
          institution."Type" AS "Type"
        FROM public."Honor in Inscription" AS honor_inscription
          LEFT JOIN public."Institution Honor" AS institution_honor
            ON honor_inscription."Honor ID" = institution_honor."Honor ID"
          LEFT JOIN public."Institution" AS institution
            ON institution_honor."Institution ID" = institution."ID"
        WHERE honor_inscription."Inscription ID" = ($1)
        ORDER BY honor_inscription."Honor ID" ASC;`,
        [id]
      );
    });

    /* Read institutions appearing on inscription (as sponsors) */
    router.get('/:inscription_id/institutions', (req, res, next) => {
      // Grab data from the URL parameters
      const id = req.params.inscription_id;
      // SQL Query > Select single inscription
      return query.dbSelect(
        res,
        `SELECT
          institution."ID" AS "ID",
          institution."Institution" AS "Institution",
          institution."Origin" AS "Origin",
          institution."Category" AS "Category",
          institution."Type" AS "Type"
        FROM public."Institution Sponsorship" AS institution_inscription
          INNER JOIN public."Institution" AS institution
            ON institution_inscription."Institution ID" = institution."ID"
        WHERE institution_inscription."Inscription ID" = ($1)
        ORDER BY institution."ID" ASC;`,
        [id]
      );
    });

  /* Read people appearing on inscription */
  router.get('/:inscription_id/people', (req, res, next) => {
    // Grab data from the URL parameters
    const id = req.params.inscription_id;
    // SQL Query > Select single inscription
    return query.dbSelect(
      res,
      `SELECT DISTINCT
      person."ID" AS "ID",
      person."Person" AS "Person",
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
      person_inscription."Role" AS "Role in Inscription",
      person."Uncertain Person" AS "Uncertain Person"
      FROM public."Person in Inscription" AS person_inscription
        INNER JOIN public."Person" AS person
          ON person_inscription."Person ID" = person."ID"
      WHERE person_inscription."Inscription ID" = ($1)
      ORDER BY person."ID" ASC;`,
      [id]
    );
  });

  /* --- End Read Operations */

  /* === End Inscriptions Routes === */

  module.exports = router;

})();
