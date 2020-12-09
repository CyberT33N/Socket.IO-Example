/*################ config.json ################*/
import fs from 'fs';
import yaml from 'js-yaml';


/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';


export const getConfig = ()=>{ log( 'lib.mjs - getConfig()' );
  return yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8'));
}; // export const getConfig = ()=>{
