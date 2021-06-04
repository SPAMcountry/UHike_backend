'use strict';


// const verifyToken = require('../modules/auth0.js');
const TrailModel = require('../Model/Model.js'); 
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { response } = require('express');

const client = jwksClient({
  jwksUri: 'https://dev-qttzuf0f.us.auth0.com/.well-known/jwks.json',
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyToken(token, callback) {
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      console.error('Something went wrong');
      return callback(err);
    }
    callback(user);
  });
}

const Trail = {};

Trail.getAllTrail = async function (request, response) {
  const token = request.headers.authorization.split(' ')[1];
  verifyToken(token, getTrail);

  async function getTrail(user) {
    console.log(user, 'user line 38 console');
    const email = user.email;

    await TrailModel.find({ email }, (err, person) => {
      if (err) console.error(err);
      if (!person.length) {
        person[0] = { email, trail: [] }
        const newTrail = new TrailModel(person[0])
        newTrail.save();
      }
      response.send(person[0].trail)
     
    });
  }
}
Trail.AddTrail = async function (request, response) {
  const token = request.headers.authorization.split(' ')[1];
  console.log(token);
  verifyToken(token, addATrail); 

  async function addATrail(user) {

    const email = user.email; 
    const {nameOfTrail, trailRegion, trailRating, trailThumbnail, id} = request.query; 
    console.log({user})
    console.log(request.query);
    const test = await TrailModel.find({})
    console.log(test)
    await TrailModel.find({email}, (err, person) => {
      
      if(err) console.error(err);
      console.log(person);
        person[0].trail.push({name: nameOfTrail, region: trailRegion, rating: trailRating, thumbnail: trailThumbnail, id: id});
        console.log({name: nameOfTrail});
        person[0].save();
        response.send(person[0].trail);
    })
  }
}
Trail.addUser = async function (request, response) {
  const token = request.headers.authorization.split(' ')[1];
  console.log(token, 'token console log');
  verifyToken(token, addUsers);
  
  async function addUsers(user){
  const email = user.email; 
  console.log(email)
  const userCheck = await TrailModel.find({email})
  let userToReturn; 
    if(userCheck.length < 1 ){
      console.log('line 88 fetchtrail')
      let newUser = await new TrailModel({email})
      newUser.save();
      userToReturn = newUser; 
      
    } else{
      console.log('fetchtrail 93')
      userToReturn = userCheck[0];
    }
    console.log(userToReturn, 'usertoreturn')
    response.send(userToReturn); 
  }
} 

// Trail.deleteATrail = async function (request, response) {
//   const token = request.headers.authorization.split(' ')[1];
//   console.log({token});
//   verifyToken(token, deleteTrail);

//   async function deleteTrail(user) {{
//     const indexNum = request.params.index;
//     console.log(index, 'console 109');
//     const index = parseInt(indexNum)
//     const email = user.email;

//     await TrailModel.find({ email }, (err, person) => {
//       if (err) console.error(err);
//       const newTrailArray = person[0].trail.filter((trails, i) => i !== index);
//       person[0].trail = newTrailArray;
//       person[0].save();
//       response.send('Success');
//     });
//   }
// }
// }
module.exports = Trail;

