'use strict';
const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: String,
  age: {
    type: Number,
    min: [0],
    max: [11],
  },
  genre: {
    type: String,
    enum: ['male', 'female'],
  },
  color: String,
  weight: Number,
});

catSchema.set('toJSON', {
  transform: (document, result) => {
    result.id = result._id.toString();
    delete result._id;
    delete result.__v;
  },
});

module.exports = mongoose.model('Cat', catSchema);
