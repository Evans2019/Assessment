const mongoose = require('mongoose');

/*  Creating Schema */
const PostSchema = mongoose.Schema({

    Productname : {
        type: String,
        required: true
    },
    Supplierid :{
        type: String,
        required: true
    },
    CatergoryId : {
        type: String,
        required: true
    },
    QuantityPerUnit : {
        type: String,
        required: true
    },
    UnitPrice : {
        type: String,
        required: true
    },
    UnitsInStock : {
        type: String,
        required: true
    },
    UnitsOnOrder : {
        type: String,
        required: true
    },
    ReorderLevel : {
        type: String,
        required: true
    },
    Discountinued : {
        type: String,
        required: true
    }
  })

  module.exports = mongoose.model('Products', PostSchema);
