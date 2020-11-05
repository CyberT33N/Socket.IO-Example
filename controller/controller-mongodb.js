'use strict'
const mongodb = require('../services/mongodb');

const controller = {

  connectMongoDB: async () => { return await mongodb.connectMongoDB(); },

  storeMessages: async (msg) => { return await mongodb.storeMessages(msg); },

  getUserDetails: async (token) => { return await mongodb.getUserDetails(token); },
  getRoomDetails: async (roomID) => { return await mongodb.getRoomDetails(roomID); }

};

module.exports = controller;
