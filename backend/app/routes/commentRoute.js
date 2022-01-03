const express = require('express');
const router = express.Router();
const auth = require('../midleware/auth.midleware');

const commentControllers = require('../controllers/comment.controller');
router.post('/home/comment', auth, commentControllers.createComment);
router.get('/home/comment', auth, commentControllers.findAllCommentById);
module.exports = router;