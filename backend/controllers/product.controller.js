const productModel = require('../models/product.model')

const createProduct = async (req, res) => {
    try {
        const {
            name,
            functionType,
            type,
            shippingDate,
            paymentMethod,
            perUnit,
            perGram,
            images,
            modelName,
            Algorithm,
            typicalHashRate,
            PowerOnWall,
            PowerEfficiency,
            inputVoltage,
            inputFrequency,
            maxCurrent,
            NetworkConnectionMode,
            ServerSizeWithoutPackage,
            ServerSizeWithPackage,
            NetWeight,
            GrossWeight,
            Noise,
            OperationTemperature,
            StorageTemperature,
            OperationHumidity,
            OperationAltitude,
            purchasingGuideLines
        } = req.body

        const newProduct = await productModel.create({
            name,
            functionType,
            type,
            shippingDate,
            paymentMethod,
            price: {
                perUnit,
                perGram
            },
            images,
            specifications: {
                ProductGlance: {
                    modelName,
                    Algorithm,
                    typicalHashRate,
                    PowerOnWall,
                    PowerEfficiency
                },
                DetailedCharacteristics: {
                    inputVoltage,
                    inputFrequency,
                    maxCurrent,
                    NetworkConnectionMode,
                    ServerSizeWithoutPackage,
                    ServerSizeWithPackage,
                    NetWeight,
                    GrossWeight,
                    Noise,
                    OperationTemperature,
                    StorageTemperature,
                    OperationHumidity,
                    OperationAltitude
                }
            },
            purchasingGuideLines
        })

        return res.status(200).json({
            message: "Product Created!",
            newProduct
        })

    } catch (error) {
        console.log("An Error Occured!", error)
        res.status(500).json({ error: "Internal Server Error!" })
    }
}

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

const getProducts = async (req,res)=>{
    try {
        const products = await productModel.find()

        if(!products){
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
        res.status(500).json({error: "Internal Server Error!"})
    }
}

const getProductById = async (req,res)=>{
    const id = req.params.id
    
}


module.exports = {
    createProduct,
    createReview,
    getProducts
}
