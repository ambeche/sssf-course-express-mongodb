'use strict';
// catController
const catModel = require('../models/catModel');

const cats = catModel.cats;

const getCatList = (req, res) => {
  res.json(cats);
};

const getCat = (req, res) => {
  const id = req.params.id;
  const querriedCat = cats.filter((cat) => cat.id === id);
  console.log(querriedCat);

  querriedCat ?
    res.json(querriedCat) :
    res.status(404).send('invalid id');
};

const uploadCatImage = (req, res) => {
  console.log('cat image', req.files);
  console.log('body part', req.body.body);
};


module.exports = {
  getCatList,
  getCat,
  uploadCatImage,
};
