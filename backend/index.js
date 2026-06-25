require("dotenv").config();

const connecttomongo =require('./db');
const express = require('express')
var cors = require('cors')
const cookieParser = require("cookie-parser");


connecttomongo();

const app = express() 
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};


//middleware

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth2',require('./routes/auth'));
app.use('/api/blog_route',require('./routes/blog_route'));


app.listen(port, () => {
  console.log(`blog website backend listening on port ${port}`)
})