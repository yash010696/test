'use strict';
const config = require('config');
const multer = require('multer');
const express = require('express');
const router = express.Router({ caseSensitive: true });

const UserController = require('../controllers/user.controller');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.images.upload_path)
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + '_' + file.originalname);
    }
})

let upload = multer({ storage: storage })

router.get('/list', UserController.getUserList)
    .post('/create', upload.single('profileImage'), UserController.createUser)
    .put('/update', upload.single('profileImage'), UserController.updateUser)
    .delete('/delete', UserController.deleteUser);

module.exports = router;