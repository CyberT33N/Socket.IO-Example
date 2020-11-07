'use strict'

              const fs = require('fs'),
           json_config = JSON.parse(  fs.readFileSync('./admin/config.json', 'utf8')  ),

config_browser_profile = json_config.bot.browser_profile,
         headlessVALUE = json_config.bot.headless,

             puppeteer = require('puppeteer'),

                    os = require('os'),
                osHOME = os.homedir(),
            osPLATFORM = os.platform(),

           windowWidth = json_config.bot.windowWidth,
          windowHeight = json_config.bot.windowHeight,
    windowSizeComplete = '--window-size=' + windowWidth + ',' + windowHeight,

                   log = require('fancy-log'),
        chalkAnimation = require('chalk-animation'),
              gradient = require('gradient-string'),
                 chalk = require('chalk');
var browserProfilePath, chromeExtensionPath, client;

log( 'windowSizeComplete: ' + windowSizeComplete );
log( 'Current working directory: ' + __dirname );










const services = {

  startBROWSER: async ()=>{ return await startBROWSER(); },
  openLink: async (page, link)=>{ return await openLink(page, link); }

};

module.exports = services;





























var args = [

  windowSizeComplete,

  '--disable-flash-3d',
  '--no-sandbox',
  // '--disable-setuid-sandbox',

  '--disable-popup-blocking',
  '--disable-notifications',
  '--disable-dev-shm-usage',
  '--force-webrtc-ip-handling-policy=disable-non-proxied-udp',
  '--disable-flash-stage3d',
  '--disable-java',
  '--disable-internal-flash',
  '--disable-cache',
  '--disable-webgl', // webgl
  '--disable-3d-apis', // webgl
  //'--disable-extensions',
  '--disable-webgl-image-chromium',
  //'--disable-reading-from-canvas', // <-- youtube videos not playing with this enabled

  '--lang=en'
];
if(headlessVALUE) args.push('--disable-gpu');





log( 'osPLATFORM: ' + osPLATFORM );
if( osPLATFORM == 'darwin' ) browserProfilePath = './lib/browserProfiles/';
if( osPLATFORM == 'linux' ) browserProfilePath = './lib/browserProfiles/';
if( osPLATFORM == 'win32' ) browserProfilePath = '../../../../../lib/browserProfiles/';
log( 'browserProfilePath: ' + browserProfilePath + '\nconfig_browser_profile: ' + config_browser_profile );



if( osPLATFORM == 'darwin' ) chromeExtensionPath = './lib/chromeextension/';
if( osPLATFORM == 'linux' ) chromeExtensionPath = './lib/chromeextension/';
if( osPLATFORM == 'win32' ) chromeExtensionPath = '../../../../../lib/chromeextension/';
log( 'chromeExtension Path: ' + chromeExtensionPath );








var extensionlist = json_config.bot.extensionlist;

if( extensionlist.length !== 0 ){

  let extensionlistAR = [];
  for( let d in extensionlist ){
    extensionlistAR.push( chromeExtensionPath + extensionlist[d] );
    args.push( '--load-extension=' + chromeExtensionPath + extensionlist[d] );
  } // for( let d of extensionlist ){

  extensionlist = '--disable-extensions-except=' + extensionlistAR.join( ',' );
  args.push(extensionlist);

} //  if( extensionlist.length !== 0 ){
log( 'extensionlist: ' + extensionlist + '\n\nArgs: ' + args);



















async function startBROWSER(){
log( 'We will start now your Browser please wait..' );

  try {


    client = await puppeteer.launch({
      //executablePath: '/snap/bin/chromium',
      //executablePath: '/usr/bin/google-chrome',
      //executablePath: '/home/user/Downloads/Linux_x64_749751_chrome-linux/chrome-linux/chrome',
      // executablePath: '/home/user/Downloads/firefox-78.0a1.en-US.linux-x86_64/firefox/firefox',
      devtools: true,
      headless: headlessVALUE, // true or false
      userDataDir: browserProfilePath + config_browser_profile,
      args: args
    });

    const page = await client.newPage();
    await page.waitFor(5000);
    await page.bringToFront();
    await page.setViewport({width:windowWidth, height:windowHeight});
    log( 'Browser should be started now..' );

    return {"client": client, "page": page};


  } catch(e) {


    if(typeof e == 'string'){

      if( e == 'Error: connect ECONNREFUSED 0.0.0.0:4444' ) log( 'startBROWSER() - ECONNREFUSED error found.. error: ' + e );
      else log( 'startBROWSER() - error: ' + e );

    }//   if(typeof e == 'string'){
    else{
    log('Error while try to start browser - error :' + e )


      if ( e.length == undefined ) {
      log( 'startBROWSER() - error is undefinied.. we restart now the browser..' );

        await client.close();
        await startBROWSER();

      } // if ( e.length == undefined ) {

      if ( e.name == 'TimeoutError' ) {
      log( 'startBROWSER() - TimeoutError was found.. we restart now the browser..' );

        await client.close();
        await startBROWSER();

      } // if ( e.name == 'TimeoutError' ) {


    } // else from if(typeof e == 'string'){


  } // catch(e) {

} // async function startBROWSER(){































async function openLink(page, link){
log( 'openLink() - link: ' + link );

  try { await page.goto(link, {waitUntil: 'networkidle0', timeout: 35000});
  } catch(e) {
  log( 'openLink() - Error while open link.. Error: ' + e.message );

      if( e.message.match('Navigation timeout of') ){
          log( '#2 - Navigation timeout was found we reload page in 30 seconds..\n\n' );
          await new Promise(resolve => setTimeout(resolve, 30000));
      }

      if ( e.message.match( 'net::ERR_EMPTY_RESPONSE' ) ){
           log( '#2 - net::ERR_EMPTY_RESPONSE was found we reload page in 30 seconds..\n\n' );
           await new Promise(resolve => setTimeout(resolve, 30000));
      }

      if ( e.message.match( 'net::ERR_NETWORK_CHANGED' ) ){
           log( '#2 - net::ERR_NETWORK_CHANGED was found we reload page in 30 seconds..\n\n' );
           await new Promise(resolve => setTimeout(resolve, 30000));
      }

      if ( e.message.match( 'net::ERR_NAME_NOT_RESOLVED' ) ){
           log( '#2 - net::ERR_NAME_NOT_RESOLVED was found we reload page in 30 seconds..\n\n' );
           await new Promise(resolve => setTimeout(resolve, 30000));
      }

      if ( e.message.match( 'net::ERR_CONNECTION_CLOSED' ) ){
           log( '#2 - net::ERR_CONNECTION_CLOSED was found we reload page in 30 seconds..\n\n' );
           await new Promise(resolve => setTimeout(resolve, 30000));
      }


      if ( e.message.match( 'net::ERR_PROXY_CONNECTION_FAILED' ) ){
           log( '#2 - net::ERR_PROXY_CONNECTION_FAILED was found.. Maybe your proxy is offline? Maybe change your proxy.. However we reload page in 30 seconds..\n\n' );
           await new Promise(resolve => setTimeout(resolve, 30000));
      }

      if ( e.message.match( 'net::ERR_CONNECTION_REFUSED' ) ){
           log( '#2 - net::ERR_CONNECTION_REFUSED was found we reload page in 30 seconds..\n\n' );
           await new Promise(resolve => setTimeout(resolve, 30000));
      }

      if ( e.message.match( 'net::ERR_CONNECTION_TIMED_OUT' ) ){
           log( '#2 - net::ERR_CONNECTION_TIMED_OUT was found we reload page in 30 seconds..\n\n' );
           await new Promise(resolve => setTimeout(resolve, 30000));
      }


  }; //   } catch(e) {

  return true;

} // async function openLink(page, link){
