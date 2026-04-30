const multer = require('multer');

const storage = multer.memoryStorage();   //file is stored in ram
const upload = multer({ storage });   // this is a middleware function

module.exports = upload;  //imported and used by song.routes.js
