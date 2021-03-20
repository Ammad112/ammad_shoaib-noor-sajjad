const mongoose=require('mongoose')
const Schema=mongoose.Schema
const stockSchema=new Schema({
    stockId:{type:Number},
    remaining:{type:Number}
})
const Stock=mongoose.model('Stocks',stockSchema)

module.exports=Stock