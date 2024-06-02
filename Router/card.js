const express = require('express')
const Route = express.Router()

Route.post('/create', async (req,res) => {

    const data = req.body;

    const cardCreated = await cardModel.create({
        user_id: "664231130acae656a83cfc16",
        cardNumber: data.cardNumber,
        expirationDate: data.expirationDate,
        CVCCode: data.CVCCode,
        cardType: data.cardType
    });

    const createWallet = await walletModel.create({
        user_id: "664231130acae656a83cfc16",
        card_id: cardCreated._id,
        balance: 0,
        currency: "USD"
    })

    return res.status(200).send({ card : cardCreated , wallet : createWallet })

})

module.exports = Route