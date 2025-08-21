const userModel = require('../models/user.model')
const transporter = require('../config/nodemailer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString()
}

const userRegister = async (req, res) => {
  try {
    const { fullName, email } = req.body;

    if (!fullName || !email) {
      return res.status(400).json({ error: "Full Name and Email are required!" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser && existingUser.verified) {
      return res.status(400).json({ error: "User Already Exists!" });
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 5 * 60 * 1000;

    const user = await userModel.findOneAndUpdate(
      { email },
      { fullName, email, otp, otpExpiry, verified: false },
      { upsert: true, new: true }
    );

    const htmlContent = `
      <div style="background-color:#f9fafb; padding:24px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.1); font-family:Arial, sans-serif;">
        <h2 style="font-size:20px; font-weight:bold; color:#1f2937; margin-bottom:16px;">Welcome to ASICNOVA 🎉</h2>

        <p style="color:#374151; margin-bottom:12px;">Hello ${fullName},</p>
        <p style="color:#374151; margin-bottom:24px;">
          Thank you for registering! Please verify your email using the OTP below:
        </p>

        <div style="background-color:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:16px; text-align:center; margin-bottom:24px;">
          <p style="font-size:24px; font-weight:bold; color:#2563eb; letter-spacing:4px; margin:0;">${otp}</p>
          <p style="color:#6b7280; margin-top:8px;">This code is valid for 5 minutes.</p>
        </div>

        <p style="color:#374151; margin-bottom:24px;">
          If you didn’t request this, you can safely ignore this email.
        </p>

        <p style="font-size:12px; color:#6b7280; margin-top:16px;">© ${new Date().getFullYear()} ASICNOVA</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "ASICNOVA - Your OTP Code",
      html: htmlContent,
    });

    return res.status(200).json({ message: "OTP Sent!" });
  } catch (error) {
    console.log("An Error Occurred!", error);
    res.status(500).json({ error: "Internal Server Error!" });
  }
};


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

        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

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

        const htmlContent = `
  <div style="background-color:#f9fafb; padding:24px; border-radius:8px; box-shadow:0 1px 3px rgba(0,0,0,0.1); font-family:sans-serif; max-width:600px; margin:0 auto;">
    <h2 style="font-size:20px; font-weight:700; color:#1f2937; margin-bottom:16px;">
      Password Reset Request
    </h2>

    <p style="color:#374151; margin-bottom:16px;">
      Hello ${user.fullName || "User"},
    </p>
    <p style="color:#374151; margin-bottom:24px;">
      You requested to reset your password. Use the OTP below to proceed:
    </p>

    <div style="background-color:#ffffff; border:1px solid #e5e7eb; border-radius:8px; padding:16px; margin-bottom:24px; text-align:center;">
      <p style="font-size:30px; font-weight:700; color:#2563eb; letter-spacing:4px; margin:0;">
        ${otp}
      </p>
      <p style="color:#6b7280; margin-top:8px; font-size:14px;">
        This code is valid for 5 minutes.
      </p>
    </div>

    <p style="color:#374151; margin-bottom:24px;">
      If you did not request this, please ignore this email.
    </p>

    <p style="font-size:12px; color:#6b7280; margin-top:24px;">
      © ${new Date().getFullYear()} Your Company
    </p>
  </div>
`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "ASICNOVA - Password Reset OTP",
            html: htmlContent,
        });
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
