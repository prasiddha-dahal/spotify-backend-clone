const express = require('express')
const {registerUser,loginUser} = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const isArtist = require('../middlewares/role.middleware')

const router = express.Router();

router.post('/register',registerUser)
router.post('/login',loginUser)

router.post('/upload-song',authMiddleware, isArtist)

module.exports = router
