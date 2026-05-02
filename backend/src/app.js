require('dotenv').config()
// turning raw incoming data into usable JavaScript objects
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors')
const authRoutes = require('./routes/auth.routes')
const songRoutes = require('./routes/song.routes')

const app = express();

//middlwares
app.use(express.json())  // to access the req.body -- parse json body

app.use(cors({              // to connect frontend with backend
    origin: process.env.CLIENT_URL, 
    credentials: true
}));

app.use(cookieParser());     // to access the token form the cookie(parse cookies) -- req.cookies.token
app.use('/api/auth', authRoutes)  // setting the prefixes for the routes
app.use('/api/songs', songRoutes)

//testing route
app.get('/',(req,res)=>{
    res.send("api is running");
})

module.exports = app
