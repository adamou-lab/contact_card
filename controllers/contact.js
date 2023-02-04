

const Card = require('../Models/contact')


const addContacts = async (req, res, file) => {

    try {
        req.body.createdBy = req.user.userId
        const fileName = req.file.filename
        req.body.image = `http://localhost:3000/uploads/images/${fileName}`

        const card = await Card.create({...req.body})


        res.status(201).json({card})
        
    } catch (error) {
        res.status(500).send(error)
    }
    
}

const getContacts = async (req, res) => {
    try {
        const cards = await Card.find({createdBy: req.user.userId}).sort('name') 
        res.status(200).json({cards})
        
    } catch (error) {
        res.status(500).send(error)
        
    }

}

const getSingleContact = async (req, res) => {
    try {
        const {cardId} = req.params
        const card = await Card.findOne({createdBy: req.user.userId, _id: cardId})

        if(!card){
            return res.status(404).send("This contact does not exist")
        }

        res.status(200).json({card})
        
    } catch (error) {
        res.status(500).send(error)
    }

}

const deleteContact = async (req, res) => {
    try {
        const {cardId} = req.params

        const card = await Card.findOneAndDelete({createdBy: req.user.userId, _id: cardId})

        const cards = await Card.find({createdBy: req.user.userId}).sort('name')
        res.status(201).json({cards})
        
    } catch (error) {
        res.status(500).send(error)
        
    }

}

const updateContact = async (req, res) => {
    try {
        const {cardId} = req.params

        const card = await Card.findOneAndUpdate({createdBy: req.user.userId, _id: cardId}, 
            req.body,
            {
                new: true,
                runValidators: true

            }
            )

        res.status(201).json({card})
        
    } catch (error) {
        res.status(500).send(error)    
    }

}

module.exports = {
    addContacts,
    getContacts,
    getSingleContact,
    deleteContact,
    updateContact
}