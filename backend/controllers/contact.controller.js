const contactModel = require('../models/contact.model')

const submitInquiry = async (req,res)=>{
    try {
        const {fullName, email, inquiry} = req.body

        const newInquiry = await contactModel.create({
            fullName,
            email,
            inquiry
        })

        if(!fullName || !email || !inquiry){
            return res.status(400).json({
                error: "All Fields Are Required!"
            })
        }

        await newInquiry.save()

        return res.status(200).json({
            message: "Inquiry Submitted!",
            newInquiry
        })
        
    } catch (error) {
        console.log("An Error Occured!", error)
        res.status(500).json({error: "Internal Server Error"})
    }
}

const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await contactModel.find().sort({ createdAt: -1 }) 
        return res.status(200).json({
            success: true,
            inquiries
        })
    } catch (error) {
        console.log("An Error Occurred!", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}


module.exports = {
    submitInquiry,
    getAllInquiries
}