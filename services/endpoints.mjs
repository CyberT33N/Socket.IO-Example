/*################ Controller ################*/
import controllermongodb from '../controller/mongodb.mjs';

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';









export const getUserDetails = async (req, res)=>{
/*log(`getUserDetails() - SSL: ${req?.secure}
Request Body: ${JSON.stringify(req?.body, null, 4)}
Request Query: ${JSON.stringify(req?.query, null, 4)}
Header: ${JSON.stringify(req?.headers, null, 4)}`);*/

  if(!req?.body?.usertoken && !req?.query?.usertoken) return res.status(404).json( { msg: "User Token can not be null" } );

  if(req?.body?.usertoken) var usertoken = req?.body?.usertoken;
  if(req?.query?.usertoken) var usertoken = req?.query?.usertoken;

  const UserDetails = await controllermongodb.getUserDetails(usertoken);

  if( UserDetails ) res.status(200).json( UserDetails );
  else res.status(403).json( { msg: "User Token was not found in Database" } );

}; // async function getUserDetails(){









export const getRoomDetails = async (req, res)=>{
/*log(`getRoomDetails() - SSL: ${req?.secure}
Request Body: ${JSON.stringify(req?.body, null, 4)}
Request Query: ${JSON.stringify(req?.query, null, 4)}
Header: ${JSON.stringify(req?.headers, null, 4)}`);*/

  if(!req?.body?.id && !req?.query?.id) return res.status(404).json( { msg: "Room ID can not be null" } );

  if(req?.body?.id) var roomID = req?.body?.id;
  if(req?.query?.id) var roomID = req?.query?.id;

  const roomDetails = await controllermongodb.getRoomDetails(roomID);

  if( roomDetails ) res.status(200).json( roomDetails );
  else res.status(403).json( { msg: "Room ID was not found in Database" } );

}; // async function getRoomDetails(){
