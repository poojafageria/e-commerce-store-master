const Cart = require('../models/Cart');
const fs = require('fs');
const Product = require('../models/Product');

const getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.find({ userId: req.user._id }).populate('productId');
    // console.log(carts)
    res.status(200).send({ status: 'ok', carts });
  } catch (err) {
    // console.log(err);
    res.status(500).send(`Error ${err}`);
  }
};

const addProductInCart = async (req, res) => {
  const { productId, count } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate(
      { productId },
      { productId, count, userId: req.user._id },
      { upsert: true }
    );

    res.status(201).send({ status: 'ok', cart });
  } catch (err) {
    // console.log(err);
    res.status(500).send(`Error ${err}`);
  }
};

const deleteProductInCart = async (req, res) => {
  try {
    await Cart.findByIdAndRemove(req.params.id);
    res.status(200).send({ status: 'ok' });
  } catch (err) {
    // console.log(err);
    res.status(500).send(`Error ${err}`);
  }
};

const addProduct = async (req, res) => {
  // console.log(req.body);
  const { name, description, price, countInStock } = req.body;
  // console.log(req.file);
  // const imagePath = req.file.filename;

  try {
    // Create product document
    const product = new Product({
      name,
      description,
      price,
      countInStock,
      imageUrl : req.file.filename,
    });

    // Save product to MongoDB
    await product.save();
    // console.log('Product with image saved successfully');

    res.status(201).send({ status: 'ok', product });
  } catch (error) {
    // console.error('Error uploading product with image:', error);
    res.status(500).send(`Error ${error}`);
  }
};

module.exports = { addProductInCart, deleteProductInCart, getCartProducts,addProduct };
