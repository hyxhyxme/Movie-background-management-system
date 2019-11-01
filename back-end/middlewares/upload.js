const multer = require('multer')
const path = require('path')
const randomstring = require('randomstring')

/* const upload =  multer({
    dest : path.resolve(__dirname, '../public/uploads')
}) */

const mimetypeMap = {
    'image/png':'.png',
    'image/jpg':'.jpg',
    'image/jpeg':'.jpeg',
    'image/gif':'.gif',
}
let filename = ''
const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, path.resolve(__dirname, '../public/uploads'))
    },
    filename : function(req, file, cb){
        let {fieldname , mimetype} = file
        filename = fieldname + '-' + randomstring.generate(6)+mimetypeMap[mimetype]
        cb(null, filename)
    }
})

const upload = multer({
    storage,
}).single('movieLogo')

module.exports = (req,res,next)=>{
    upload(req,res,(err)=>{
        req.filename = filename
        next()
    })
}

/* module.exports = ((req, res, next)=>{
    return upload.single('movieLogo')
})() */