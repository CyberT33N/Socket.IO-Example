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
  }; // constructor(){

  /**
   * Store room chat message
   * {"msg": msg, "room": details.room, "usertoken": details.usertoken}
   * @param {object} msg - Chat Message which structure is above.
  */
  async roomMsg(msg) {
    const connection = new Init().getConnection();
    const collection = connection.db.collection(this.roomCollection);

    // check if msg object has NPE
    if (!msg?.msg || !msg?.room || !msg?.usertoken) return {msg: 'NPE'};

    // check if room can be found in collection
    const match = await collection.findOne({'id': msg.room});
    if (!match) return {msg: 'ROOM ID NOT FOUND'};

    /* Push our current msg object to the already existing one
    from our room field. If chat was empty we will create new array */
    if (!match.msg) match.msg = [];
    match.msg.push({
      'msg': msg.msg,
      'usertoken': msg.usertoken,
      'date': msg.date,
    });

    // update our room field with the new message
    return await new Update(
        collection,
        {id: msg.room},
        {$set: {msg: match.msg}},
    ).updateOne(); // return await new Update.updateOne(
  }; // async roomMsg(msg){
}; // export class Store{
