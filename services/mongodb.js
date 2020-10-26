'use strict'


         const fs = require('fs'),
      json_config = JSON.parse(  fs.readFileSync('./admin/config.json', 'utf8')  ),
              log = require('fancy-log'),
   chalkAnimation = require('chalk-animation'),
         gradient = require('gradient-string'),
            chalk = require('chalk'),

      MongoClient = require('mongodb').MongoClient,
           assert = require('assert'),
         ObjectId = require('mongodb').ObjectId,
   MongoDB_DB_URL = json_config.MongoDB_DB_URL,
  MongoDB_DB_NAME = json_config.MongoDB_DB_NAME;
  var MongoDB, client;










log( 'MongoDB_DB_URL: ' + MongoDB_DB_URL );
MongoClient.connect(MongoDB_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, function(e, client) {
console.log( gradient('white', 'black')('\n\n=======================================\n\n') );

   if(e){
     log( chalk.red.bold('❌ ERROR') + ' Error while try to connect to MongoDB Database - ' + chalk.white.bold('error:\n') + e );
     //assert.equal(null, e);
     return;
   } //   if(e){

     log( 'MongoDB - Connected successfully to server..' );
     MongoDB = client.db( MongoDB_DB_NAME );

});





















const mongodb = {

      storeMessages: async function(msg) { return await storeMessages(msg); },

      getUserDetails: async function(token) { return await getUserDetails(token); },
      getRoomDetails: async function(roomID) { return await getRoomDetails(roomID); }

};

module.exports = mongodb;












async function storeMessages(msg){
log( 'storeMessages() - msg: ' + JSON.stringify(msg, null, 4) );

      const collection = MongoDB.collection('rooms');


      const match = await collection.find( {"id": msg.room} ).toArray({});
      log( 'storeMessages() - match:' + JSON.stringify(match, null, 4) );
      if( !match[0] ){ return 'NOT FOUND'; }

      if(!match[0].msg) match[0].msg = [];
      match[0].msg.push({"msg": msg.msg, "usertoken": msg.usertoken, "date": msg.date});
      log( 'match[0].msg: ' + JSON.stringify(match[0].msg, null, 4) );

      const query = { id: msg.room };
      const newValue = { $set: { msg: match[0].msg } };

      const r = await collection.updateOne(query, newValue);
      log( 'storeMessages() - result:' + JSON.stringify(r, null, 4) );
      if( r.result.n == 1 ) return r;

}; // async function storeMessages(token){













async function getUserDetails(token){
log( 'getUserDetails() - token: ' + token );

      const collection = MongoDB.collection('user');
      const r = await collection.find( {"token": token} ).toArray({});
      if( r[0] ){ return r; }

}; // async function getUserDetails(token){





  async function getRoomDetails(roomID){
  log( 'mongodb.js - getRoomDetails() - roomID: ' + roomID );

        const collection = MongoDB.collection('rooms');
        const r = await collection.find( {"id": roomID.toString()} ).toArray({});
        if( r[0] ){ return r; }

  }; // async function getRoomDetails(token){
