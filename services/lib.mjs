/* ################ config.json ################ */
import fs from 'fs';
import yaml from 'js-yaml';

/* ################ Logs ################ */
import log from 'fancy-log';
import gradient from 'gradient-string';
import chalk from 'chalk';

export const getConfig = ()=>{log( 'lib.mjs - getConfig()' );
  return yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8'));
}; // export const getConfig = ()=>{


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
