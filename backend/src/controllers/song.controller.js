const imagekit = require('../config/imagekit');
const songModel = require('../models/song.model')

const uploadSong = async (req, res) => {
    try {

        const { title } = req.body;

        const file = req.file;   // this comes form multer

        const audioResponse = await imagekit.files.upload({    //uploads it to imagekit cloud storage and it returns url
            file: file.buffer.toString("base64"),
            fileName: file.originalname
        })

        console.log(audioResponse)

        const song = await songModel.create({
            title,
            artist: req.user.id,
            audioUrl: audioResponse.url,
            fileId: audioResponse.fileId
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
        const songs = await songModel.find().limit(3).populate("artist", "username email"); // what populate does here is , we can fetch the 
        //   username and email of the artist who upladed the songs in and array of objects
        //   limit(3) only fetch 3 songs form the db

        if (!songs) {
            return res.status(404).json({
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

        if (!song) {
            return res.status(404).json({
                message: "no songs found by this id"
            })
        }

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

const deleteSong = async (req, res) => {

    try {
        const { id } = req.params;

        const song = await songModel.findById(id);

        if (!song) {
            return res.status(404).json({
                message: "no song found"
            })
        }

        //check owernship

        if (req.user.id !== song.artist.toString()) {
            return res.status(403).json({
                message: "unauthorized"
            })
        } else {
            console.log("authorized")
        }

        await imagekit.files.delete(song.fileId);   //file id needed to delete it form imagekit 

        await songModel.findByIdAndDelete(id);   //delete form the db

        res.status(200).json({
            message: "song deleted successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const searchSong = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({
                message: "search query is required"
            })
        }

        const songs = await songModel.find({
            title: { $regex: q, $options: "i" }
        }).populate("artist", "username email");

        res.status(200).json({
            message: "search results",
            songs
        });


    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getMySongs = async (req, res) => {
    try {

        const songs = await songModel.find({ artist: req.user.id }).populate("artist", "username email");

        res.status(200).json({
            message: "my songs fetched",
            songs
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = { uploadSong, getAllSongs, getSingleSong, deleteSong, searchSong ,getMySongs}
