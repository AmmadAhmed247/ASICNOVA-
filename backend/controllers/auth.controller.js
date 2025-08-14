const mongoose = require('mongoose')
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

        if (!email) {
            return res.status(400).json({
                error: "Email is Required!"
            })
        }

        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                error: "User Already Exists!"
            })
        }


        const otp = generateOTP()
        const otpExpiry = Date.now() + 5 * 60 * 1000

        const newUser = await userModel.create({
            fullName,
            email,
            otp,
            otpExpiry,
            verified: false
        })

        const user = await userModel.findOneAndUpdate(
            { email },
            { email, otp, otpExpiry },
            { upsert: true, new: true }
        );

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP Is ${otp}`
        })

        return res.status(200).json({
            message: "OTP Sent!"
        })


    } catch (error) {
        console.log("An Error Occured!", error)
        res.status(500).json({ error: "Internal Server Error!" })
    }
}

const verifyOTPAndPassword = async (req, res) => {
    try {
        const { email, otp, password } = req.body

        if (!email || !otp || !password) {
            return res.status(400).json({
                error: "Email, OTP and Password Are Required!"
            })
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

        return res.status(200).json({
            message: "Registered Successfully!"
        })

    } catch (error) {
        console.log("An Error Occured!", error)
        res.status(500).json({ error: "Internal Server Error!" })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                error: "Email & Password is Required!"
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                error: "Invalid Credentials!"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                error: "Invalid Credentials!"
            })
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        )

        res.cookie("accessToken", token, {
            httpOnly: true
        })

        return res.status(200).json({
            message: "Login Successful!",
            token
        })

    } catch (error) {
        console.log("An Error Occured!", error)
    }
}


const getProfile = async (req,res)=>{
    try {
        const user = req.user

        const User = await userModel.findOne({_id: user.id}).select('-password -verified')

        return res.status(200).json({
            message: "User Profile!",
            User
        })

    } catch (error) {
        console.log("An Error Occured!", error)
    }
}

module.exports = {
    userRegister,
    verifyOTPAndPassword,
    loginUser,
    getProfile
}