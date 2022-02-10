const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');


router.post('/login', AdminController.login);
router.post('/register', AdminController.register);
router.get('/show', AdminController.show);
router.get('/profile/:aid', AdminController.profile);
router.delete('/delete/:aid', AdminController.delete);
router.put('/update/:aid', AdminController.update)


module.exports = router;