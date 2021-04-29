const Sequelize = require("sequelize");
const express = require("express");
const bodyParser = require("body-parser");
var v1 = require("./routes/router");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use("/",v1);

app.listen(3000,()=>{
      console.log("the code is going to run")
})
