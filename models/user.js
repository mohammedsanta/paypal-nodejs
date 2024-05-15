const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    picture: String,
    username: String,
    password: String,
    joined: String
})

userSchema.pre('save', function (next) {

    if(this.isNew) {

        bcrypt.hash(this.password,10,(err,hashedPassword) => {

            this.password = hashedPassword;

            next()

        })
        
    } else {
        next()
    }

})

const userModel = mongoose.model('Users',userSchema);

module.exports = userModel