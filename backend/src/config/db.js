const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected to db succesfully")
    }catch(error){
        console.error("db connection error: "+error.message)
        process.exit(1) // failure shutdown of server 
    }
}

module.exports = connectDB

