/* ################ Controller ################ */
import ctrlLib from '../../../controller/lib.mjs';
import ctrlMongoDB from '../../../controller/mongodb.mjs';


/** Get Server Side data and expose to DOM */
export class GetData {
  /**
   * @param {string} page - PPTR Page
  */
  constructor(page) {
    this.page = page;
  };

  /** Read config.yml file and then return testRoomDetails & testUserDetails */
  async details() {
    await this.page.exposeFunction('details', async ()=>{
      const config = ctrlLib.getConfig();
      const room = config.test.room;
      const token = config.test.user[0].token;
      return {
        testRoomDetails: await ctrlMongoDB.getRoomDetails(room),
        testUserDetails: await ctrlMongoDB.getUserDetails(token),
      };
    }); // await pptr.this.page.exposeFunction('details', async()=>{
  }; // async details(){

  /** Expose config.yml to PPTR */
  async config() {
    await this.page.exposeFunction('config', ()=>{
      return ctrlLib.getConfig();
    }); // await this.page.exposeFunction('config', ()=>{
  }; // async config() {
}; // export class getData(){
