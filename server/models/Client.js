const mongoose = require('mongoose');


const Client = mongoose.model('Client', {
    name:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    }
});

module.exports = Client;


