const express = require('express');
const router = express.Router();
const { createNews, getAllNews, getNewsById } = require('./controller');

router.post('/', createNews);
router.get('/', getAllNews);
router.get('/:id', getNewsById);

module.exports = router;
