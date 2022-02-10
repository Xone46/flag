const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/ClientController');
const auth = require('../middleware/auth');


router.get('/profile', auth, ClientController.profile);


module.exports = router;
