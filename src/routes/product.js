// MODULES
const express = require('express');
const router = express.Router();

// IMPORT FILES
const productController = require('../controllers/ProductController');

router.get('/', productController.list);
router.post('/add', productController.save);
router.get('/delete/:id', productController.delete);

module.exports = router;