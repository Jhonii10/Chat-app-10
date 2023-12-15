const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message:{
        text:{
            type:String,
            require:true
        },
        Users:Array,
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            require:true,
        },
        },
    },
    {
        timestamps:true,
    }
    
)


module.exports = mongoose.model("Messages", messageSchema);