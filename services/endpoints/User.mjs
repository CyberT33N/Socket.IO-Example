/* ################ Controller ################ */
import ctrlMongoDB from '../../controller/mongodb.mjs';

/** functions that will get executed when endpoint was called. */
class Lib {
  /**
   * Check if usertoken is valid and then send response with User details.
   * @param {object} req - Request from endpoint getUserDetails.
   * @param {object} res - Response from endpoint getUserDetails.
  */
  async getUserDetails(req, res) {
    const bodyUserToken = req?.body?.usertoken;
    const queryUserToken = req?.query?.usertoken;

    if (!bodyUserToken && !queryUserToken) {
      return res.status(404).json({msg: 'User Token can not be null'});
    };

    const usertoken = bodyUserToken || queryUserToken;
    const UserDetails = await ctrlMongoDB.getUserDetails(usertoken);

    if ( UserDetails ) res.status(200).json( UserDetails );
    else res.status(403).json({msg: 'User Token was not found in Database'});
  }; // async getUserDetails(req, res) {
}; // class Lib {


/** Endpoint Listener which are related to the User. */
export class User extends Lib {
  /**
   * super class Lib and create globals
   * @param {object} app - Express app
  */
  constructor(app) {
    super();
    this.app = app;
  };


  /** Listener for POST request "getUserDetails". */
  getUserDetailsPOST() {
    this.app.post('/api/getUserDetails', async (req, res)=>{
      await this.getUserDetails(req, res);
    });
  }; // getUserDetailsPOST(app){
}; // class User extends Lib{
