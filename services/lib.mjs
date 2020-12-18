/* ################ config.json ################ */
import fs from 'fs';
import yaml from 'js-yaml';

/* ################ Logs ################ */
import gradient from 'gradient-string';
import chalk from 'chalk';


/** get config.yml data*/
export class GetConfig {
  /** read config.yml, check for NPE and then return*/
  constructor() {
    const config = yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8'));
    this.checkNPE(config);
    return config;
  }; // constructor() {


  /**
   * Iterate through nested config object and check for empty string.
   * @param {object} obj - nested object
   */
  checkNPE(obj) {
    for (const name in obj) {
      if (typeof obj[name] === 'object') this.checkNPE(obj[name]);
      else if (obj[name]?.length < 1) throw new Error('Missing value @config');
    } // for(const name in obj){
  }; // checkNPE(obj) {
}; // export class GetConfig {


export const timeoutAsync = async amount=>{
  if (typeof amount === 'number') {
    await new Promise(resolve=>setTimeout(resolve, amount));
  } // if (typeof amount === 'number') {
}; // export const timeoutAsync = async amount=>{


export const ads = ()=>{
  console.log(`
  ${gradient('red', 'white').multiline([
    '',
    'Presented by',
    '████████╗██████╗ ██████╗ ███╗   ██╗',
    '╚══██╔══╝╚════██╗╚════██╗████╗  ██║',
    '   ██║    █████╔╝ █████╔╝██╔██╗ ██║',
    '   ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║',
    '   ██║   ██████╔╝██████╔╝██║ ╚████║',
    '   ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ Software',
  ].join('\n'))}
  Check my Github Profile:
  ${chalk.white.bgGreen.bold(' github.com/CyberT33N ')}
  ${gradient('white', 'black')('\n\n=====================================\n\n')}
  `);
}; // export const ads = ()=>{
