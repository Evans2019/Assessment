'use static'
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();
const port = 8080;
const connectDB = require('./DB/Connection');


connectDB();

//Configuring express server
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

const hostname = 'localhost';

  /* Product connection */
  require('./products/post')(app);
  require('./products/get')(app);


  /* Supplier connection */
  require('./suppliers/post')(app);
  require('./suppliers/get')(app);

  /* Catergory connection */
  require('./catergories/get')(app);
  require('./catergories/post')(app);

 // Serve Static Assets
app.use(express.static('public'));

//Establish the server connect
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});




