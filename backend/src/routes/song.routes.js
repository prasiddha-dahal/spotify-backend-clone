const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');
const isArtist = require('../middlewares/role.middleware');
const { uploadSong } = require('../controllers/song.controller');
const upload = require('../middlewares/upload.middleware')
const router = express.Router();

router.post('/upload',authMiddleware,isArtist,upload.single('audio'),uploadSong) 

//upload.single('audio') its a multer middleware that returns 
/*
    req.file = {
  fieldname: 'audio',
  originalname: 'song.mp3',
  mimetype: 'audio/mpeg',
  buffer: <Buffer ...>,
  size: 123456
} 
 to the song controller
*/


module.exports = router
