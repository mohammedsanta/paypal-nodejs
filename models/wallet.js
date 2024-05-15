const mongoose = require('mongoose')

const walletSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    card_id: { type: mongoose.Schema.ObjectId, ref: 'card' },
    balance: Number,
    currency: String,
})

const walletModel = mongoose.model('Wallet',walletSchema);

module.exports = walletModel;