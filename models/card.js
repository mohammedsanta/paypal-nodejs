const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    cardNumber: String,
    expirationDate: String,
    CVCCode: Number,
    cardType: String,
})

const cardModel = mongoose.model('Card',cardSchema);

module.exports = cardModel;