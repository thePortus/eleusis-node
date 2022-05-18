'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('../../controllers');

router.get('/', controllers.people.list);
router.get('/:person_id', controllers.people.get);

module.exports = router;
