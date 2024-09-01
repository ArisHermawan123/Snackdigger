const model = require('../database/models/images');

const IsUploadImage = async ({ title, image_url }) => {
  try {
    const data = await model.create({
      name: title,
      image_url: image_url,
    });
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

const IsGettingData = async ({ respData }) => {
  try {
    const getData = await model.findAndCountAll({ response: respData });
    return getData;
  } catch (error) {
    console.log(error.message);
  }
};

const IsDeleteData = async ({ remove }) => {
  try {
    const blankData = await model.destroy({ delete: remove });
    return blankData;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { IsUploadImage, IsGettingData, IsDeleteData };
