const router = require('express').Router();
const userRoutes = require('./userRoutes');
const sportsRoutes = require('./sportsRoutes');

router.use('/user', userRoutes);
router.use('/sports', sportsRoutes);

module.exports = router;