/* ################ Operating System ################ */
import os from 'os';

/* ################ Design ################ */
import log from 'fancy-log';

/* ################ Bot ################ */
import puppeteer from 'puppeteer';

/* ################ Controller ################ */
import ctrlLib from '../../controller/lib.mjs';

/* ################ Services ################ */
import {Window} from './Window.mjs';
import {Simulate} from './Simulate.mjs';


/** Get launch data like args and exts */
class Config {
  /** Create puppeteer launch arguments */
  createArgs() {
    this.args = [
      `--window-size=${this.windowWidth},${this.windowHeight}`,
      '--no-sandbox',
      '--force-webrtc-ip-handling-policy=disable-non-proxied-udp',
      '--lang=en',
    ]; if (this.headless) this.args.push('--disable-gpu');
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
          this.args.push(`--load-extension=${this.extsPath}/${exts[d]}`);
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
      this.profilePath = './lib/browserProfiles';
      this.extsPath = './lib/exts';
    }
    if (platform == 'linux') {
      this.profilePath = './lib/browserProfiles';
      this.extsPath = './lib/exts';
    }
    if (platform == 'win32') {
      this.profilePath = '../../../../../lib/browserProfiles';
      this.extsPath = '../../../../../lib/exts';
    }
  }; // getPath(){
}; // class Config {

/** Start Puppeteer */
export class StartBrowser extends Config {
  /** Get browser config and define globals*/
  constructor() {
    super();

    const config = ctrlLib.getConfig();
    this.profileName = config.test.bot.profile;
    this.headless = config.test.bot.headless;
    this.windowWidth = config.test.bot.windowWidth;
    this.windowHeight = config.test.bot.windowHeight;

    this.getPath(os.platform());
    this.createArgs();
    this.createExtensions(config.test.bot.exts);
  }; // constructor(){

  /** launch puppeteer with custom config */
  async launch() {
    try {
      this.client = await puppeteer.launch({
        devtools: true,
        headless: this.headless, // true or false
        userDataDir: `${this.profilePath}/${this.profileName}`,
        args: this.args,
      }); // this.client = await puppeteer.launch({

      const page = await new Window().newTab(this.client);

      await new Simulate(page).setViewport(
          this.windowWidth, this.windowHeight,
      ); // await new Simulate().setViewport(

      return {'client': this.client, 'page': page};
    } // try {
    catch (e) {log(`class StartBrowser error: ${e}`);
      await this.client?.close();
      await this.launch();
    }; // catch(e) {
  }; // async function launch(){
}; // export class StartBrowser extends Config{
