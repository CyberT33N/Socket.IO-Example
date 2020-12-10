import * as web from '/js/web.mjs';

var test_client1,
ChatPartner,
test_room,
testRoomDetails, testUserDetails,
AMPM, dateFull;


describe('web.js', ()=>{

  before(done=>{(async()=>{
    const configJSON = await config();
    //console.log(`config.json: ${JSON.stringify(configJSON, null, 4))}`);
    test_client1 = configJSON.test.user[0];
    test_room = configJSON.test.room;

    const d = await details();
    //console.log(`\n\ndetails: ${JSON.stringify(d, null, 4)}`);
    testRoomDetails = d.testRoomDetails;
    testUserDetails = d.testUserDetails;

    ChatPartner = await web.getChatPartner(testRoomDetails, test_client1.token);

    done();
  })()}); // before(done=>{



  describe('addConversationStart()', ()=>{
    it('Should find date at CSS Selector .conversation-start span', async()=>{
      const date = testRoomDetails?.msg?.slice(-1)[0]?.date;
      //console.log('addConversationStart() - date: ' + date);
      await web.addConversationStart(date);
      expect( document.querySelector('.conversation-start span').textContent ).toBe(date);
    }); //   it('Should find date at CSS Selector .conversation-start span', async()=>{
  }); // describe('addConversationStart()', ()=>{



  describe('getChatPartner()', ()=>{

    it('Should return object with key usertoken', async()=>{
      expect(ChatPartner).toEqual(expect.objectContaining({ usertoken: expect.anything() }));
    }); // it('Should return object with key _id', async()=>{

    it('Simulate NPE - Should return false', async()=>{
      expect(await web.getChatPartner(null, test_client1.token)).toBe(false);
    }); // it('Simulate NPE - Should return false', async()=>{

  }); // describe('getChatPartner()', ()=>{



  describe('getFriends()', ()=>{

    it('Should return object with key _id', async()=>{
      expect(await web.getFriends(testUserDetails)).toBe(true);
    }); // it('Should return object with key _id', async()=>{

    it(`Search for CSS Selector .person[data-room="${test_room}"] - Should return true`, async()=>{
        expect( document.querySelector(`.person[data-room="${test_room}"]`) ).toBeTruthy();
    }); // it('Should return object with key _id', async()=>{

    it('Simulate NPE - Should return false', async()=>{
        expect( await web.getFriends(null) ).toBe(false);
    }); // it('Simulate NPE - Should return false', async()=>{

  }); // describe('getFriends()', ()=>{




  describe('bubble()', ()=>{

    it('Simulate message NPE - Should return false', async()=>{
      expect( await web.bubble(null, 'you') ).toBe(false);
    }); // it('Simulate partner message', async()=>{

    it('Simulate wrong client - Should return false', async()=>{
      expect( await web.bubble('sample message', 'wrong_data') ).toBe(false);
    }); // it('Simulate partner message', async()=>{

    it('Simulate client message', async()=>{
      expect( await web.bubble('sample message', 'me') ).toBe(true);
    }); // it('Simulate client message', async()=>{

    it(`Search for CSS Selector .bubble.me with text "sample message" - Should return true`, async()=>{
      const lastElement = document.querySelector('.chat div:last-child');
      if(lastElement.textContent == "sample message" &&
      lastElement.getAttribute('class') == 'bubble me' ) var d = true;
      expect(d).toBe(true);
    }); // it(`Search for CSS Selector .bubble.me with text "sample message" - Should return true`, async()=>{

    it('Simulate partner message', async()=>{
      expect( await web.bubble('sample message', 'you') ).toBe(true);
    }); // it('Simulate partner message', async()=>{

    it(`Search for CSS Selector .bubble.you with text "sample message" - Should return true`, async()=>{
      const lastElement = document.querySelector('.chat div:last-child');
      if(lastElement.textContent == "sample message" &&
      lastElement.getAttribute('class') == 'bubble you' ) var d = true;
      expect(d).toBe(true);
    }); //   it(`Search for CSS Selector .bubble.you with text "sample message" - Should return true`, async()=>{

    it(`Search for CSS Selector .conversation-start - Should return true`, async()=>{
        expect( document.querySelector('.conversation-start') ).toBeTruthy();
    }); // it(`Search for CSS Selector .conversation-start - Should return true`, async()=>{

  }); // describe('bubble()', ()=>{




  describe('formatAMPM()', ()=>{
    it('Should return xx:xx am/pm', async()=>{
      AMPM = web.formatAMPM();
      expect( AMPM ).toMatch(/([0-1]?[0-9]|2[0-3]):[0-5][0-9] (am|pm)/gmi);
    }); // it('Should return xx:xx am/pm', async()=>{
  }); // describe('formatAMPM()', ()=>{


  describe('formatDate()', ()=>{
    it('Should return mm/dd/yyyy', async()=>{
      const date = web.formatDate();
      dateFull = date + ', ' + AMPM;
      expect( date ).toMatch(/\d\d\/\d\d\/\d\d\d\d/gmi);
    }); // it('Should return mm/dd/yyyy', async()=>{
  }); // describe('formatDate()', ()=>{



  describe('updateTimes()', ()=>{

    it('Simulate successfully update times - Should return true', async()=>{
      expect(
        await web.updateTimes(testRoomDetails, testUserDetails, AMPM, dateFull)
      ).toBe(true);
    }); // it('Simulate successfully update times - Should return true', async()=>{


    it(`Check for date at CSS Selector .conversation-start span`, async()=>{
      expect( document.querySelector('.conversation-start span').textContent).toBe(dateFull);
    }); // it(`Check for date(${dateFull}) at CSS Selector .conversation-start span`, async()=>{


    it(`Check for AMPM at CSS Selector .time with Partner Token`, async()=>{

      await checkTimeCSS();
      await new Promise(resolve => setTimeout(resolve, 1000));

      expect(
        document.querySelector(`.people li[data-user="${ChatPartner.usertoken}"]`)?.querySelector('.time')?.textContent
      ).toBe(AMPM);

    }).timeout(10000); // it(`Check for AMPM(${AMPM}) at CSS Selector .time with Partner Token`, ()=>{

    it('Simulate NPE  - Should return false', async()=>{
        expect(await web.updateTimes(null, null)).toBe(false);
    }); // it('Simulate NPE  - Should return false', async()=>{

  }); // describe('updateTimes()', ()=>{




  describe('getURLParams()', ()=>{

    it('Should return token from URL paramater', async()=>{
      expect(
        await web.getURLParams()
      ).toEqual(expect.objectContaining({ token: expect.anything() }));
    }); // it('Should return token from URL paramater', async()=>{

    it('Simulate no user token paramater inside of URL found', async()=>{
      expect(await checkURLParameter(web.getURLParams.toString())).toBe(false);
    }).timeout(10000); // it('Should return token from URL paramater', async()=>{

  }); // describe('getURLParams()', ()=>{


  after(()=>{
    document.querySelector( 'body' ).innerHTML += '<div class="finish-test"></div>';
  }); // after(()=>{

}); // describe('web.js', ()=>{
