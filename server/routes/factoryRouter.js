const express = require('express');
const router = express.Router();
const factoryCtrl = require('../controllers/factoryCtrl');
const guaranteeOrderCtrl = require('../controllers/guaranteeOrderCtrl');

router.get(
    '/guaranteeOrder/:id',
    guaranteeOrderCtrl.getGuaranteeOrderByIdFactory
);
router.post('/updateAmount', factoryCtrl.updateAmount);
router.get('/:id', factoryCtrl.getFactoryById);
router.get('/', factoryCtrl.getAllFactories);

module.exports = router;
