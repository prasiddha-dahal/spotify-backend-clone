const imageKit = require('../config/imagekit')
const songModel = require('../models/song.model')

const uploadSong = async(req,res) => {
    try{
        
        const {title} = req.body;

        const file = req.file;   // this comes form multer

        const audioResponse = await imageKit.files.upload({    //uploads it to imagekit cloud storage and it returns url
            file: file.buffer.toString("base64"),
            fileName: file.originalname
        })

        const song = await songModel.create({
            title,
            artist: req.user.id,
            audioUrl : audioResponse.url
        });

        res.status(201).json({
            message:"song uploaded successfully",
            song
        })

    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {uploadSong}
