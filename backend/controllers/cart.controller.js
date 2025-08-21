const userModel = require('../models//user.model')
const productModel = require('../models/product.model')

const addToCart = async (req, res) => {
  try {
        const userId = req.user.id;
        const { productId, quantity } = req.body;

        console.log("Add to cart request:", { userId, productId, quantity });

        if (!productId || !quantity) {
            return res.status(400).json({ error: "Product ID and quantity are required!" });
        }

        const productExists = await productModel.findById(productId);
        if (!productExists) {
            return res.status(404).json({ error: "Product not found!" });
        }

        console.log("Product exists:", productExists.name);

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        const itemIndex = user.cart.findIndex(item => 
            item.product && item.product.toString() === productId
        );

        if (itemIndex > -1) {
            user.cart[itemIndex].quantity += quantity;
        } else {
            user.cart.push({ 
                product: productId, 
                quantity: parseInt(quantity) 
            });
        }

        await user.save();
        
        await user.populate('cart.product');

        console.log("Cart after population:", user.cart);

        res.status(200).json({
            message: "Product added to cart successfully",
            cart: user.cart
        });

    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ 
            message: 'Error adding to cart',
            error: error.message 
        });
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
        const { productId } = req.body; // Changed from req.params to req.body
        console.log('Removing product with ID:', productId);
        
        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }
        
        const user = await userModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        console.log('Cart before removal:', user.cart.length, 'items');
        
        const originalLength = user.cart.length;
        user.cart = user.cart.filter(item => {
            const itemProductId = item.product._id ? item.product._id.toString() : item.product.toString();
            const keep = itemProductId !== productId.toString();
            console.log(`Checking item ${itemProductId} vs ${productId}: ${keep ? 'KEEP' : 'REMOVE'}`);
            return keep;
        });
        
        console.log('Items removed:', originalLength - user.cart.length);
        
        if (user.cart.length === originalLength) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        
        await user.save();
        await user.populate('cart.product');
        
        console.log('Updated cart with', user.cart.length, 'items');
        res.status(200).json(user.cart);
    } catch(error) {
        console.error('Error in removeItem:', error);
        res.status(500).json({ message: 'Error removing item from cart' });
    }
}

module.exports = {
    addToCart,
    getCart,
    updateCartItem,
    removeItem
}