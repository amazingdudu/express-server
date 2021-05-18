const express = require('express');
const multer = require('multer');

const router = express.Router();

const allowedFileExt = ['png', 'jpg', 'jpeg', 'gif'];

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads');
    },
    filename(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 8
    }
}).single('file');

router.post('/upload', (req, res, next) => {
    upload(req, res, err => {
        console.log(req.file);
        if (err instanceof multer.MulterError) {
            return res.status(400).send(err.toString());
        }
        if (err) {
            return next(err);
        }
        res.send({
            code: 0,
            message: '图片上传成功'
        });
    });
});

module.exports = router;
