const express = require('express');
const server = express();
const cors = require('cors');
const { resolve } = require('path');
// const fileUplaod = require('express-fileupload');
const response = require('./src/utils/responses');
const db = require('./src/database/config/db.config');
const port = process.env.APP_PORT;
const router = require('./src/routes/routes');

server.use(cors());
server.use(express.json());
server.use('/static', express.static(resolve('public')));
server.use(express.urlencoded({ extended: true }));
server.use(router);

server.all('*', (req, res, next) => {
  response(res, 404, 'Page not found.');
});

db.authenticate()
  .then(() => {
    server.listen(port, () => {
      console.log('DB connected');
      console.log(`Server is running on ${process.env.BASE_URL}\n`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
