import * as socket from '/js/socket.mjs';
import * as web from '/js/web.mjs';

var test_client1,
test_client2,
test_room,
testRoomDetails,
testUserDetails,
AMPM, dateFull;



describe('socket.mjs', ()=>{

  before(done=>{(async()=>{
    const configJSON = await config();
    //console.log(`config.json: ${JSON.stringify(configJSON, null, 4))}`);
    test_client1 = configJSON.test.user[0];
    test_client2 = configJSON.test.user[1];

       test_room = configJSON.test.room;


    const d = await details();
    //console.log(`\n\ndetails: ${JSON.stringify(d, null, 4)}`);
    testRoomDetails = d.testRoomDetails;
    testUserDetails = d.testUserDetails;


    AMPM = web.formatAMPM();
    dateFull = web.formatDate() + ', ' + AMPM;

    done();
  })()});






  describe('sendMessage()', ()=>{

    it('Simulate empty message - Should return {code: "message can not be empty"}', async()=>{
      expect(
        await socket.sendMessage(test_client1.token, testRoomDetails, AMPM, dateFull)
      ).toStrictEqual({code: "message can not be empty"});
    }); // it('Simulate empty message - Should return {code: "message can not be empty"}', async()=>{

    it('Simulate send Message - Should return true', async()=>{
      document.querySelector('textarea').value = 'sample_message123';
      expect(
        await socket.sendMessage(test_client1.token, testRoomDetails, AMPM, dateFull)
      ).toBe(true);
    }); // it('Simulate send Message - Should return true', async()=>{

    it('Simulate NPE - Should return true', async()=>{
      document.querySelector('textarea').value = 'sample_message123';
      expect(
        await socket.sendMessage(null, testRoomDetails, AMPM, dateFull)
      ).toBe(false);
    }); // it('Simulate NPE - Should return true', async()=>{

    it('Verify client message - Should return true', async()=>{
      const lastElement = document.querySelector('.chat div:last-child');
      if(lastElement.textContent == 'sample_message123' &&
      lastElement.getAttribute('class') == 'bubble me' ) var d = true;
      expect(d).toBe(true);
    }); // it('Verify message - Should return true', async()=>{

    it('Verify that partner recieve message - Should return true', async()=>{
      expect(await checkPartnerMessage()).toBe(true);
    }).timeout(20000); //   it('Verify partner message - Should return true', async()=>{

    it('Check listener "chat message" for recieve object', async()=>{
      expect(await listenerChatMessage()).toEqual(expect.objectContaining({
       date: expect.any(String),
       msg: expect.any(String),
       room: expect.any(String),
       usertoken: expect.any(String)
      }));
    }).timeout(20000); // it('Check listener "chat message" for recieve object', async()=>{

  }); // describe('sendMessage()', ()=>{







  describe('personClick()', ()=>{

    it('Simulate click on first friend - Should return textContent of CSS Selector .top .name', async()=>{

      const checkElement = async selector => { console.log( '#1 - checkElement - selector: ' + selector );
        while ( document.querySelector(selector)?.textContent !== test_client2.name) {
          await new Promise( resolve =>  requestAnimationFrame(resolve) );
        }
        return document.querySelector(selector);
      };

      document.querySelector('.people li:nth-child(1)').click();

      await checkElement('.top .name');

      expect(document.querySelector('.top .name').textContent).toBe(test_client2.name);

    }).timeout(20000); // it('Should return token from URL paramater', ()=>{



    it('Simulate click on first friend - Should return data-active="true"', async()=>{

      document.querySelector('.people li:nth-child(1)').click();

      const checkElement = async selector => { console.log( '#2 checkElement - selector: ' + selector );
        while ( document.querySelector(selector)?.getAttribute('data-active') !== 'true') {
          await new Promise( resolve =>  requestAnimationFrame(resolve) )
        }
        return document.querySelector(selector);
      };

      await checkElement(`li[data-user="${test_client2.name}"]`);

      expect(
        document.querySelector(`li[data-user="${test_client2.name}"]`)?.getAttribute('data-active')
      ).toBe('true');

    }).timeout(20000); // it('Simulate click on first friend - Should return data-active="true"', async()=>{


    it('Check listener "room connect" for getting the Room ID', async ()=>{
      expect(await listenerRoomConnect()).toBe(test_room);
    }).timeout(20000); // it('Check listener "room connect" for getting the Room ID', async ()=>{

  }); // describe('personClick()', ()=>{







  describe('socketMSG()', ()=>{
    it('Simulate incoming message from Chat Partner', async()=>{
      expect(await incomeMsg()).toBe(true);
    }).timeout(20000); // it('Simulate incoming message from Chat Partner', async()=>{
  }); // describe('socketMSG()', ()=>{



}); // describe('socket.js', ()=>{
