const service = require('./upload.service');
const uploadFile = require('../middlewares/upload/cloudinary');
const response = require('../utils/responses');
const Product = require('../database/models/images');
const fs = require('fs');

const IsUploadImage = async (req, res) => {
  try {
    const { file } = req;
    const name = req.body;
    const upload = await uploadFile(
      file.path,
      'your folder path you have created on cloudinary.'
    );

    if (file === null)
      return response(res, 400, { message: 'No image uploaded' });

    const { name: title } = name;
    const { secure_url: image_url } = upload;

    const result = await service.IsUploadImage({
      title,
      image_url,
    });
    return response(res, 201, result);
  } catch (error) {
    console.log(error.message);
    return response(res, 500, error.message);
  }
};

const IsGettingData = async (req, res) => {
  try {
    const data = await Product.findAndCountAll();
    const respData = res.status(200).json({ data: data.rows });
    return respData;
  } catch (error) {
    console.log(error.message);
    return response(res, 404, error.message);
  }
};

const IsDeleteData = async (req, res) => {
  try {
    const deleteData = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });
    const remove = await deleteData.destroy({
      where: {
        id: req.params.id,
      },
    });
    return response(res, 200, 'berhasil', { remove: remove });
  } catch (error) {
    console.log(error.message);
    return response(res, 400, error.message);
  }
};

module.exports = { IsUploadImage, IsGettingData, IsDeleteData };
