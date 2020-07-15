const mongoose = require('mongoose');

/* Connection string */
const URI ="mongodb+srv://elton:plQy7QE0tb7z3Hwt@cluster0.a5tmu.mongodb.net/Northwind?retryWrites=true&w=majority";

const connectDB = async () => {
  await mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  console.log('db connected..!');
};

module.exports = connectDB;
