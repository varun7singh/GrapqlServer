const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
    name : {
        type: String,
    },
    status : {
        type: String,
        enum: ['Not Started', 'In Progress','Completed']
    },
    description : {
        type: String,
    },
    clientId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    }
});

module.exports = Project;