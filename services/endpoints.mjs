/*################ Controller ################*/
import controllermongodb from '../controller/mongodb.mjs';

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';




class UserLib{

  async getUserDetails(req, res){
  /*
  log(`getUserDetails() - SSL: ${req?.secure}
  Request Body: ${JSON.stringify(req?.body, null, 4)}
  Request Query: ${JSON.stringify(req?.query, null, 4)}
  Header: ${JSON.stringify(req?.headers, null, 4)}`); //```
  */

    const bodyUserToken = req?.body?.usertoken;
    const queryUserToken = req?.query?.usertoken;

    if(!bodyUserToken && !queryUserToken) return res.status(404).json( { msg: "User Token can not be null" } );

    if(bodyUserToken) var usertoken = bodyUserToken;
    if(queryUserToken) var usertoken = queryUserToken;

    const UserDetails = await controllermongodb.getUserDetails(usertoken);
    //log('getUserDetails() - UserDetails: ' + JSON.stringify(UserDetails, null, 4));

    if( UserDetails ) res.status(200).json( UserDetails );
    else res.status(403).json( { msg: "User Token was not found in Database" } );

  }; // getUserDetails(req, res){

}; // class UserLib{


export class User extends UserLib{

  constructor(){ log('class UserLib - constructor()');
    super();
  }; // constructor(){


  // POST request where we take User Token and send back Object with User Details to Client
  getUserDetailsPOST(app){ log('class UserLib - getUserDetailsListener()');
    app.post('/api/getUserDetails', async (req, res)=>{
      await this.getUserDetails(req, res);
    });
  }; // getUserDetailsPOST(app){

}; // class User extends UserLib{












class RoomLib{

  async getRoomDetails(req, res){
  /*log(`getRoomDetails() - SSL: ${req?.secure}
  Request Body: ${JSON.stringify(req?.body, null, 4)}
  Request Query: ${JSON.stringify(req?.query, null, 4)}
  Header: ${JSON.stringify(req?.headers, null, 4)}`);*/

    const bodyID = req?.body?.id;
    const queryID = req?.query?.id;

    if(!bodyID && !queryID) return res.status(404).json( { msg: "Room ID can not be null" } );

    if(bodyID) var roomID = bodyID;
    if(queryID) var roomID = queryID;

    const roomDetails = await controllermongodb.getRoomDetails(roomID);

    if( roomDetails ) res.status(200).json( roomDetails );
    else res.status(403).json( { msg: "Room ID was not found in Database" } );

  }; // async getRoomDetails(req, res){

}; // class RoomLib{



export class Room extends RoomLib{

  constructor(){ log('class RoomLib - constructor()');
    super();
  }; // constructor(){

  // POST request where we take Room ID and send back Object with Room Details to Client
  getRoomDetailsPOST(app){ log('class RoomLib - detailsListener()');
    app.post('/api/getRoomDetails', async (req, res)=>{
      await this.getRoomDetails(req, res);
    });
  }; // getRoomDetailsPOST(app){

}; // export class Room extends RoomLib{
