const userModel = require('../models//user.model')
const productModel = require('../models/product.model')

const addToCart = async (req, res) => {
    try {
        const userId = req.user.id
        const { productId, quantity } = req.body

        const user = await userModel.findById(userId)

        if (!user) return res.status(404).json({ error: "User Not Found!" })

        const itemIndex = user.cart.findIndex(item => item.product.toString() === productId)

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity += quantity;
        } else {
            user.cart.push({ product: productId, quantity })
        }

        await user.save()
        await user.populate('cart.product')

        res.status(200).json(user.cart)

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding to cart' });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.user.id
        const user = await userModel.findById(userId).populate('cart.product')
        if (!user) return res.status(404).json({ error: "User Not Found!" })

        res.status(200).json(user.cart)
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Error Fetching Cart!" })
    }
}

const updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = await userModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const itemIndex = user.cart.findIndex(i => i.product.toString() === productId);
        if (itemIndex > -1) {
            if (quantity <= 0) {
                user.cart.splice(itemIndex, 1);
            } else {
                user.cart[itemIndex].quantity = quantity;
            }
        }

        await user.save();
        await user.populate('cart.product');
        res.status(200).json(user.cart);
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Error updating cart item' });
    }
};


const removeItem = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = await userModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.cart = user.cart.filter(i => i.product.toString() !== productId);
        await user.save();
        await user.populate('cart.product');
        res.status(200).json(user.cart);
    } catch(error) {
        console.log(error)
        res.status(500).json({ message: 'Error removing item from cart' });
    }
}

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeItem
}