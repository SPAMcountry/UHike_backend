'use strict';

const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
  name: { type: String},
  region: { type: String},
  rating: { type: Number},
  thumbnail: { type: String},
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trail: [trailSchema]
});

const TrailModel = mongoose.model('user', userSchema);

module.exports = TrailModel;
