/* ################ Controller ################ */
import controllerLib from '../../../controller/lib.mjs';
import controllerMongoDB from '../../../controller/mongodb.mjs';


/** Get Server Side data and expose to PPTR */
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
      const config = controllerLib.getConfig();
      const room = config.test.room;
      const token = config.test.user[0].token;
      return {
        testRoomDetails: await controllerMongoDB.getRoomDetails(room),
        testUserDetails: await controllerMongoDB.getUserDetails(token),
      };
    }); // await pptr.this.page.exposeFunction('details', async()=>{
  }; // async details(){

  /** Expose config.yml to PPTR */
  async config() {
    await this.page.exposeFunction('config', ()=>{
      return controllerLib.getConfig();
    }); // await this.page.exposeFunction('config', ()=>{
  }; // async config(this.page) {
}; // export class getData(){
