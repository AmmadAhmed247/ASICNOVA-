const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    inquiry: {
        type: String
    }
})

const contactModel = mongoose.model('contact-inquiries', contactSchema)

module.exports = contactModel;