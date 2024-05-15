const express = require('express')
const mongoose = require('mongoose');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const cardModel = require('./models/card');
const walletModel = require('./models/wallet');
const app = express();

const mongooseUrl = "mongodb://127.0.0.1:27017/paypal";

mongoose.connect(mongooseUrl)
.then(() => console.log('database connected'))
.catch((err) => console.log(`error occurred: ${err}`))

app.use(express.json())

app.post('/auth/register',async (req,res) => {

    const data = req.body;

    const createUser = await userModel.create({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        picture: data.picture,
        username: data.username,
        password: data.password,
        joined: new Date().toDateString()
    })


    res.send(createUser);

})

app.post('/auth/login', async (req,res) => {

    const data = req.body;

    const getUser = await userModel.find({ username: data.username });

    if(!getUser.length) return res.status(401).send({ message: "Wrong Credentials Username " }) 

    const userPassword = getUser[0].password;

    const loginTest = await bcrypt.compare(data.password,userPassword);

    if(loginTest) return res.status(200).send(getUser);

    res.status(401).send({ message: "Wrong Credentials" })

})

app.post('/card/create', async (req,res) => {

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

app.get('/dashboard',(req,res) => {

    res.send({})

})

app.post('/send',(req,res) => {



})

app.post('/withdrow',(req,res) => {

    const amount = wallet.balance;
    amount -= req.amount;

    res.send(`Your Balance is ${amount}`)

})

app.listen(3000,() => {
    console.log('Server Has Runed')
})