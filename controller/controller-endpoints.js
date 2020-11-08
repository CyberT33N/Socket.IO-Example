'use strict'
const endpoints = require('../services/endpoints');

const controller = {
  getUserDetails: async (req, res)=>{ return await endpoints.getUserDetails(req, res); },
  getRoomDetails: async (req, res)=>{ return await endpoints.getRoomDetails(req, res); }
};

module.exports = controller;
