'use strict'


const mongodb = require('../services/mongodb');

const controller = {

   storeMessages: async function(msg) { return await mongodb.storeMessages(msg); },

   getUserDetails: async function(token) { return await mongodb.getUserDetails(token); },
   getRoomDetails: async function(roomID) { return await mongodb.getRoomDetails(roomID); }

};

module.exports = controller;
