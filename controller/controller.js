'use strict'
const socketio = require('../services/socketio');

const controller = {

  rootConnect: async (http) => { return await socketio.rootConnect(http); }

};

module.exports = controller;
