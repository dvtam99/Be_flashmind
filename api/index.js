const router = require('express').Router();

router.use('/auth', require('./auth'));
router.use('/me', require('./me'));
router.use('/question', require('./question'));
router.use('/upload', require('./upload'));

module.exports = router;
