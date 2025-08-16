const userModel = require('../models/user.model')
const transporter = require('../config/nodemailer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

const userRegister = async (req, res) => {
    try {
        const { fullName, email } = req.body

        if (!fullName || !email) {
            return res.status(400).json({ error: "Full Name and Email are required!" })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser && existingUser.verified) {
            return res.status(400).json({ error: "User Already Exists!" })
        }

        const otp = generateOTP()
        const otpExpiry = Date.now() + 5 * 60 * 1000

        const user = await userModel.findOneAndUpdate(
            { email },
            { fullName, email, otp, otpExpiry, verified: false },
            { upsert: true, new: true }
        )

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP is ${otp}`
        })

        return res.status(200).json({ message: "OTP Sent!" })

    } catch (error) {
        console.log("An Error Occurred!", error)
        res.status(500).json({ error: "Internal Server Error!" })
    }
}

const verifyOTPAndPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body

        if (!email || !otp || !password) {
            return res.status(400).json({ error: "Email, OTP, and Password are required!" })
        }

        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).json({ error: "User not Found!" })

        if (user.otp !== otp) return res.status(400).json({ error: "Invalid OTP!" })
        if (Date.now() > user.otpExpiry) return res.status(400).json({ error: "OTP Expired!" })

        const hashedPassword = await bcrypt.hash(password, 10)

        user.password = hashedPassword
        user.verified = true
        user.otp = undefined
        user.otpExpiry = undefined
        await user.save()

        return res.status(200).json({ message: "Registered Successfully!" })

    } catch (error) {
        console.log("An Error Occurred!", error)
        res.status(500).json({ error: "Internal Server Error!" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ error: "Email & Password is required!" })
        }

        const user = await userModel.findOne({ email })
        if (!user || !user.password) {
            return res.status(400).json({ error: "Invalid Credentials!" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ error: "Invalid Credentials!" })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.cookie("accessToken", token)
        return res.status(200).json({ message: "Login Successful!", token })

    } catch (error) {
        console.log("An Error Occurred!", error)
        res.status(500).json({ error: "Internal Server Error!" })
    }
}

const getProfile = async (req, res) => {
    try {
        const user = req.user
        const User = await userModel.findOne({ _id: user.id }).select('-password -verified')
        return res.status(200).json({ message: "User Profile!", User })
    } catch (error) {
        console.log("An Error Occurred!", error)
        res.status(500).json({ error: "Internal Server Error!" })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body
        if (!email) return res.status(400).json({ error: "Email is required!" })

        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).json({ error: "User not found!" })

        const otp = generateOTP()
        const otpExpiry = Date.now() + 5 * 60 * 1000

        user.otp = otp
        user.otpExpiry = otpExpiry
        await user.save()

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP to reset password is ${otp}`
        })

        return res.status(200).json({ message: "OTP sent to your email!" })
    } catch (error) {
        console.log("An Error Occurred!", error)
        res.status(500).json({ error: "Internal Server Error!" })
    }
}

const resetPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body
        if (!email || !otp || !password) return res.status(400).json({ error: "Email, OTP, and new password are required!" })

        const user = await userModel.findOne({ email })
        if (!user) return res.status(400).json({ error: "User not found!" })
        if (user.otp !== otp) return res.status(400).json({ error: "Invalid OTP!" })
        if (Date.now() > user.otpExpiry) return res.status(400).json({ error: "OTP Expired!" })

        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.otp = undefined
        user.otpExpiry = undefined
        await user.save()

        return res.status(200).json({ message: "Password reset successful!" })
    } catch (error) {
        console.log("An Error Occurred!", error)
        res.status(500).json({ error: "Internal Server Error!" })
    }
}


module.exports = {
    userRegister,
    verifyOTPAndPassword,
    loginUser,
    getProfile,
    forgotPassword,
    resetPassword
}
