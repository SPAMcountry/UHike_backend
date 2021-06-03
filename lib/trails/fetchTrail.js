'use strict';

const TrailModel = require('../Model/Model.js');
const verifyToken = require('../modules/auth0.js');

const Trail = {};

Trail.getTrailData = async function (request, response) {
  const token = request.headers.authorization.split(' ')[1];
  verifyToken(token, getTrail);
  async function getTrail(user) {
    // console.log(user);
    const name = user.name;
    await TrailModel.find({ name }, (err, person) => {
      if (err) console.error(err);
      if (!person.length) {
        person[0] = { name, trail: [] }
        const newTrailModel = new TrailModel(person[0])
        newTrailModel.save();
      }
     
    });
  }
}

Trail.addTrailData = async function (request, response) {
  const token = request.headers.authorization.split(' ')[1];
  verifyToken(token, addTrail);
  async function addTrail(user) {
    const name = user.name;

    const { newTrailName, newTrailRating, newTrailRegion, newTrailThumb } = request.query;
    await TrailModel.find({ name }, (err, person) => {
      if (err) console.error(err);
      person[0].trail.push({ name: newTrailName, rating: newTrailRating, region: newTrailRegion, thumbnail: newTrailThumb });
      person[0].save();
      response.send(person[0].trail);
    });
  }
}

Trail.deleteTrailData = async function (request, response) {
  const token = request.headers.authorization.split(' ')[1];
  verifyToken(token, getTrail);
  async function getTrail(user) {{
    const index = parseInt(request.params.index);
    const name = user.name;

    await TrailModel.find({ name }, (err, person) => {
      if (err) console.error(err);
      const newTrailArray = person[0].trail.filter((trails, i) => i !== index);
      person[0].trail = newTrailArray;
      person[0].save();
      response.send(person[0].trail);
    });
  }
}

module.exports = Trail;

