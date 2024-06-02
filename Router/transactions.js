const express = require('express')
const userModel = require('../models/user')
const walletModel = require('../models/wallet')
const authenticationToken = require('../helper/authenticationToken')
const Route = express.Router()

Route.post('/send',async (req,res) => {

    const sendTo = req.body.username
    const amount = req.body.amount

    // search user

    const checkUser = await userModel.findOne({ username: sendTo })
    if(!checkUser) return res.status(401).send({ message: "Wrong username" })

    const id = checkUser._id.toString();

    // search wallet

    const getWallet = await walletModel.findOne({ user_id: id })

    if(amount == null || amount <= 0) return res.status(400).send({ message: "You have to Write a integer number" })

    try {
        await getWallet.updateOne({ balance: getWallet.balance + amount })
    } catch (error) {
        return res.send({ error: error.message })
    }



    res.send("You have sent the money")

})

Route.post('/deposit',authenticationToken, async (req,res) => {

    // the budget or money you want to add

    const budget = req.body.budget;

    console.log(budget)

    const getCookie = req.headers.cookie;
    const token = getCookie.split('=')[1];

    const user = verifyAccessToken(token)

    const userId = user.data.user[0]._id;

    const getWallet = await walletModel.find({user_id: userId})
    const wallet = getWallet[0]

    const updateWallet = await walletModel.findOneAndUpdate({user_id: userId,balance : wallet.balance + budget })

    console.log(wallet)
    console.log(updateWallet)

    return res.send('no error')

})

Route.post('/withdrow',(req,res) => {

    const amount = wallet.balance;
    amount -= req.amount;

    res.send(`Your Balance is ${amount}`)

})

module.exports = Route;