const jwt = require('jsonwebtoken')

const AuthMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken

        if (!token) {
            return res.status(400).json({
                error: "Invalid Token!"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded

        next()

    } catch (error) {
        console.log("An Error Occured!", error)
        return res.status(500).json({ error: "Internal Server Error!" })
    }
}

const isAdmin = async (req, res, next) => {
    try {
        console.log(req.user)
        if (req.user && req.user.isAdmin === true) {
            return next(); 
        }

        return res.status(403).json({
            success: false,
            error: "Forbidden: Admin Only!"
        });
    } catch (err) {
        console.error("isAdmin middleware error:", err);
        return res.status(500).json({
            success: false,
            error: "Server error in admin check"
        });
    }
}

module.exports = {
    AuthMiddleware,
    isAdmin
}