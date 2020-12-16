/* ################ Controller ################ */
import ctrlLib from '../../../controller/lib.mjs';
import ctrlMongoDB from '../../../controller/mongodb.mjs';


/** Get Server Side data and expose to DOM */
export class GetData {
  /**
   * @param {string} page - PPTR Page
  */
  constructor(page) {
    if (!page) throw new Error(`Page was missing at Class GetData constructor`);
    this.page = page;

    const config = ctrlLib.getConfig();
    this.room = config.test.room;
    this.token = config.test.user[0].token;
  }; // constructor(page) {


  /** Read config.yml file and then return testRoomDetails & testUserDetails */
  async details() {
    await this.page.exposeFunction('details', async ()=>{
      return {
        testRoomDetails: await ctrlMongoDB.getRoomDetails(this.room),
        testUserDetails: await ctrlMongoDB.getUserDetails(this.token),
      }; // return {
    }); // await pptr.this.page.exposeFunction('details', async()=>{
  }; // async details(){


  /** Expose config.yml to PPTR */
  async config() {
    await this.page.exposeFunction('config', ()=>{
      return ctrlLib.getConfig();
    }); // await this.page.exposeFunction('config', ()=>{
  }; // async config() {
}; // export class getData(){
