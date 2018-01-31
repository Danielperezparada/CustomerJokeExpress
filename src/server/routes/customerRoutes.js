const router = require('express').Router();
const { customerPost } = require('../../api/services/customerService');

router.post('/customers', customerPost);
// router.get('/callback', verify);

module.exports = router;
