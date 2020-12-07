/*################ Operating System ################*/
import os from 'os';
const osPlatform = os.platform();

/*################ Bot ################*/
import puppeteer from 'puppeteer';

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';

/*################ config.json ################*/
import fs from 'fs';
import yaml from 'js-yaml';




class getBrowserConfig{

  constructor(){ log('class getBrowserConfig - constructor()');
    this.getConfig();
    this.createArgs();
    this.checkExtensions();
  }; // constructor(){

  getConfig(){ log('getConfig()');
    const json_config = yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8'));
    this.config_browser_profile = json_config.bot.browser_profile;
    this.headless = json_config.bot.headless;
    this.extensionlist = json_config.bot.extensionlist;
    this.windowWidth = json_config.bot.windowWidth;
    this.windowHeight = json_config.bot.windowHeight;
    this.windowSizeComplete = `--window-size=${this.windowWidth},${this.windowHeight}`;
    log(`
      windowSizeComplete: ${this.windowSizeComplete}
      extensionlist: ${this.windowSizeComplete}
      headless: ${this.headless}
      config_browser_profile: ${this.config_browser_profile}
      `);
  }; // getConfig(){

  createArgs(){ log( 'createArgs()' );
    this.args = [
      this.windowSizeComplete,
      '--no-sandbox',
      // '--disable-setuid-sandbox',
      //'--disable-popup-blocking',
      //'--disable-notifications',
      //'--disable-dev-shm-usage',
      '--force-webrtc-ip-handling-policy=disable-non-proxied-udp',
      '--lang=en'
    ]; if(this.headless) this.args.push('--disable-gpu');
  }; // createArgs(){

  // check if browser extensions was defined in config.json file. If true we add them to our args array
  checkExtensions(){ log( 'checkExtensions()' );
    if( this.extensionlist !== null ){
    log('extensionlist before: ' + this.extensionlist);

      var extensionlistAR = [];
      for( const d in this.extensionlist ){
        extensionlistAR.push( this.chromeExtensionPath + this.extensionlist[d] );
        this.args.push( '--load-extension=' + this.chromeExtensionPath + this.extensionlist[d] );
      } // for( const d of this.extensionlist ){

      this.extensionlist = '--disable-extensions-except=' + extensionlistAR.join( ',' );
      this.args.push(this.extensionlist);
      log(`extensionlist after: ${this.extensionlist}`);

    } // if( this.extensionlist !== null ){
  }; // checkExtensions(){


  // check system OS and then create path related to OS
  createPath(){ log( 'createPath() - osPlatform: ' + osPlatform );
    if( osPlatform == 'darwin' ){
      this.browserProfilePath = './lib/browserProfiles/';
      this.chromeExtensionPath  = './lib/chromeextension/';
    }
    if( osPlatform == 'linux' ) {
      this.browserProfilePath = './lib/browserProfiles/';
      this.chromeExtensionPath  = './lib/chromeextension/';
    }
    if( osPlatform == 'win32' ){
      this.browserProfilePath = '../../../../../lib/browserProfiles/';
      this.chromeExtensionPath  = '../../../../../lib/chromeextension/';
    }
    log(`
      browserProfilePath: ${browserProfilePath}
      chromeExtension Path: ${chromeExtensionPath}
    `);
  }; // createPath(){

}; // class getBrowserConfig {




export class startBrowser extends getBrowserConfig{

  async newPage(){ log('newPage()');
    this.page = await this.client.newPage();
    await this.page.bringToFront();
  }; // async newPage(){

  async setViewport(){ log('setViewport()');
    await this.page.setViewport({width: this.windowWidth, height: this.windowHeight});
  }; // async setViewport(){

  async launch(){ log('launch() - args: ' + this.args);
    try {
        this.client = await puppeteer.launch({
        //executablePath: '/snap/bin/chromium',
        //executablePath: '/usr/bin/google-chrome',
        //executablePath: '/home/user/Downloads/Linux_x64_749751_chrome-linux/chrome-linux/chrome',
        // executablePath: '/home/user/Downloads/firefox-78.0a1.en-US.linux-x86_64/firefox/firefox',
        devtools: true,
        headless: this.headless, // true or false
        userDataDir: this.browserProfilePath + this.config_browser_profile,
        args: this.args
      });

      await this.newPage();
      await this.setViewport();
      return {"client": this.client, "page": this.page};

    } catch(e) { error(e); }; // catch(e) {
  } // async function launch(){

  async error(e){ log('class startBrowser - error() - error: ' + e);
    if( e?.length == undefined ) log( 'startBrowser() - error is undefinied.. we restart now the browser..' );
    if( e?.name == 'TimeoutError' ) log( 'startBrowser() - TimeoutError was found.. we restart now the browser..' );
    if( e == 'Error: connect ECONNREFUSED 0.0.0.0:4444') log( 'startBrowser() - ECONNREFUSED error found..' );

    await this.client.close();
    await this.launch();
  }; // async error(e){

}; // class _startBrowser {











export const openLink = async (page, link)=>{ log( 'openLink() - link: ' + link );

  try { await page.goto(link, {waitUntil: 'networkidle0', timeout: 35000});
  } catch(e) { log( 'openLink() - Error while open link.. Error: ' + e?.message );

    if( e?.message.match('Navigation timeout of') ) log( '#2 - Navigation timeout was found we reload page in 30 seconds..\n\n' );
    if( e?.message.match( 'net::ERR_EMPTY_RESPONSE' ) ) log( '#2 - net::ERR_EMPTY_RESPONSE was found we reload page in 30 seconds..\n\n' );
    if( e?.message.match( 'net::ERR_NETWORK_CHANGED' ) ) log( '#2 - net::ERR_NETWORK_CHANGED was found we reload page in 30 seconds..\n\n' );
    if( e?.message.match( 'net::ERR_NAME_NOT_RESOLVED' ) ) log( '#2 - net::ERR_NAME_NOT_RESOLVED was found we reload page in 30 seconds..\n\n' );
    if( e?.message.match( 'net::ERR_CONNECTION_CLOSED' ) ) log( '#2 - net::ERR_CONNECTION_CLOSED was found we reload page in 30 seconds..\n\n' );
    if( e?.message.match( 'net::ERR_PROXY_CONNECTION_FAILED' ) ) log( '#2 - net::ERR_PROXY_CONNECTION_FAILED was found.. Maybe your proxy is offline? Maybe change your proxy.. However we reload page in 30 seconds..\n\n' );
    if( e?.message.match( 'net::ERR_CONNECTION_REFUSED' ) ) log( '#2 - net::ERR_CONNECTION_REFUSED was found we reload page in 30 seconds..\n\n' );
    if( e?.message.match( 'net::ERR_CONNECTION_TIMED_OUT' ) ) log( '#2 - net::ERR_CONNECTION_TIMED_OUT was found we reload page in 30 seconds..\n\n' );

    // optional timeout
    await new Promise(resolve => setTimeout(resolve, 30000));
    await openLink(page, link);

  }; return true;

} // async function openLink(page, link){
