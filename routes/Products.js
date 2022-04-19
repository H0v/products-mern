const express = require('express');
const router = express.Router();

const productModel = require('../models/Products');

const { formatPrice } = require('../helpers/priceFormat');

router.get("/get-all", async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    }
    catch(e) {
        res.json({message: `Error: Something went wrong.`});
    }
});

router.post("/create-product", async (req, res) => {
   try {
       const { body } = req;
       const Product = new productModel({
           image: body.image,
           title: body.title,
           description: body.description,
           price: formatPrice(parseInt(body.price)),
       });
       await Product.save();
       res.json({message: 'Product successfully added...'});
   }
   catch(e) {
       res.json({message: `Something went wrong while adding product... ${e}`})
   }
});

router.get('/:id', async (req, res) => {
    try {
        const {params} = req;
        const product = await productModel.findById(params.id).select('- __v')
        res.json({product});
    } catch (e) {
        res.json({message: "Something went wrong while trying to get single user."});
    }
});

router.put('/update-product', async (req, res) => {
    try {
        const { body } = req;
        await productModel.findOneAndUpdate(
            {_id: body.id},
            {
                title: body.title,
                description: body.description,
                price: formatPrice(body.price),
            }
        );
        res.json({message: 'Product successfully updated...'});
    }
    catch(e) {
        res.json({message: 'Something went wrong while updating product...'});
    }
});

router.delete('/delete-product', async (req, res) => {
   try {
       const { body } = req;
       await productModel.findOneAndDelete({_id: body.id});
       res.json({message: 'Product deleted successfully.'});
   }
   catch(e) {
       res.json({message: 'Something went wrong while deleting product.'});
   }
});

module.exports = router;