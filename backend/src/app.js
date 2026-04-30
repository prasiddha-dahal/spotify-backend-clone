// turning raw incoming data into usable JavaScript objects

const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors')

const app = express();

//middlwares
app.use(express.json())  // to access the req.body -- parse json body

app.use(cors({              // to connect frontend with backend
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());     // to access the token form the cookie(parse cookies) -- req.cookies.token

//testing route
app.get('/',(req,res)=>{
    res.send("api is running");
})

module.exports = app
