'use strict';
// catController
const catModel = require('../models/catModel');
const Cat = require('../models/catModel');

const createCat = async (req, res) => {
  const body = req.body;
  console.log(body);
  try {
    const createdCat = await Cat.create({
      name: body.name,
      age:  body.age,
      gender: body.gender,
      color: body.color,
      weight: body.weight,

    });
    console.log(createdCat);
    res.json({'cat added': createdCat});
  } catch (e) {
    res.send(`failed to create cat ${e}`);
  }

}

const getCatList = async (req, res) => {
  console.log('query', req.query);
  if (req.query.gender && req.query.weight && req.query.age) {
    // returns cat list filtered based on the provided query parameters
    const filteredCat = await Cat.find({
      gender: req.query.gender,
      age: {$gte: req.query.age, $lt: 40},
      weight: {$gte: req.query.weight},
    } );
    console.log('query', filteredCat);
    
    return res.json(filteredCat)
  }
  const cats = await Cat.find({})
  res.json(cats);
};


const getCat = async (req, res) => {
  const cat = await Cat.findById(req.params.id);
  console.log(cat);

  cat ?
    res.json(cat) :
    res.status(404).send('invalid id');
};

const modifyCat = async (req, res) => {
  const mod = await Cat.updateOne({ _id: req.params.id }, { name: req.body.name });
  res.status(200).send(`updated sucessfully ${mod.nModified} cat post`);
}

const deleteCat = async (req, res) => {
  const del = await Cat.deleteOne({ _id: req.params.id });
  res.status(204).json(del);
}


const uploadCatImage = (req, res) => {
  console.log('cat image', req.files);
  console.log('body part', req.body);
};


module.exports = {
  createCat,
  getCatList,
  getCat,
  modifyCat,
  deleteCat,
  uploadCatImage,
};
