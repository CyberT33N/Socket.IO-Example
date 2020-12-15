/* ################ Logs ################ */
import log from 'fancy-log';

/* ################ TDD ################ */
import expect from 'expect';

/* ################ Services ################ */
import {Init} from './Init.mjs';


describe('Client Side Services', ()=> {
  before(done=>{(async ()=>{
    await new Init().create(done);
    global.pptr = new Init().getPPTR();
  })().catch(e=>{log('Client Service test.mjs - BEFORE() - Error: ' + e);});});


  it('Client Side test success - .finish-test should exist', async ()=>{
    expect(
        await pptr.page.waitForSelector('.finish-test', {
          visible: true, timeout: 0,
        }), // await pptr.page.waitForSelector('.finish-test', {
    ).toBeTruthy(); // expect(
  }); // it('Client Side test success - .finish-test should exist', async ()=>{


  // save mocha client results to client.html
  after(async ()=>{await new Init().getMochaHTML();});
}); // describe('Client Side Services', ()=>{
