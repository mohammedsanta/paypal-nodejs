const express = require('express')
const mongoose = require('mongoose');
const auth = require('./Router/auth')
const transactions = require('./Router/transactions')
const card = require('./Router/card')
const app = express();

const mongooseUrl = "mongodb://127.0.0.1:27017/paypal";

mongoose.connect(mongooseUrl)
.then(() => console.log('database connected'))
.catch((err) => console.log(`error occurred: ${err}`))

app.use(express.json())

// Routes

app.use('/auth',auth)
app.use('/card',card)
app.use(transactions)

// End Routes


app.get('/dashboard',(req,res) => {

    res.send({})

})

app.listen(3000,() => {
    console.log('Server Has Runed')
})