const express = require('express')
const router = express.Router()

const uploadFiles = require('../Middlewares/uploadFiles')

const {
    addContacts,
    getContacts,
    getSingleContact,
    deleteContact,
    updateContact
} = require('../controllers/contact')



router.route('/').post(uploadFiles.single('image'),addContacts).get(getContacts)
router.route('/:cardId').get(getSingleContact).patch(updateContact).delete(deleteContact)

module.exports = router