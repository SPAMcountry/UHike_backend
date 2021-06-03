'use strict';


// const verifyToken = require('../modules/auth0.js');
const TrailModel = require('../Model/Model.js'); 
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: 'https://dev-nt37xvb0.us.auth0.com/.well-known/jwks.json',
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
    // console.log(user);
    const name = user.name;

    await TrailModel.find({ name }, (err, person) => {
      if (err) console.error(err);
      if (!person.length) {
        person[0] = { name, trails: [] }
        const newTrail = new TrailModel(person[0])
        newTrail.save();
      }
      response.send(person[0].trails)
     
    });
  }
}
Trail.AddTrail = async function (request, response) {
  const token = request.headers.authorization.split(' ')[1];
  console.log(token);
  verifyToken(token, addATrail); 

  async function addATrail(user) {
    const name = user.name; 
    const {nameOfTrail} = request.query; 

    await TrailModel.find({name}, (err, person) => {
      if(err) console.error(err);
        person[0].trails.push({name: nameOfTrail});
        person[0].save();
        response.send(person[0].trails);
    })
  }
}
// Trail.addTrailData = async function (request, response) {
//   const token = request.headers.authorization.split(' ')[1];
//   verifyToken(token, addTrail);
//   async function addTrail(user) {
//     const name = user.name;

//     const { newTrailName, newTrailRating, newTrailRegion, newTrailThumb } = request.query;
//     await TrailModel.find({ name }, (err, person) => {
//       if (err) console.error(err);
//       person[0].trail.push({ name: newTrailName, rating: newTrailRating, region: newTrailRegion, thumbnail: newTrailThumb });
//       person[0].save();
//       response.send(person[0].trail);
//     });
//   }
// }

// Trail.deleteTrailData = async function (request, response) {
//   const token = request.headers.authorization.split(' ')[1];
//   verifyToken(token, getTrail);
//   async function getTrail(user) {{
//     const index = parseInt(request.params.index);
//     const name = user.name;

//     await TrailModel.find({ name }, (err, person) => {
//       if (err) console.error(err);
//       const newTrailArray = person[0].trail.filter((trails, i) => i !== index);
//       person[0].trail = newTrailArray;
//       person[0].save();
//       response.send(person[0].trail);
//     });
//   }
// }
// }
module.exports = Trail;

