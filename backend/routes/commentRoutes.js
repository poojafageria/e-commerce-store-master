// commentRoutes.js

const express = require('express');
const router = express.Router();
const { submitComment } = require('../controller/commentController');

// Route to handle comment submission
router.post('/submit', submitComment);

module.exports = router;
