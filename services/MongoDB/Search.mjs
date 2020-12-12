/* ################ Services ################ */
import {Init} from './Init.mjs';

/* ################ Controller ################ */
import ctrlLib from '../../controller/lib.mjs';


/** Search data */
export class Search {
  /** Get MongoDB connection */
  constructor() {
    const config = ctrlLib.getConfig();
    this.collection = config.MongoDB.collection;
  }; // constructor(){


  /**
   * Get user details by searching token
   * @param {string} token - Auth Token
  */
  async getUserDetails(token) {
    if (!token) return false;

    const MongoDB = await new Init().connect();
    const r = await MongoDB.db.collection(this.collection.user).findOne(
        {'token': token},
    );

    MongoDB.client.close();
    return r;
  }; // async getUserDetails(token) {


  /**
   * Get room details by searching room ID
    * @param {string} roomID
  */
  async getRoomDetails(roomID) {
    if (!roomID) return false;

    const MongoDB = await new Init().connect();
    const r = await MongoDB.db.collection(this.collection.rooms).findOne(
        {'id': roomID?.toString()},
    );

    MongoDB.client.close();
    return r;
  }; // async getRoomDetails(roomID) {
}; // export class Search {
