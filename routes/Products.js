const express = require('express');
const router = express.Router();

const productModel = require('../models/Products');

const { formatPrice } = require('../helpers/priceFormat');

router.get("/product", async (req, res) => {
    try {
        const products = await productModel.find();
        res.json({ products });
    }
    catch(e) {
        res.json({message: `Error: Something went wrong.`});
    }
});

router.post("/product", async (req, res) => {
   try {
       const { image, title, description, price } = req.body;
       const Product = new productModel({
           image,
           title,
           description,
           price: formatPrice(parseInt(price)),
       });
       await Product.save();
       res.json({ success: true });
   }
   catch(e) {
       res.json({ message: `Something went wrong while adding product... ${e}` })
   }
});

router.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productModel.findById(id).select('- __v')
        res.json({ product });
    } catch (e) {
        res.json({ message: "Something went wrong while trying to get single user." });
    }
});

router.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price } = req.body;
        await productModel.findOneAndUpdate(
            { _id: id },
            {
                title,
                description,
                price: formatPrice(price),
            }
        );
        res.json({ success: true });
    }
    catch(e) {
        res.json({message: 'Something went wrong while updating product...'});
    }
});

router.delete('/product/:id', async (req, res) => {
   try {
       const { id } = req.params;
       await productModel.findOneAndDelete({ _id: id });
       res.json({ success: true });
   }
   catch(e) {
       res.json({ message: 'Something went wrong while deleting product.' });
   }
});

module.exports = router;
