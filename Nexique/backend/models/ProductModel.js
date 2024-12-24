const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
   productImage: {
       type: String,
    //    required: true
   },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
})

const productModel = mongoose.model('Product', ProductSchema)

module.exports = productModel