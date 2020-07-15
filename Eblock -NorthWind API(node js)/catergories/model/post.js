const mongoose = require('mongoose');

/*  Creating Schema */
const PostSchema = mongoose.Schema({
    CatergoryName : {
        type: String,
        required: true
    },
    Description :{
        type: String,
        required: true
    },
    Picture : {
        type: String,
        required: true
    }
  })

  module.exports = mongoose.model('Categories', PostSchema);
