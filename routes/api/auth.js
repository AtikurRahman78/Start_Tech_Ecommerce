const express = require('express');
const { registrationController, loginController, emailVerificationOtpMatch, becomeMerchantController, becomeMerchantStatusController } = require('../../controllers/authControllers/usersControllers.js');
const router = express.Router();


router.post('/registration', registrationController);
router.post('/login', loginController);
router.post('/otpmatch', emailVerificationOtpMatch);
router.post('/becomemerchant', becomeMerchantController);
router.post('/becomemerchantstatus', becomeMerchantStatusController);


module.exports = router;