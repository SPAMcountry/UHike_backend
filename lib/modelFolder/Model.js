'use strict';
const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
name: { type: String},
region: { type: String},
rating: { type: Number},
thumbnail: { type: String},
id: {type: Number}
});
const userSchema = new mongoose.Schema({
email: { type: String},
trail: [trailSchema]
});
const TrailModel = mongoose.model('user', userSchema);

module.exports = TrailModel;