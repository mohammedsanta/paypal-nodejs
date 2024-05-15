const mongoose = require('mongoose')

const userAdditionalDataSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: 'Users' },
    address: String,
    area: String,
    city: String,
    governorate: String,
    PostCode: String
})

const UserAdditionalDataModel = mongoose.model('UserAdditionalData',userAdditionalDataSchema);

module.exports = UserAdditionalDataModel;