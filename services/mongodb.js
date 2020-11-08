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
MongoDB_DB_NAME = json_config.MongoDB_DB_NAME,
       services = {

        connectMongoDB: async () => { return await connectMongoDB(); },

        storeMessages: async (msg) => { return await storeMessages(msg); },

        getUserDetails: async (token) => { return await getUserDetails(token); },
        getRoomDetails: async (roomID) => { return await getRoomDetails(roomID); }

       }; module.exports = services;

var MongoDB;











async function connectMongoDB(){ log('connectMongoDB() - Database URL: ' + MongoDB_DB_URL);

  try { // connect to MongoDB Database and create global MongoDB variable
    const client = await MongoClient.connect(MongoDB_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    MongoDB = client.db(MongoDB_DB_NAME);
    return true;
  } catch (e) { log( chalk.red.bold('❌ ERROR') + ' Error while try to connect to MongoDB Database - ' + chalk.white.bold('error:\n') + e ); }

}; // async function connectMongoDB(){










// msg => {"msg": msg, "room": details.room, "usertoken": details.usertoken}
async function storeMessages(msg){ log( 'storeMessages() - msg: ' + JSON.stringify(msg, null, 4) );

  const collection = MongoDB.collection('rooms');

  // check if msg object has NPE
  if( !msg?.msg || !msg?.room || !msg?.usertoken ) return {msg: 'NPE'};

  // check if room can be found in collection
  const match = await collection.findOne( {"id": msg.room} );
  if( !match ) return {msg: 'ROOM ID NOT FOUND'};
  //log( 'storeMessages() - match:' + JSON.stringify(match, null, 4) );


  // push our current msg object to the already existing one from our room field
  // if chat was empty we will create new array
  if(!match.msg) match.msg = [];
  match.msg.push({"msg": msg.msg, "usertoken": msg.usertoken, "date": msg.date});
  //log( 'match[0].msg: ' + JSON.stringify(match[0].msg, null, 4) );


  // update our room field with the new data
  const query = { id: msg.room };
  const newValue = { $set: { msg: match.msg } };

  const r = await collection.updateOne(query, newValue);
  log( 'storeMessages() - result:' + JSON.stringify(r, null, 4) );
  if( r.result.n ) return {code : "SUCCESS"};
  return {code : "ERROR"};

}; // async function storeMessages(token){










async function getUserDetails(token){ log( 'getUserDetails() - token: ' + token );

  const collection = MongoDB.collection('user');

  // search for token inside of user collections
  if(!token) return false;
  return await collection.findOne( {"token": token} );

}; // async function getUserDetails(token){


async function getRoomDetails(roomID){ log( 'mongodb.js - getRoomDetails() - roomID: ' + roomID );

  const collection = MongoDB.collection('rooms');

  // search for Room ID inside of rooms collections
  if( !roomID ) return false;
  return await collection.findOne( {"id": roomID?.toString()} );

}; // async function getRoomDetails(token){
