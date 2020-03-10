const mongoose = require("mongoose");
const express = require("express");
const app = express();
const userRoute = require("./api/routers/userRoute");
const BodyParse = require("body-parser");

const hostDatabase = "mongodb://localhost/movies_db";
const port = process.env.PORT || 8080;

//parse
app.use(BodyParse.json());
app.use(BodyParse.urlencoded({extended:true}));

//connect to database
mongoose.connect(hostDatabase);

//register app to route
userRoute(app);

// run app
app.listen(port,()=> console.log("Welcome To Server In Port : ",port))
