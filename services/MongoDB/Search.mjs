/* ################ Services ################ */
import {Init} from './Init.mjs';

/* ################ Controller ################ */
import ctrlLib from '../../controller/lib.mjs';


/** Subclass of Search which contains lib functions */
class Lib {
  /**
   * Find data by using search query and return result.
   * @param {string} collection - Name of collection
   * @param {object} query - Search query
  */
  async findOne(collection, query) {
    return await this.connection.db.collection(collection).findOne(query);
  }; // async findOne() {
}; // class Lib {


/** Search data */
export class Search extends Lib {
  /** Get MongoDB connection details */
  constructor() {
    super();

    const config = ctrlLib.getConfig();
    this.userCollection = config.MongoDB.collection.user;
    this.roomCollection = config.MongoDB.collection.rooms;

    this.connection = new Init().getConnection();
  }; // constructor(){


  /**
   * Get user details by searching token
   * @param {string} token - Auth Token
  */
  async getUserDetails(token) {
    if (!token) return {code: 'User Token can not be undefined'};
    return await this.findOne(this.userCollection, {'token': token});
  }; // async getUserDetails(token) {


  /**
   * Get room details by searching room ID
    * @param {string} roomID
  */
  async getRoomDetails(roomID) {
    if (!roomID) return {code: 'Room ID can not be undefined'};
    return await this.findOne(this.roomCollection, {'id': roomID.toString()});
  }; // async getRoomDetails(roomID) {
}; // export class Search {
