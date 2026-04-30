const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },

    audioUrl: {
        type: String,
        required: true
    }
},{timestamps : true});
    
module.exports = mongoose.model("Song", songSchema)
