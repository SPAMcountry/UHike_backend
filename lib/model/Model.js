'use strict'

const mongoose = require('mongoose'); 

const trailSchema = new mongoose.Schema({
    name: {type: String}
})

const userSchema = new mongoose.Schema({

    name: {type: String},
    trails: [trailSchema], 
})

const UserModel = mongoose.model('Users', userSchema);

module.exports= UserModel; 