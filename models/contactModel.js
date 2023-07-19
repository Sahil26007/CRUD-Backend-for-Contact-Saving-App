const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    name :{
        type :String,
        required : [true,`Please Add name`],
    },
    email :{
        type :String,
        required : [true,`Please Add email`],
    },
    phone :{
        type: Number,
        require: [true ,`Please Add phone Number`],
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Contact",contactSchema)