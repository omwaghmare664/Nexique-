const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
   profilePicture: {
       type: String,
       default: '/images/avatar.jpg'
   },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address: {
        type: String,
        default: 'No address'
    },
    cart: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    orders: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
})

const userModel = mongoose.model('user', UserSchema)

module.exports = userModel