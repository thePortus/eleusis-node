'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('../../controllers');

router.get('/', controllers.institutions.list);
router.get('/:institution_id', controllers.institutions.get);

module.exports = router;
