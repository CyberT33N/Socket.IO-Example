/* ################ config.json ################ */
import fs from 'fs';
import yaml from 'js-yaml';

/* ################ Logs ################ */
import gradient from 'gradient-string';
import chalk from 'chalk';

export const getConfig = ()=>{
  return yaml.safeLoad(fs.readFileSync('./admin/config.yml', 'utf8'));
}; // export const getConfig = ()=>{


export const timeoutAsync = async amount=>{
  await new Promise(resolve=>setTimeout(resolve, amount));
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
