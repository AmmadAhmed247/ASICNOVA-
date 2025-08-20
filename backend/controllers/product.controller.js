const productModel = require('../models/product.model')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })




const createProduct = async (req, res) => {
    try {
        let {
            name,
            functionType,
            type,
            shippingDate,
            paymentMethod,
            images,
            price,
            specifications,
            purchasingGuideLines,
            cryptoAddresses,
            expectedAmounts
        } = req.body;

        if (typeof paymentMethod === 'string') {
            paymentMethod = paymentMethod.split(',');
        }

        if (typeof price === 'string') {
            price = JSON.parse(price);
        }

        if (typeof specifications === 'string') {
            specifications = JSON.parse(specifications);
        }

        if (typeof cryptoAddresses === 'string') {
            cryptoAddresses = JSON.parse(cryptoAddresses);
        }

        if (typeof expectedAmounts === 'string') {
            const parsedAmounts = JSON.parse(expectedAmounts);
            expectedAmounts = {
                BTC: Number(parsedAmounts.BTC) || 0,
                ETH: Number(parsedAmounts.ETH) || 0
            };
        }

        const files = req.files;
        const imagesPath = files.map(file => file.path);

        const newProduct = await productModel.create({
            name,
            functionType,
            type,
            shippingDate,
            paymentMethod,
            images: imagesPath,
            price,
            specifications,
            purchasingGuideLines,
            cryptoAddresses,
            expectedAmounts
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

const editProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updates = req.body;

        if (req.files && req.files.length > 0) {
            updates.images = req.files.map(file => file.path);
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedProduct) {
            return res.status(400).json({
                error: "Product Not Found!"
            });
        }

        return res.status(200).json({
            message: "Product Updated Successfully!",
            product: updatedProduct
        });
    } catch (error) {
        console.log("An Error Occured!", error);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const deletedProduct = await productModel.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(400).json({
                error: "Product Not Found!"
            });
        }

        return res.status(200).json({
            message: "Product Deleted Successfully!",
            product: deletedProduct
        });
    } catch (error) {
        console.log("An Error Occured!", error);
        res.status(500).json({ error: "Internal Server Error!" });
    }
};

module.exports = {
    createProduct,
    createReview,
    getProducts,
    getProductById,
    editProduct,
    deleteProduct,
    upload
}
