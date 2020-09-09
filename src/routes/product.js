// MODULES
const express = require('express');
const router = express.Router();

// IMPORT FILES
const productController = require('../controllers/ProductController');

router.get('/', productController.list);
router.post('/add', productController.save);
router.get('/delete/:id', productController.delete);
router.get('/update/:id', productController.edit);
router.post('/update/:id', productController.update);
router.post('/search', productController.search);

module.exports = router;