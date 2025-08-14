const jwt = require('jsonwebtoken')

const AuthMiddleware = async (req, res, next) => {
    try {
        const  token  = req.cookies.accessToken

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
        return res.status(500).json({error: "Internal Server Error!"})
    }
}

module.exports = {
    AuthMiddleware
}