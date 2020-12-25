import * as req from '/js/req.mjs';

let clientMe;
let testRoom;


describe('reg.js', ()=>{
  before(done=>{(async ()=>{
    const configJSON = await config(); // await because of this.checkNPE
    clientMe = configJSON.test.user[0];
    testRoom = configJSON.test.room;
    done();
  })();}); // before(done=>{(async()=>{


  describe('getUserDetails() - POST', ()=>{
    it('Should return data object with key _id', async ()=>{
      const r = await req.getUserDetails(clientMe.token);
      expect( r?.data ).toEqual(
          expect.objectContaining({_id: expect.anything()}),
      ); // expect( r?.data ).toEqual(
    }); // it('Should return object with data key', async()=>{


    it('Simulate wrong token', async ()=>{
      try {
        const r = await req.getUserDetails('wrong_token');
        expect(r?.response?.data?.msg).toBe(
            'User Token was not found in Database',
        );
      } catch (e) {console.log('getUserDetails() - wrong token error: ' + e);}
    }); // it('Simulate wrong token', async ()=>{


    it('Simulate NPE', async ()=>{
      try {
        const r = await req.getUserDetails(mull);
        expect( r?.response?.data?.msg ).toBe( 'User Token can not be null' );
      } catch (e) {console.log('getUserDetails() - Simulate NPE error: ' + e);}
    }); // it('Simulate NPE', async ()=>{
  }); // describe('getUserDetails()', ()=>{


  describe('getRoomDetails() - POST', ()=>{
    it('Should return data object with key _id', async ()=>{
      const r = await req.getRoomDetails(testRoom);
      expect(r?.data).toEqual(
          expect.objectContaining({_id: expect.anything()}),
      ); // expect(r?.data).toEqual(
    }); // it('Should return data object with key _id', async()=>{


    it('Simulate wrong Room ID', async ()=>{
      try {
        const r = await req.getRoomDetails(wrong_roomID);
        expect(r?.response?.data?.msg).toBe(
            'Room ID was not found in Database',
        ); // expect(r?.response?.data?.msg).toBe(
      } catch (e) {console.log('getRoomDetails() - wrong room error: ' + e);}
    }); // it('Simulate wrong Room ID', async ()=>{


    it('Simulate NPE', async ()=>{
      try {
        const r = await req.getRoomDetails(null);
        expect( r?.response?.data?.msg ).toBe( 'Room ID can not be null' );
      } catch (e) {console.log('getRoomDetails() - Simulate NPE error: ' + e);}
    }); // it('Simulate NPE', async ()=>{
  }); // describe('getRoomDetails()', ()=>{
}); // describe('reg.js', ()=>{
