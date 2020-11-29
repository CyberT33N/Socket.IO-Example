import * as req from '/js/req.mjs';
var test_client1, test_room;

describe('reg.js', ()=>{

  before(done=>{(async()=>{
    const configJSON = await config();
    console.log(`config.json: ${JSON.stringify(configJSON)}`);

    test_client1 = configJSON.test.user[0];
    test_room = configJSON.test.room;

    done();
  })()}); // before(done=>{(async()=>{



  describe('getUserDetails() - POST', ()=>{

    it('Should return data object with key _id', async()=>{
      const r = await req.getUserDetails(test_client1.token);
      console.log('Simulate correct token - result: ' + JSON.stringify(r, null, 4));
      expect( r?.data ).toEqual(expect.objectContaining({ _id: expect.anything() }));
    }); // it('Should return object with data key', async()=>{

    it('Simulate wrong token - Should return "User Token was not found in Database"', async()=>{
      try{ const r = await req.getUserDetails('wrong_token'); } catch (e){ return e }
      //console.log('Simulate wrong token - result: ' + JSON.stringify(r, null, 4));
      expect( r?.response?.data?.msg ).toBe( 'User Token was not found in Database' );
    }); // it('Simulate wrong token - Should return object without data key', async()=>{

    it('Simulate NPE - Should return "User Token can not be null"', async()=>{
      try{ const r = await req.getUserDetails(mull); } catch (e){ return e }
      //console.log('Simulate wrong token - result: ' + JSON.stringify(r, null, 4));
      expect( r?.response?.data?.msg ).toBe( 'User Token can not be null' );
    }); // it('Simulate wrong token - Should return object without data key', async()=>{

  }); // describe('getUserDetails()', ()=>{



  describe('getRoomDetails() - POST', ()=>{

    it('Should return data object with key _id', async()=>{
      const r = await req.getRoomDetails(test_room);
      //console.log('Simulate correct room ID - result: ' + JSON.stringify(r, null, 4));
      expect( r?.data ).toEqual(expect.objectContaining({ _id: expect.anything() }));
    }); // it('Should return data object with key _id', async()=>{

    it('Simulate wrong Room ID - Should return "Room ID was not found in Database"', async()=>{
      try{ const r = await req.getRoomDetails(wrong_roomID); } catch (e){ return e }
      //console.log('Simulate wrong Room ID - result: ' + JSON.stringify(r, null, 4));
      expect( r?.response?.data?.msg ).toBe( 'Room ID was not found in Database' );
    }); // it('Simulate wrong Room ID - Should return "Room ID was not found in Database"', async()=>{

    it('Simulate NPE - Should return "Room ID can not be null"', async()=>{
      try{ const r = await req.getRoomDetails(null); } catch (e){ return e }
      //console.log('Simulate wrong Room ID - result: ' + JSON.stringify(r, null, 4));
      expect( r?.response?.data?.msg ).toBe( 'Room ID can not be null' );
    }); // it('Simulate NPE - Should return "Room ID can not be null"', async()=>{

  }); // describe('getRoomDetails()', ()=>{

}); // describe('reg.js', ()=>{
