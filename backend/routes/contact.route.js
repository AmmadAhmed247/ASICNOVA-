const express = require('express')
const router = express.Router()
const { submitInquiry, getAllInquiries } = require('../controllers/contact.controller')

router.post('/submit-inquiry', submitInquiry)
router.get('/inquiries', getAllInquiries)

module.exports = router;