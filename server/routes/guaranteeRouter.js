const express = require('express');
const router = express.Router();
const guaranteeCtrl = require('../controllers/guaranteeCtrl');
const guaranteeOrderCtrl = require('../controllers/guaranteeOrderCtrl');

router.get('/', guaranteeCtrl.getAllGuarantees);
router.get('/:id', guaranteeCtrl.getGuaranteeById);
router.get(
    '/guaranteeOrder/:id',
    guaranteeOrderCtrl.getGuaranteeOrderByIdGuarantee
);
router.put(
    '/updateStatusGuarantee/:id',
    guaranteeOrderCtrl.updateStatusGuarantee
);

module.exports = router;
