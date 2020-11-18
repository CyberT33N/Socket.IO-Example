/*################ config.json ################*/
import fs from 'fs';
const json_config = JSON.parse(  fs.readFileSync('./admin/config.json', 'utf8')  ),
     test_client1 = json_config.test.user[0],
     test_client2 = json_config.test.user[1],
        test_room = json_config.test.room,

             host = json_config.test.host + ':' + json_config.test.port,
          devHost = json_config.test.host + ':' + json_config.test.devport,

          devLink = devHost + '/?usertoken=' + test_client1.token,
   devLinkPartner = devHost + '/?usertoken=' + test_client2.token,
             link = host + '/?usertoken=' + test_client1.token,
      linkPartner = host + '/?usertoken=' + test_client2.token;

/*################ Express ################*/
import express from 'express';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit';
import timeout from 'connect-timeout';
import http from 'http';
const app = express(),
     port = process.env.PORT || json_config.test.devport,
   server = http.createServer(app);

/*################ TDD ################*/
import expect from 'expect';
import io from 'socket.io';
import io_client from 'socket.io-client';
const devio = io(server);


/*################ Controller ################*/
import controller from '../controller/socketio.mjs';
import controllerbot from '../controller/bot.mjs';
import controllermongodb from '../controller/mongodb.mjs';
import controllerEndpoints from '../controller/endpoints.mjs';

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';

var pptr, testRoomDetails, testUserDetails, AMPM, dateFull, ChatPartner, devSocket, socket, socketPartner;










// create function to create loop if something went wrong like timeout to restart
async function openLink(page, link){
  if( !await controllerbot.openLink(page, link) ) return await openLink(page, link);
};

// return formatDate + ', ' + AMPM;
async function formatDate(AMPM){ log('formatDate()');
  return await pptr.page.evaluate(async()=>{
    return await formatDate();
  });
}; //async function formatDate(){


async function getAMPM(){ log('getAMPM()');
  return await pptr.page.evaluate(async()=>{
    return await formatAMPM();
  });
}; // async function getAMPM(){ log('getAMPM()');





// parse application/json
app.use( bodyParser.json() );

// adding Helmet to enhance your API's security
//app.use( helmet() );

// enabling CORS for all requests
//app.use( cors() );

// adding morgan to log HTTP requests
//app.use( morgan('combined') );

// set chat app website..
app.use(express.static('./website'));






// log all requests..
/*
app.use((req, res, next)=>{
  if( path.extname(path.basename(req.url)) ) log("The file " + path.basename(req?.url) + " was requested.");
  else log("The endpoint " + path.basename(req?.url) + " was requested.");
  next();
}); // app.use((req, res, next)=>{
*/



  /*
  ███████╗███╗   ██╗██████╗ ██████╗  ██████╗ ██╗███╗   ██╗████████╗███████╗
  ██╔════╝████╗  ██║██╔══██╗██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝██╔════╝
  █████╗  ██╔██╗ ██║██║  ██║██████╔╝██║   ██║██║██╔██╗ ██║   ██║   ███████╗
  ██╔══╝  ██║╚██╗██║██║  ██║██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║   ╚════██║
  ███████╗██║ ╚████║██████╔╝██║     ╚██████╔╝██║██║ ╚████║   ██║   ███████║
  ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
  */


// POST request where we take User Token and send back Object with User Details to Client
app.post('/api/getUserDetails', (req, res)=>{(async()=>{
  await controllerEndpoints.getUserDetails(req, res);
})().catch((e)=>{  log('ASYNC - POST - Error at /api/getUserDetails - Error: ' + e)  })});

// POST request where we take Room ID and send back Object with Room Details to Client
app.post('/api/getRoomDetails', (req, res)=>{(async()=>{
  await controllerEndpoints.getRoomDetails(req, res);
})().catch((e)=>{  log('ASYNC - POST - Error at /api/getRoomDetails - Error: ' + e)  })});






    // start test server on different port than original project for unit testing client side sockets
    // you may secure this in the future on real production with cookie access or something like that
    server.listen(port, (async()=>{ log('Server was started.. Listening on port: ' + port);
      if( !await controllermongodb.connectMongoDB() ) return false;
      devio.on('connection', (socket)=>{
        devSocket = socket
        log('DEV - User connected..');
       });
    })().catch((e)=>{  log('ASYNC - Error at main function.. Error: ' + e)  }));





















describe('Client Side Services', ()=>{


  before((done)=>{(async()=>{

    // start browser and get page & client
    pptr = await controllerbot.startBROWSER();
    if(!pptr) throw new Error('Something went wrong we cant find pptr');

    await openLink(pptr.page, link);

    await controllermongodb.connectMongoDB();

    // get room details of test room
    testRoomDetails = await controllermongodb.getRoomDetails(test_room);
    if(!testRoomDetails?._id) throw new Error('before() - Cant get Room Details');

    // get user details of test user
    testUserDetails = await controllermongodb.getUserDetails(test_client1.token);
    if(!testUserDetails?._id) throw new Error('before() - Cant get User Details');



    // client
    socket = io_client.connect(`${host}/?usertoken=${test_client1.token}`, {
      transports: ['websocket'], 'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });

    // partner
    socketPartner = io_client.connect(`${host}/?usertoken=${test_client2.token}`, {
      transports: ['websocket'], 'reconnection delay' : 0, 'reopen delay' : 0, 'force new connection' : true
    });


    socket.on('connectRoom result', (roomDetails)=>{
    //log('connectRoom result - Successfully connect - roomDetails: ' + JSON.stringify(roomDetails, null, 4));
      socket.off('connectRoom result');
      done();
    }); // socket.on('connectRoom result', function(roomDetails) {

    socket.emit('room connect', test_room);

  })().catch((e)=>{  log('ASYNC - client.test.js - MAIN - Error: ' + e)  })});





































  describe('reg.js', ()=>{



    describe('getUserDetails() - POST', ()=>{

      it('Should return data object with key _id', async()=>{
        const r = await pptr.page.evaluate(async(token)=>{
          return await getUserDetails(token);
        }, test_client1.token);
        log('Simulate correct token - result: ' + JSON.stringify(r, null, 4));

        expect( r?.data ).toEqual(expect.objectContaining({ _id: expect.anything() }));
      }); // it('Should return object with data key', async()=>{


      it('Simulate wrong token - Should return "User Token was not found in Database"', async()=>{
        const r = await pptr.page.evaluate(async(token)=>{
          try{ const r = await getUserDetails(token); } catch (e){ return e }
        }, 'wrong_token');
        //log('Simulate wrong token - result: ' + JSON.stringify(r, null, 4));

        expect( r?.response?.data?.msg ).toBe( 'User Token was not found in Database' );
      }); // it('Simulate wrong token - Should return object without data key', async()=>{


      it('Simulate NPE - Should return "User Token can not be null"', async()=>{
        const r = await pptr.page.evaluate(async(token)=>{
          try{ const r = await getUserDetails(token); } catch (e){ return e }
        }, null);
        //log('Simulate wrong token - result: ' + JSON.stringify(r, null, 4));

        expect( r?.response?.data?.msg ).toBe( 'User Token can not be null' );
      }); // it('Simulate wrong token - Should return object without data key', async()=>{

    }); // describe('getUserDetails()', ()=>{




    describe('getRoomDetails() - POST', ()=>{

      it('Should return data object with key _id', async()=>{
        const r = await pptr.page.evaluate(async(id)=>{
          return await getRoomDetails(id);
        }, test_room);
        //log('Simulate correct room ID - result: ' + JSON.stringify(r, null, 4));

        expect( r?.data ).toEqual(expect.objectContaining({ _id: expect.anything() }));
      }); // it('Should return data object with key _id', async()=>{


      it('Simulate wrong Room ID - Should return "Room ID was not found in Database"', async()=>{
        const r = await pptr.page.evaluate(async(id)=>{
          try{ const r = await getRoomDetails(id); } catch (e){ return e }
        }, 'wrong_roomID');
        //log('Simulate wrong Room ID - result: ' + JSON.stringify(r, null, 4));

        expect( r?.response?.data?.msg ).toBe( 'Room ID was not found in Database' );
      }); // it('Simulate wrong Room ID - Should return "Room ID was not found in Database"', async()=>{


      it('Simulate NPE - Should return "Room ID can not be null"', async()=>{
        const r = await pptr.page.evaluate(async(id)=>{
          try{ const r = await getRoomDetails(id); } catch (e){ return e }
        }, null);
        //log('Simulate wrong Room ID - result: ' + JSON.stringify(r, null, 4));

        expect( r?.response?.data?.msg ).toBe( 'Room ID can not be null' );
      }); // it('Simulate NPE - Should return "Room ID can not be null"', async()=>{

    }); // describe('getRoomDetails()', ()=>{




  }); // describe('reg.js', ()=>{






















  describe('web.js', ()=>{




    describe('addConversationStart()', ()=>{


      it('Should find date at CSS Selector .conversation-start span', async()=>{

        const date = testRoomDetails?.msg?.slice(-1)[0]?.date;
        log('addConversationStart() - date: ' + date);

        expect( await pptr.page.evaluate(async(date)=>{
          addConversationStart(date);
          return document.querySelector('.conversation-start span').textContent;
        }, date)).toBe(date);

      }); //   it('Should find date at CSS Selector .conversation-start span', async()=>{


    }); // describe('addConversationStart()', ()=>{







    describe('getChatPartner()', ()=>{




      it('Should return object with key usertoken', async()=>{

        ChatPartner = await pptr.page.evaluate(async(d)=>{
          return await getChatPartner(d.roomDetails, d.usertoken);
        }, {roomDetails: testRoomDetails, usertoken: test_client1.token});

        expect(ChatPartner).toEqual(expect.objectContaining({ usertoken: expect.anything() }));

      }); // it('Should return object with key _id', async()=>{


      it('Simulate NPE - Should return false', async()=>{
          expect( await pptr.page.evaluate(async(d)=>{
            return await getChatPartner(d.roomDetails, d.usertoken);
          }, {"roomDetails": null, "usertoken": test_client1.token})).toBe(false);
      }); // it('Simulate NPE - Should return false', async()=>{


    }); // describe('getChatPartner()', ()=>{






    describe('getFriends()', ()=>{

      it('Should return object with key _id', async()=>{
          expect( await pptr.page.evaluate(async(userDetails)=>{
            return await getFriends(userDetails);
          }, testUserDetails)).toBe(true);
      }); // it('Should return object with key _id', async()=>{


      it(`Search for CSS Selector .person[data-room="${test_room}"] - Should return true`, async()=>{
          expect( await pptr.page.$(`.person[data-room="${test_room}"]`) ).toBeTruthy();
      }); // it('Should return object with key _id', async()=>{


      it('Simulate NPE - Should return false', async()=>{
          expect( await pptr.page.evaluate(async(userDetails)=>{
            return await getFriends(userDetails);
          }, null)).toBe(false);
      }); // it('Simulate NPE - Should return false', async()=>{

    }); // describe('getFriends()', ()=>{









    describe('bubble()', ()=>{


      it('Simulate message NPE - Should return false', async()=>{
        expect( await pptr.page.evaluate(async(d)=>{
          return await bubble(d.msg, d.client);
        }, {msg: null, client: "you" })).toBe(false);
      }); // it('Simulate partner message', async()=>{


      it('Simulate wrong client - Should return false', async()=>{
        expect( await pptr.page.evaluate(async(d)=>{
          return await bubble(d.msg, d.client);
        }, {msg: null, client: "wrong_client" })).toBe(false);
      }); // it('Simulate partner message', async()=>{


      it('Simulate client message', async()=>{
        expect( await pptr.page.evaluate(async(d)=>{
          return await bubble(d.msg, d.client);
        }, {msg: "sample message", client: "me" })).toBe(true);
      }); // it('Simulate client message', async()=>{


      it(`Search for CSS Selector .bubble.me with text "sample message" - Should return true`, async()=>{
        expect( await pptr.page.evaluate(async()=>{
          const lastElement = document.querySelector('.chat div:last-child');
          if(lastElement.textContent == "sample message" && lastElement.getAttribute('class') == 'bubble me' ) return true;
        })).toBe(true);
      }); // it(`Search for CSS Selector .bubble.me with text "sample message" - Should return true`, async()=>{


      it('Simulate partner message', async()=>{
        expect( await pptr.page.evaluate(async(d)=>{
          return await bubble(d.msg, d.client);
        }, {msg: "sample message", client: "you" })).toBe(true);
      }); // it('Simulate partner message', async()=>{


      it(`Search for CSS Selector .bubble.you with text "sample message" - Should return true`, async()=>{
        expect( await pptr.page.evaluate(async()=>{
          const lastElement = document.querySelector('.chat div:last-child');
          if(lastElement.textContent == "sample message" && lastElement.getAttribute('class') == 'bubble you' ) return true;
        })).toBe(true);
      }); //   it(`Search for CSS Selector .bubble.you with text "sample message" - Should return true`, async()=>{


      it(`Search for CSS Selector .conversation-start - Should return true`, async()=>{
          expect( await pptr.page.$('.conversation-start') ).toBeTruthy();
      }); // it(`Search for CSS Selector .conversation-start - Should return true`, async()=>{



    }); // describe('bubble()', ()=>{







    describe('formatAMPM()', ()=>{
      it('Should return xx:xx am/pm', async()=>{
        AMPM = await getAMPM();
        expect( AMPM ).toMatch(/([0-1]?[0-9]|2[0-3]):[0-5][0-9] (am|pm)/gmi);
      }); // it('Should return xx:xx am/pm', async()=>{
    }); // describe('formatAMPM()', ()=>{




    describe('formatDate()', ()=>{
      it('Should return mm/dd/yyyy', async()=>{
        const date = await formatDate(AMPM);
        dateFull = date + ', ' + AMPM;
        expect( date ).toMatch(/\d\d\/\d\d\/\d\d\d\d/gmi);
      }); // it('Should return mm/dd/yyyy', async()=>{
    }); // describe('formatDate()', ()=>{








    describe('updateTimes()', ()=>{



      it('Simulate successfully update times - Should return true', async()=>{
        expect(await pptr.page.evaluate(async(d)=>{
          return await updateTimes(d.roomDetails, d.userDetails, d.AMPM, d.dateFull);
        }, {roomDetails: testRoomDetails, userDetails: testUserDetails, AMPM: AMPM, dateFull: dateFull})).toBe(true);
      }); // it('Simulate successfully update times - Should return true', async()=>{


      it(`Check for date at CSS Selector .conversation-start span`, async()=>{
        expect(await pptr.page.evaluate(async()=>{
          return document.querySelector('.conversation-start span').textContent;
        })).toBe(dateFull);
      }); // it(`Check for date(${dateFull}) at CSS Selector .conversation-start span`, async()=>{


      it(`Check for AMPM(${AMPM}) at CSS Selector .time with Partner Token`, ()=>{

        socket.on('msg', async (msg)=>{
        log('updateTimes() - success message: ' + msg);

          expect(await pptr.page.evaluate(async(token)=>{
            return document.querySelector(`.people li[data-user="${token}"]`)?.querySelector('.time')?.textContent;
          }, ChatPartner.usertoken)).toBe(AMPM);


        }); // socket.on('msg', async (msg)=>{

        socketPartner.emit('chat message', {msg: "sample message22..", room: test_room, usertoken: test_client2.token, date: dateFull });

      }); // it(`Check for AMPM(${AMPM}) at CSS Selector .time with Partner Token`, (done)=>{


      it('Simulate NPE  - Should return false', async()=>{
          expect(await pptr.page.evaluate(async(d)=>{
            return await updateTimes(d.roomDetails, d.userDetails);
          }, {roomDetails: null, userDetails: null})).toBe(false);
      }); // it('Simulate NPE  - Should return false', async()=>{




    }); // describe('updateTimes()', ()=>{










    describe('getURLParams()', ()=>{

      it('Should return token from URL paramater', async()=>{
        const r = await pptr.page.evaluate(async()=>{
          return await getURLParams();
        });
        log('getURLParams() - result: ' + JSON.stringify(r, null, 4));

        expect( r ).toEqual(expect.objectContaining({ token: expect.anything() }));
      }); // it('Should return token from URL paramater', async()=>{


      it('Simulate no user token paramater inside of URL found', async()=>{
        await openLink(pptr.page, host + '/?usertoken=');
        expect( await pptr.page.evaluate(async()=>{
          return await getURLParams();
        })).toBe(false);
      }); // it('Should return token from URL paramater', async()=>{


    }); // describe('getURLParams()', ()=>{







  }); // describe('web.js', ()=>{



















  describe('socket.js', ()=>{




    describe('sendMessage()', ()=>{


      it('Simulate empty message - Should return {code: "message can not be empty"}', async()=>{
        expect( await pptr.page.evaluate((d)=>{
          return sendMessage(d.userToken, d.roomDetails, d.AMPM, d.dateFull);
        }, {userToken: test_client1.token, roomDetails: testRoomDetails, AMPM: AMPM, dateFull: dateFull})).toStrictEqual({code: "message can not be empty"});
      }); // it('Simulate empty message - Should return {code: "message can not be empty"}', async()=>{


      it('Simulate send Message - Should return true', async()=>{

        await pptr.page.type('textarea', 'sample_message123', { delay: 10 });

        expect( await pptr.page.evaluate((d)=>{
          return sendMessage(d.userToken, d.roomDetails, d.AMPM, d.dateFull);
        }, {userToken: test_client1.token, roomDetails: testRoomDetails, AMPM: AMPM, dateFull: dateFull})).toBe(true);

      }); // it('Simulate send Message - Should return true', async()=>{


      it('Simulate NPE - Should return true', async()=>{

        await pptr.page.type('textarea', 'sample_message123', { delay: 10 });

        expect( await pptr.page.evaluate((d)=>{
          return sendMessage(d.userToken, d.roomDetails, d.AMPM, d.dateFull);
        }, {userToken: null, roomDetails: testRoomDetails, AMPM: AMPM, dateFull: dateFull})).toBe(false);

      }); // it('Simulate NPE - Should return true', async()=>{


      it('Verify client message - Should return true', async()=>{
        expect( await pptr.page.evaluate((msg)=>{
          const lastElement = document.querySelector('.chat div:last-child');
          if(lastElement.textContent == msg && lastElement.getAttribute('class') == 'bubble me' ) return true;
        }, 'sample_message123')).toBe(true);
      }); // it('Verify message - Should return true', async()=>{


      it('Verify that partner recieve message - Should return true', async()=>{
        await openLink(pptr.page, linkPartner);
        expect( await pptr.page.evaluate((msg)=>{
          const lastElement = document.querySelector('.chat div:last-child');
          if(lastElement.textContent == msg && lastElement.getAttribute('class') == 'bubble you' ) return true;
        }, 'sample_message123')).toBe(true);
      }); //   it('Verify partner message - Should return true', async()=>{


      it('Check listener "chat message" for recieve object', (done)=>{(async()=>{

        await openLink(pptr.page, devLink);

        devSocket.on('chat message', (msg)=>{ log('sendMessage() - chat message: ' + JSON.stringify(msg, null, 4));
        // setTimeout(()=>{ devSocket.off('chat message'); }, 2000); // <-- dont delete timeout or we get error..
           expect(msg).toEqual(expect.objectContaining({
            date: expect.any(String),
            msg: expect.any(String),
            room: expect.any(String),
            usertoken: expect.any(String)
           })); done();
        }); // devSocket.on('chat message', (msg)=>{

        await pptr.page.type('textarea', 'sample_message123', { delay: 10 });

        await pptr.page.evaluate((d)=>{
          return sendMessage(d.userToken, d.roomDetails, d.AMPM, d.dateFull);
        }, {userToken: test_client1.token, roomDetails: testRoomDetails, AMPM: AMPM, dateFull: dateFull});

      })().catch((e)=>{  log('ASYNC - connectRoom() - Error: ' + e)  })}); // it('Check listener "chat message" for recieve object', (done)=>{(async()=>{


    }); // describe('sendMessage()', ()=>{






    describe('personClick()', ()=>{

      it('Simulate click on first friend - Should return textContent of CSS Selector .top .name', async()=>{

        await openLink(pptr.page, link);
        await pptr.page.click('.people li:nth-child(1)');

        await pptr.page.waitFor((name)=>{
          return document.querySelector('.top .name')?.textContent == name;
        }, {timeout: 10000}, test_client2.name);

        expect( await pptr.page.evaluate(()=>document.querySelector('.top .name').textContent) ).toBe(test_client2.name);

      }); // it('Should return token from URL paramater', ()=>{


      it('Simulate click on first friend - Should return data-active="true"', async()=>{

        await pptr.page.click('.people li:nth-child(1)');

        await pptr.page.waitFor((name)=>{
          return document.querySelector(`li[data-user="${name}"]`)?.getAttribute('data-active') == 'true';
        }, {timeout: 10000}, test_client2.name);

        expect( await pptr.page.evaluate((name)=>{
          return document.querySelector(`li[data-user="${name}"]`)?.getAttribute('data-active');
        }, test_client2.name) ).toBe('true');

      }); // it('Simulate click on first friend - Should return data-active="true"', async()=>{


      it('Check listener "room connect" for getting the Room ID', (done)=>{(async()=>{

        await openLink(pptr.page, devLink);

        devSocket.on('room connect', (roomID)=>{ log('connectRoom() - room connect: ' + roomID);
         //setTimeout(()=>{ devSocket.off('room connect'); }, 2000); // <-- dont delete timeout or we get error..
         expect(roomID).toBe(test_room);
         done();
        }); // socket.on('connectRoom result', function(roomDetails) {

        await pptr.page.click('.person');


      })().catch((e)=>{  log('ASYNC - connectRoom() - Error: ' + e)  })});

    }); // describe('personClick()', ()=>{







    describe('socketMSG()', ()=>{

      it('Simulate incoming message from Chat Partner', async()=>{

        await openLink(pptr.page, devLinkPartner);

        devSocket.emit('msg', 'new sample message');

        expect( await pptr.page.evaluate(async()=>{
          const lastElement = document.querySelector('.chat div:last-child');
          if(lastElement.textContent == "new sample message" && lastElement.getAttribute('class') == 'bubble you' ) return true;
        })).toBe(true);

      }); // it('Simulate incoming message from Chat Partner', async()=>{



    }); // describe('connectRoom()', ()=>{







  }); // describe('socket.js', ()=>{




}); // describe('Client Side Services', ()=>{



  /*
      it('temp timeout..', async()=>{
        await new Promise(resolve=>setTimeout(resolve, 600000));
      }); // it('Should return object with data key', async()=>{
  */
