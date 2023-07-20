const express = require('express');
const router = express.Router();

const { addActorInfo } = require('../controllers/actor');

router.post('/add-actor-info', addActorInfo);

module.exports = router;
