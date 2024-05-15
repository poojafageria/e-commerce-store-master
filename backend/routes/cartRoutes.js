const express = require('express')
const {
  addProductInCart,
  deleteProductInCart,
  getCartProducts,
  addProduct,
} = require('../controller/cart.controller')

const {verifyUser,isAdmin,isUser} = require('../middleware/middleware')
const router = express.Router();

const multer = require('multer');
const path = require('path');

const uploadDirectory = path.join(__dirname, '..', '..', 'frontend', 'public', 'upload');

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory); // Directory where files will be uploaded
  },
  filename: function (req, file, cb) {
    const uniqueFilename = Date.now();
    cb(null, uniqueFilename + file.originalname); // Use the original file name
  }
});
const upload = multer({ storage: storage });

router
  .route('/')
  .get([verifyUser], getCartProducts)
  .post([verifyUser,isUser], addProductInCart)

router
  .route('/addProduct')
  .post(upload.single('image'),addProduct);

router.route('/:id').delete([verifyUser], deleteProductInCart)

module.exports = router;
