const mongoose = require('mongoose');

/*  Creating Schema */
const PostSchema = mongoose.Schema({

    CompanyName : {
        type: String,
        required: true
    },
    ContactName :{
        type: String,
        required: true
    },
    ContactTitle : {
        type: String,
        required: true
    },
    Address : {
        type: String,
        required: true
    },
    Country : {
        type: String,
        required: true
    },
    Fax : {
        type: String,
        required: true
    },
    Phone : {
        type: String,
        required: true
    },
    City : {
        type: String,
        required: true
    },
    Region : {
        type: String,
        required: true
    },
    PostalCode : {
        type: String,
        required: true
    }

  })

  module.exports = mongoose.model('suppliers', PostSchema);
