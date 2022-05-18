'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('../../controllers');

router.get('/', controllers.honors.list);
router.get('/:honor_id', controllers.honors.get);

module.exports = router;
