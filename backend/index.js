require("dotenv").config();

const connecttomongo =require('./db');
const express = require('express')
var cors = require('cors')
const cookieParser = require("cookie-parser");


connecttomongo();

const app = express() 
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://blog-space-drltb03l8-prajwal-dube26.vercel.app",
  // origin: [
  //     "http://localhost:3000",
  //     "https://blog-space-cfew116xa-prajwal-dube26.vercel.app"
  // ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};


//middleware

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth2',require('./routes/auth'));
app.use('/api/blog_route',require('./routes/blog_route'));


app.listen(port, () => {
  console.log(`blog website backend listening on port ${port}`)
})