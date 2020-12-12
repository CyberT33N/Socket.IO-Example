/* ################ Operating System ################ */
import os from 'os';

/* ################ Bot ################ */
import puppeteer from 'puppeteer';

/* ################ Controller ################ */
import controllerLib from '../controller/lib.mjs';

/* ################ Logs ################ */
import log from 'fancy-log';


/** Get launch data like args and exts */
class Config {
  /** Create puppeteer launch arguments */
  createArgs() {
    this.args = [
      `--window-size=${this.windowWidth},${this.windowHeight}`,
      '--no-sandbox',
      '--force-webrtc-ip-handling-policy=disable-non-proxied-udp',
      '--lang=en',
    ];

    if (this.headless) this.args.push('--disable-gpu');
  }; // createArgs(){


  /**
   * check if browser exts was defined in config.yml file.
     If true we add them to our args array
   * @param {object} exts - Browser Extensions
  */
  createExtensions(exts) {
    if (exts !== null) {
      const extsAR = [];
      for (const d in exts) {
        if (exts[d]) {
          extsAR.push( this.extsPath + exts[d] );
          this.args.push('--load-extension=' + this.extsPath + exts[d] );
        } // if(exts[d]){
      }; // for (const d in exts) {

      this.args.push(`--disable-extension-except=${extsAR.join( ',' )}`);
    }; // if (exts !== null) {
  }; // createExtensions(){


  /**
   * check system OS and then create path related to OS
   * @param {string} platform - Name of Operating System
  */
  getPath(platform) {
    if (platform == 'darwin') {
      this.profilePath = './lib/browserProfiles/';
      this.extsPath = './lib/exts/';
    }
    if (platform == 'linux') {
      this.profilePath = './lib/browserProfiles/';
      this.extsPath = './lib/exts/';
    }
    if (platform == 'win32') {
      this.profilePath = '../../../../../lib/browserProfiles/';
      this.extsPath = '../../../../../lib/exts';
    }
  }; // getPath(){
}; // class Config {


export class StartBrowser extends Config{

  constructor(){ log('class Config - constructor()');
    super();

    const config = controllerLib.getConfig();
    this.config_browser_profile = config.bot.browser_profile;
    this.headless = config.bot.headless;
    this.windowWidth = config.bot.windowWidth;
    this.windowHeight = config.bot.windowHeight;

    this.getPath(os.platform());

    this.createArgs();
    this.createExtensions(config.bot.exts);

    log(`
      headless: ${this.headless}
      config_browser_profile: ${this.config_browser_profile}
      args: ${this.args}
      browserProfilePath: ${this.browserProfilePath}
    `);

  }; // constructor(){


  async launch(){ log('launch() - args: ' + this.args);
    try {
        this.client = await puppeteer.launch({
        //executablePath: '/snap/bin/chromium',
        //executablePath: '/usr/bin/google-chrome',
        //executablePath: '/home/user/Downloads/Linux_x64_749751_chrome-linux/chrome-linux/chrome',
        // executablePath: '/home/user/Downloads/firefox-78.0a1.en-US.linux-x86_64/firefox/firefox',
        devtools: true,
        headless: this.headless, // true or false
        userDataDir: this.profilePath + this.config_browser_profile,
        args: this.args
      });

      const page = await new Window().newTab(this.client);
      await new Simulate().setViewport(page, this.windowWidth, this.windowHeight);
      return {"client": this.client, "page": page};

    } catch(e) { error(e); }; // catch(e) {
  } // async function launch(){


  async error(e){ log('class StartBrowser - error() - error: ' + e);
    if( e?.length == undefined ) log( 'StartBrowser() - error is undefinied.. we restart now the browser..' );
    if( e?.name == 'TimeoutError' ) log( 'StartBrowser() - TimeoutError was found.. we restart now the browser..' );
    if( e == 'Error: connect ECONNREFUSED 0.0.0.0:4444') log( 'StartBrowser() - ECONNREFUSED error found..' );

    await this.client?.close();
    await this.launch();
  }; // async error(e){

}; // export class StartBrowser extends Config{
















export class Simulate{

  async click(css, page, delay){ log(`class Simulate - click() - CSS Selector: ${css} - Delay: ${delay}`);
    if(delay) await new Promise(resolve => setTimeout(resolve, delay));
    await page?.click(css);
  }; // async click(css, page, delay){

  async typeText(page, css, msg, delay){ log(`class Simulate - typeText() - CSS Selector: ${css} - Message: ${msg} - Delay: ${delay}`);
    await page.type(css, msg, { delay: delay });
  }; // async typeText(page, css, msg, delay){

  async setViewport(page, windowWidth, windowHeight){ log(`class Simulate - setViewport() - windowWidth: ${windowWidth} - windowHeight: ${windowHeight}`);
    await page.setViewport({width: windowWidth, height: windowHeight});
  }; // async setViewport(page, windowWidth, windowHeight){

}; // export class Simulate{
















export class Window{

  async openLinkNewTab(client, link, delay){ log(`class Window - openLinkNewTab() - Link: ${link} - Delay: ${delay}`);
    const page = await this.newTab(client);
    await this.openLink(page, link);
    if(delay) await new Promise(resolve => setTimeout(resolve, delay));
    return page;
  }; // async openLinkNewTab(client, link, delay){


  async openLink(page, link){ log( 'class Window - openLink() - link: ' + link );
    try {
      await page.goto(link, {waitUntil: 'networkidle0', timeout: 35000});
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
      await this.openLink(page, link);

    }; return true;
  }; // async openLink(page, link){


  async newTab(client){ log( 'class Window - newTab()');
    const newTab = await client.newPage();
    await newTab.bringToFront();
    return newTab;
  }; // async newTab(client){

}; // export class Window{
