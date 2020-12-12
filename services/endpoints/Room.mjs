/* ################ Controller ################ */
import ctrlMongoDB from '../../controller/mongodb.mjs';

/** functions that will get executed when endpoint was called. */
class Lib {
  /**
   * Check if room ID is valid and then send response with Room details.
   * @param {object} req - Request from endpoint getUserDetails.
   * @param {object} res - Response from endpoint getUserDetails.
  */
  async getRoomDetails(req, res) {
    const bodyID = req?.body?.id;
    const queryID = req?.query?.id;

    if (!bodyID && !queryID) {
      return res.status(404).json({msg: 'Room ID can not be null'});
    };

    const roomID = bodyID || queryID;
    const roomDetails = await ctrlMongoDB.getRoomDetails(roomID);

    if ( roomDetails ) res.status(200).json( roomDetails );
    else res.status(403).json( {msg: 'Room ID was not found in Database'} );
  }; // async getRoomDetails(req, res){
}; // class Lib{


/** Endpoint Listener which are related to the Rooms. */
export class Room extends Lib {
  /**
   * super class Lib and create globals
   * @param {object} app - Express app
  */
  constructor(app) {
    super();
    this.app = app;
  }; // constructor(){


  /** Listener for POST request "getRoomDetails". */
  getRoomDetailsPOST() {
    this.app.post('/api/getRoomDetails', async (req, res)=>{
      await this.getRoomDetails(req, res);
    });
  }; // getRoomDetailsPOST(app){
}; // export class Room extends Lib{
