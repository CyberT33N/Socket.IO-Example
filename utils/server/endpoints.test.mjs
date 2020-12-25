/* ################ Controller ################ */
import ctrlLib from '../../controller/lib.mjs';

/* ################ API ################ */
import axios from 'axios';

/* ################ TDD ################ */
import expect from 'expect';

/* ################ Logs ################ */
import log from 'fancy-log';


describe('Endpoints Services', ()=>{
  before(()=>{
    const config = ctrlLib.getConfig();
    global.devHost = `${config.test.host}:${config.test.port}`;
    global.clientMe = config.test.user[0];
    global.testRoom = config.test.room;
  }); // before(()=>{


  describe('getUserDetails()', ()=>{
    it('Send POST request with test user token', async ()=>{
      try {
        const r = await axios.post(
            `${devHost}/api/getUserDetails`,
            {usertoken: clientMe.token},
        ); // const r = await axios.post(

        expect( r?.data ).toEqual(
            expect.objectContaining({_id: expect.anything()}),
        ); // expect( r?.data ).toEqual(
      } catch (e) {log( 'Send POST request with test user token error: ' + e );}
    }); // it('Send POST request with test user token', async ()=>{


    it('Send POST request with wrong User Token', async ()=>{
      try {
        await axios.post(
            `${devHost}/api/getUserDetails`,
            {usertoken: 'wrong_token'},
        ); // const r = await axios.post(
      } catch (e) {
        expect(e.toString()).toBe('Error: Request failed with status code 403');
      } // catch (e){
    }); // it('Send POST request with wrong User Token', async()=>{


    it('Simulate NPE', async ()=>{
      try {
        await axios.post(
            `${devHost}/api/getUserDetails`,
            {usertoken: null},
        ); // await axios.post(
      } catch (e) {
        expect(e.toString()).toBe('Error: Request failed with status code 404');
      } // catch (e){
    }); // it('Simulate NPE', async()=>{
  }); // describe('getUserDetails', ()=>{


  describe('getRoomDetails()', ()=>{
    it('Send POST request with Room ID', async ()=>{
      try {
        const r = await axios.post(
            `${devHost}/api/getRoomDetails`,
            {id: testRoom},
        ); // const r = await axios.post(

        expect( r?.data ).toEqual(
            expect.objectContaining({_id: expect.anything()}),
        ); // expect( r?.data ).toEqual(
      } catch (e) {log( 'Send POST request with Room ID - error: ' + e );}
    }); // it('Send POST request with Room ID', async()=>{


    it('Send POST request with wrong Room ID', async ()=>{
      try {
        await axios.post(
            `${devHost}/api/getRoomDetails`,
            {id: testRoom},
        ); // await axios.post(
      } catch (e) {
        expect(e.toString()).toBe('Error: Request failed with status code 403');
      } // catch (e) {
    }); // it('Send POST request with wrong Room ID', async ()=>{


    it('Simulate NPE', async ()=>{
      try {
        await axios.post(
            `${devHost}/api/getRoomDetails`,
            {id: null},
        ); // await axios.post(
      } catch (e) {
        expect(e.toString()).toBe('Error: Request failed with status code 404');
      } // catch (e){
    }); // it('Simulate NPE', async ()=>{
  }); // describe('getRoomDetails', ()=>{
}); // describe('Endpoints Services', ()=>{
