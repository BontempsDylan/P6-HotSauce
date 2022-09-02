/*
* objectif => configure multer for image's gestion 
*/

const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const maxSize = 1 * 2000 * 2000  //2MB

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension)
    }
});

module.exports = multer({ 
    storage: storage,
    fileFilter: (req, file, callback) => {
        callback(null, Object.keys(MIME_TYPES).includes(file.mimetype));
    },
    limits: {fileSize: maxSize}
}).single('image');