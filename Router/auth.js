const express = require('express');
const bcrypt = require('bcrypt')
const userModel = require('../models/user');
const generateAccessToken = require('../helper/generateAccessToken');
const Route = express.Router()

Route.post('/register',async (req,res) => {

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

Route.post('/login', async (req,res) => {

    const data = req.body;

    const getUser = await userModel.find({ username: data.username });

    if(!getUser.length) return res.status(401).send({ message: "Wrong Credentials Username " }) 

    const userPassword = getUser[0].password;

    const loginTest = await bcrypt.compare(data.password,userPassword);

    if(loginTest) {
    
        const token = generateAccessToken(getUser)   

        return res.cookie("token", token , { httpOnly: true }).status(200).send({getUser , genrated : generateAccessToken(getUser) });
    
    }

    res.status(401).send({ message: "Wrong Credentials"})

})

Route.post('/logout',(req,res) => {

    return res.cookie('token','').send('Logout has done');

})

module.exports = Route