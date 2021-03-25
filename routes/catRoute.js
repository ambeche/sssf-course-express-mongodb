'use strict';
// catRoute
const express = require('express');
const multer = require('multer');
const catController = require('../controllers/catController.js');
const catRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, done) => done(null, './uploads'),
  filename: (req, file, done) => done(null, file.originalname),
});
const upload = multer({storage: storage});

catRouter.route('/')
    .get( catController.getCatList)
    .post(catController.createCat);
// .post( upload.single('cat'), catController.uploadCatImage);

catRouter.route('/:id')
    .get(catController.getCat)
    .patch(catController.modifyCat)
    .delete(catController.deleteCat);

module.exports = catRouter;
