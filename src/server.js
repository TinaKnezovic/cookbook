const express = require('express');
const cors = require('cors');
const multer = require('multer');

const server = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
server.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    cb(null, 'images');
  },
  filename: (request, file, cb) => {
    cb(null, request.body.fileName);
  },
});

const upload = multer({ storage: storage }).single('file');

server.post('/upload', (request, response) => {
  upload(request, response, (error) => {
    if (error instanceof multer.MulterError || error) {
      return response.status(500).json(error);
    }
    return response.status(200).send(request.file);
  });
});

server.listen(8000, () => {
  console.log('Image upload server running on port 8000...');
});
