const express = require('express')
const router = express.Router()
const { submitInquiry } = require('../controllers/contact.controller')

router.post('/submit-inquiry', submitInquiry)

module.exports = router;