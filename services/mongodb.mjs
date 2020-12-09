/*################ Controller ################*/
import controllerLib from '../controller/lib.mjs';

/*################ MongoDB ################*/
import mongodb from 'mongodb';
import assert from 'assert';

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';


var MongoDB;




export class Init{

  constructor(){
    const config = controllerLib.getConfig();
    this.MongoURL = config.MongoDB.url;
    this.MongoName = config.MongoDB.dbname;
    ({MongoClient: this.MongoClient, ObjectId: this.ObjectId} = mongodb);
  }; // constructor(){


  async connect(){ log('connectMongoDB() - Database URL: ' + this.MongoURL);
    try { // connect to MongoDB Database and create global MongoDB variable
      const client = await this.MongoClient.connect(this.MongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
      MongoDB = client.db(this.MongoName);
      return true;
    } catch (e) { log( `${chalk.red.bold('❌ ERROR')} while try to connect to MongoDB Database - ${chalk.white.bold('error:\n')} ${e}` ); }
  }; // async connect(){

}; // class Init{










// msg=>{"msg": msg, "room": details.room, "usertoken": details.usertoken}
export const storeMessages = async msg=>{ log( 'storeMessages() - msg: ' + JSON.stringify(msg, null, 4) );

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











class SearchLib {

  async findOne(collection, data){ //log(`class SearchLib - findOne() - Search data: ${JSON.stringify(data, null, 4)}`);
    return await collection.findOne( data );
  }; // async findOne(){

}; // class SearchLib {


export class Search extends SearchLib {

  constructor(){ log('class Search - constructor()');
    super();
  }; // constructor(){

  async getUserDetails(token){ log( 'getUserDetails() - token: ' + token );
    if(!token) return false;
    return await this.findOne(MongoDB.collection('user'), {"token": token});
  }; // async getUserDetails(token){

  async getRoomDetails(roomID){ log( 'mongodb.js - getRoomDetails() - roomID: ' + roomID );
    if(!roomID) return false;
    return await this.findOne(MongoDB.collection('rooms'), {"id": roomID?.toString()});
  }; // async getRoomDetails(roomID){

}; // export class Search extends SearchLib {
