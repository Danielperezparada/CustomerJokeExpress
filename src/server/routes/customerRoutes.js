const router = require('express').Router();
const {
  customerPost,
  customerGetAll,
  customerGetById,
  customerPatchById,
  customerDelById,
} = require('../../api/services/customerService');

router.post('/customers', customerPost);
router.get('/customers', customerGetAll);
router.get('/customers/:id', customerGetById);
router.patch('/customers/:id', customerPatchById);
router.delete('/customers/:id', customerDelById);

module.exports = router;
