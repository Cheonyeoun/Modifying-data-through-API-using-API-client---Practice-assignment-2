const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name:
    {
    type:String,
    required:true,
    trim:true
    },
    description:
    {
        type:String
    },
    price:
    {
        type:Number,
        required:true,
        min:0
    }
});

const menu = mongoose.model("menu",menuSchema);

module.exports = menu;
