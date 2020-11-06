'use strict'

        const log = require('fancy-log'),
   chalkAnimation = require('chalk-animation'),
         gradient = require('gradient-string'),
            chalk = require('chalk'),

controllermongodb = require('../controller/controller-mongodb');






const services = {

  getUserDetails: async (req, res) => { return await getUserDetails(req, res); },
  getRoomDetails: async (req, res) => { return await getRoomDetails(req, res); }

};

module.exports = services;


















async function getUserDetails(req, res){
log( 'getUserDetails() - SSL: ' + req?.secure + '\nRequest Body: ' + JSON.stringify(req?.body, null, 4) + '\nRequest Query: ' + JSON.stringify(req?.query, null, 4) + '\nHeader: ' + JSON.stringify(req?.headers, null, 4)  );

  if(!req?.body?.usertoken){
    res.status(404).json( { msg: "User Token can not be null" } );
    return;
  } // if(!msg?.usertoken){

  const UserDetails = await controllermongodb.getUserDetails(req?.body?.usertoken);

  if( UserDetails ) res.status(200).json( UserDetails );
  else res.status(403).json( { msg: "User Token was not found in Database" } );

}; // async function getUserDetails(){


















async function getRoomDetails(req, res){
log( 'getRoomDetails() - SSL: ' + req?.secure + '\nRequest Body: ' + JSON.stringify(req?.body, null, 4) + '\nRequest Query: ' + JSON.stringify(req?.query, null, 4) + '\nHeader: ' + JSON.stringify(req?.headers, null, 4)  );

  if(!req?.body?.id){
    res.status(404).json( { msg: "Room ID can not be null" } );
    return;
  } // if(!msg?.id){

  const roomDetails = await controllermongodb.getRoomDetails(req?.body?.id);

  if( roomDetails ) res.status(200).json( roomDetails );
  else res.status(403).json( { msg: "Room ID was not found in Database" } );

}; // async function getRoomDetails(){
