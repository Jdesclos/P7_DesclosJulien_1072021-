const express = require("express");
const bodyParser = require("body-parser");

var cookieParser = require('cookie-parser');
require('dotenv').config();
const userRoute = require("./app/routes/userRoute");
const userMessage = require("./app/routes/messageRoute");
const app = express();
const db = require("./app/models");
// db.sequelize.sync();
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
app.use(cookieParser());

const cors=require("cors");
const corsOptions ={
   origin:'http://localhost:8081', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)),


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api/', userMessage);
app.use('/api/', userRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});