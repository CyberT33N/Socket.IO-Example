import * as web from '/js/web.mjs';

let clientMe;
let ChatPartner;
let testRoom;
let testRoomDetails;
let testUserDetails;
let AMPM;
let dateFull;


describe('web.js', ()=>{
  before(done=>{(async ()=>{
    const configJSON = await config(); // await because of this.checkNPE - bug
    clientMe = configJSON.test.user[0];
    testRoom = configJSON.test.room;

    const d = await details();
    testRoomDetails = d.testRoomDetails;
    testUserDetails = d.testUserDetails;

    ChatPartner = await web.getChatPartner(testRoomDetails, clientMe.token);

    done();
  })();}); // before(done=>{


  describe('addConversationStart()', ()=>{
    it('Should find date at CSS Selector .conversation-start span', async ()=>{
      const date = testRoomDetails?.msg?.slice(-1)[0]?.date;
      await web.addConversationStart(date);

      expect(
          document.querySelector('.conversation-start span').textContent,
      ).toBe(date);
    }); //   it('Should find date', async()=>{
  }); // describe('addConversationStart()', ()=>{


  describe('getChatPartner()', ()=>{
    it('Should return object with key usertoken', async ()=>{
      expect(ChatPartner).toEqual(
          expect.objectContaining({usertoken: expect.anything()}),
      ); // expect(ChatPartner).toEqual(
    }); // it('Should return object with key usertoken', async ()=>{


    it('Simulate NPE - Should return false', async ()=>{
      expect(await web.getChatPartner(null, clientMe.token)).toBe(false);
    }); // it('Simulate NPE - Should return false', async()=>{
  }); // describe('getChatPartner()', ()=>{


  describe('getFriends()', ()=>{
    it('Should return object with key _id', async ()=>{
      expect(await web.getFriends(testUserDetails)).toBe(true);
    }); // it('Should return object with key _id', async()=>{


    it(`Search for CSS Selector .person[data-room="${testRoom}"]`, async ()=>{
      expect(
          document.querySelector(`.person[data-room="${testRoom}"]`),
      ).toBeTruthy(); // expect(
    }); // it(`Search for CSS Selector`, async()=>{


    it('Simulate NPE - Should return false', async ()=>{
      expect( await web.getFriends(null) ).toBe(false);
    }); // it('Simulate NPE - Should return false', async()=>{
  }); // describe('getFriends()', ()=>{


  describe('bubble()', ()=>{
    it('Simulate message NPE', async ()=>{
      expect(await web.bubble(null, 'you')).toBe(false);
    }); // it('Simulate message NPE', async ()=>{


    it('Simulate wrong client', async ()=>{
      expect(await web.bubble('sample message', 'wrong_data')).toBe(false);
    }); // it('Simulate wrong client', async()=>{


    it('Simulate client message', async ()=>{
      expect(await web.bubble('sample message', 'me')).toBe(true);
    }); // it('Simulate client message', async()=>{


    it(`Search for CSS Selector .bubble.me`, async ()=>{
      const lastElement = document.querySelector('.chat div:last-child');

      let d;
      if (
        lastElement.textContent == 'sample message' &&
        lastElement.getAttribute('class') == 'bubble me'
      ) d = true;

      expect(d).toBe(true);
    }); // it(`Search for CSS Selector .bubble.me`, async()=>{


    it('Simulate partner message', async ()=>{
      expect( await web.bubble('sample message', 'you') ).toBe(true);
    }); // it('Simulate partner message', async()=>{


    it(`Search for CSS Selector .bubble.you`, async ()=>{
      const lastElement = document.querySelector('.chat div:last-child');

      let d;
      if (
        lastElement.textContent == 'sample message' &&
        lastElement.getAttribute('class') == 'bubble you'
      ) d = true;

      expect(d).toBe(true);
    }); // it(`Search for CSS Selector .bubble.you`, async ()=>{


    it(`Search for CSS Selector .conversation-start`, async ()=>{
      expect(document.querySelector('.conversation-start')).toBeTruthy();
    }); // it(`Search for CSS Selector .conversation-start`, async()=>{
  }); // describe('bubble()', ()=>{


  describe('formatAMPM()', ()=>{
    it('Should return xx:xx am/pm', async ()=>{
      AMPM = web.formatAMPM();
      expect(AMPM).toMatch(/([0-1]?[0-9]|2[0-3]):[0-5][0-9] (am|pm)/gmi);
    }); // it('Should return xx:xx am/pm', async()=>{
  }); // describe('formatAMPM()', ()=>{


  describe('formatDate()', ()=>{
    it('Should return mm/dd/yyyy', async ()=>{
      const date = web.formatDate();
      dateFull = date + ', ' + AMPM;
      expect( date ).toMatch(/\d\d\/\d\d\/\d\d\d\d/gmi);
    }); // it('Should return mm/dd/yyyy', async()=>{
  }); // describe('formatDate()', ()=>{


  describe('updateTimes()', ()=>{
    it('Simulate successfully update times', async ()=>{
      expect(
          await web.updateTimes(
              testRoomDetails,
              testUserDetails,
              AMPM,
              dateFull),
      ).toBe(true); //   expect(
    }); // it('Simulate successfully update times', async()=>{


    it(`Check for date at CSS Selector .conversation-start span`, async ()=>{
      expect(
          document.querySelector('.conversation-start span').textContent,
      ).toBe(dateFull);
    }); // it(`Check for date(${dateFull})`, async()=>{


    it(`Check for AMPM at CSS Selector .time with Partner Token`, async ()=>{
      await checkTimeCSS();

      await new Promise(resolve => setTimeout(resolve, 1000));

      const css = `.people li[data-user="${ChatPartner.usertoken}"]`;
      expect(
          document.querySelector(css)?.querySelector('.time')?.textContent,
      ).toBe(AMPM);
    }).timeout(10000); // it(`Check for AMPM(${AMPM})`, ()=>{


    it('Simulate NPE', async ()=>{
      expect(await web.updateTimes(null, null)).toBe(false);
    }); // it('Simulate NPE', async()=>{
  }); // describe('updateTimes()', ()=>{


  describe('getURLParams()', ()=>{
    it('Should return token from URL paramater', async ()=>{
      expect(await web.getURLParams()).toEqual(
          expect.objectContaining({token: expect.anything()}),
      ); // expect(await web.getURLParams()).toEqual(
    }); // it('Should return token from URL paramater', async()=>{


    it('Simulate no user token paramater inside of URL found', async ()=>{
      expect(await checkURLParameter(web.getURLParams.toString())).toBe(false);
    }).timeout(10000); // it('Should return token', async()=>{
  }); // describe('getURLParams()', ()=>{


  after(()=>{
    const css = document.querySelector( 'body' );
    css.innerHTML += '<div class="finish-test"></div>';
  }); // after(()=>{
}); // describe('web.js', ()=>{
