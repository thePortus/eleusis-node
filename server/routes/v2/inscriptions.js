'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('../../controllers');

router.get('/', controllers.inscriptions.list);
router.get('/:inscription_id', controllers.inscriptions.get);

module.exports = router;
