/* ################ Services ################ */
import {Update} from './Update.mjs';
import {Init} from './Init.mjs';

/* ################ Controller ################ */
import ctrlLib from '../../controller/lib.mjs';


/** Store data */
export class Store {
  /** Get MongoDB collection name */
  constructor() {
    const config = ctrlLib.getConfig();
    this.roomCollection = config.MongoDB.collection.rooms;

    this.connection = new Init().getConnection();
  }; // constructor(){


  /**
   * Store room chat message
   * {"msg": msg, "room": details.room, "usertoken": details.usertoken}
   * @param {object} msg - Chat Message which structure is above.
  */
  async roomMsg(msg) {
    const collection = this.connection.db.collection(this.roomCollection);

    if (!msg?.msg || !msg?.room || !msg?.usertoken) return {code: 'NPE'};

    // check if room can be found in collection
    const match = await collection.findOne({'id': msg.room});
    if (!match) return {code: 'ROOM ID NOT FOUND'};

    /* Push our current msg object to the already existing one
    from our room field. If chat was empty we will create new array */
    if (!match.msg) match.msg = [];
    match.msg.push({
      'msg': msg.msg,
      'usertoken': msg.usertoken,
      'date': msg.date,
    });

    // update our room field with the new message
    return await new Update().updateOne(
        collection,
        {id: msg.room},
        {$set: {msg: match.msg}},
    ); // return await new Update.updateOne(
  }; // async roomMsg(msg){
}; // export class Store{
