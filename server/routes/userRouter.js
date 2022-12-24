const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');

router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);
router.delete('/delete', userCtrl.delete);
router.put('/update', userCtrl.update);
router.get('/userAdmin', userCtrl.getUserAdmin);
router.get('/userAgency', userCtrl.getUserAgency);
router.get('/userGuarantee', userCtrl.getUserGuarantee);
router.get('/userFactory', userCtrl.getUserFactory);

module.exports = router;
