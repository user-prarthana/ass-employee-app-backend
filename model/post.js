const mongoose = require('mongoose');

const schema = mongoose.Schema({
    ename:String,
    location:String,
    position:String,
    salary:Number
})

const postMode1 =mongoose.model('post',schema);
module.exports =postMode1;