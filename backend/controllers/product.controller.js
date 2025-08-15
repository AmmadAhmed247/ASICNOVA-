const productModel = require('../models/product.model')


const createProduct = async (req, res) => {
    try {
        const {
            name,
            functionType,
            type,
            shippingDate,
            paymentMethod,
            images,
            price,
            specifications,
            purchasingGuideLines,
            notes
        } = req.body;

        const newProduct = await productModel.create({
            name,
            functionType,
            type,
            shippingDate,
            paymentMethod,
            images,
            price,
            specifications,
            purchasingGuideLines,
            notes
        });

        return res.status(200).json({
            message: "Product Created!",
            newProduct
        });
    } catch (error) {
        console.log("An Error Occurred!", error);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

module.exports = {
    createProduct
};


const createReview = async (req, res) => {
    try {
        const { name, review } = req.body

        if (!name || !review) {
            return res.status(400).json({
                error: "All Fields Are Required!"
            })
        }

        const updatedProduct = await productModel.findByIdAndUpdate(
            req.params.id,
            { $push: { customerReviews: { name, review } } },
            { new: true }
        ).lean()

        if (!updatedProduct) {
            return res.status(400).json({
                message: "Product Not Found!"
            })
        }

        return res.status(200).json({
            message: "Review Added Successfully!",
            product: updatedProduct
        })
    } catch (error) {
        console.log("An Error Occured!", error)
        res.status(500).json({ error: "An Error Occured!" })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await productModel.find()

        if (!products) {
            return res.status(400).json({
                error: "No Products Found!"
            })
        }

        return res.status(200).json({
            message: "All Products!",
            products
        })
    } catch (error) {
        console.log("An Error Occured!", error)
        res.status(500).json({ error: "Internal Server Error!" })
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id

        const product = await productModel.findById(id)

        if (!product) {
            return res.status(400).json({
                error: "No Product Found!"
            })
        }

        return res.status(200).json({
            message: "Product Is",
            product
        })
    } catch (error) {
        console.log("An Error Occured!", error)
        res.status(500).json({ error: "Internal Server Error!" })
    }
}


module.exports = {
    createProduct,
    createReview,
    getProducts,
    getProductById
}
