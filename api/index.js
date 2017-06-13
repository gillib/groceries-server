/**
 * Created by gilbartsion on 13/06/2017.
 */

const router = require('express').Router();
const auth = require('./auth');
const groceries = require('./groceries');

router.use('/auth', auth);
router.use('/groceries', groceries);

module.exports = router;