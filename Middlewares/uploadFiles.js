const multer = require('multer')

const FILE_TYPE = {
    'image/jpeg': 'jpeg',
    'image/png': 'png',
    'image/jpg': 'jpg',
}


const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE[file.mimetype]
        let uploadError = new Error('Invalid file type')
        if(isValid){
            uploadError = null
        }
      cb(uploadError, './uploads/images')
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.replace(' ', '-')
      cb(null, `${Date.now()}-${fileName}`)
    }
  })
  
  const uploadFiles = multer({ storage: diskStorage })

  module.exports = uploadFiles