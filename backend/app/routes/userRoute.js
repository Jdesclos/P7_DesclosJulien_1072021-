const express = require('express');
const router = express.Router();
const multer = require('../midleware/multer.midleware');
const auth = require('../midleware/auth.midleware');

const messages = require('../controllers/user.controller');
router.post('/users/register', multer, messages.register);
router.post('/users/login',  multer, messages.login);
router.put('/users/:id', auth, multer, messages.modifyUser);
router.delete('/users/:id', auth, messages.deleteUser);
module.exports = router;