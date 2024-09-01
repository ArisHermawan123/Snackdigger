const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, '/backend/public/images');
  },
  filename: function (req, file, callBack) {
    callBack(null, file.originalname);
  },
});

const fileFilter = (req, file, callBack) => {
  const allowedFormats = [
    'image/jpg',
    'image/jpeg',
    'image/png',
    'image/svg+xml',
  ];

  if (allowedFormats.includes(file.mimetype)) {
    callBack(null, true);
  } else {
    const res = {
      status: 400,
      description: 'Bad Request',
      result: 'Only JPEG, PNG and SVG',
    };

    callBack(JSON.stringify(res, null, 2), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
