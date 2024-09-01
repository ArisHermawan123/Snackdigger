const express = require('express');
const uploadRoutes = express.Router();
const upload = require('../middlewares/upload/multer.middleware');
const controller = require('./upload.controller');

uploadRoutes.post('/upload', upload.single('image'), controller.IsUploadImage);
uploadRoutes.get('/get', controller.IsGettingData);
uploadRoutes.delete('/delete/:id', controller.IsDeleteData);

module.exports = uploadRoutes;
