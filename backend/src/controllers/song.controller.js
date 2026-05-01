const imageKit = require('../config/imagekit')
const songModel = require('../models/song.model')

const uploadSong = async (req, res) => {
    try {

        const { title } = req.body;

        const file = req.file;   // this comes form multer

        const audioResponse = await imageKit.files.upload({    //uploads it to imagekit cloud storage and it returns url
            file: file.buffer.toString("base64"),
            fileName: file.originalname
        })

        const song = await songModel.create({
            title,
            artist: req.user.id,
            audioUrl: audioResponse.url
        });

        res.status(201).json({
            message: "song uploaded successfully",
            song
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAllSongs = async (req, res) => {
    try {
        const songs = await songModel.find().populate("artist", "username email"); // what populate does here is , we can fetch the 
        //   username and email of the artist who upladed the songs in and array of objects
        
        if(!songs){
            res.status(404).json({
                message: "song not found"
            })
        }

        res.status(200).json({
            message: "songs fetched successfully",
            songs
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getSingleSong = async (req, res) => {
    try {

        const { id } = req.params;
        const song = await songModel.findById(id).populate("artist", "username email")

        res.status(200).json({
            message: "song fetched successfully",
            song
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = { uploadSong, getAllSongs, getSingleSong }
