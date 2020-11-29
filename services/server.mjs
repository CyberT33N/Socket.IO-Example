/*################ Node.js ################*/
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url),
       __dirname = dirname(__filename);
console.log('server.mjs - __dirname: ' + __dirname);

/*################ Logs ################*/
import log from 'fancy-log';
import chalkAnimation from 'chalk-animation';
import gradient from 'gradient-string';
import chalk from 'chalk';


export const middleWare = (app, bodyParser, express)=>{ log('---- middleWare() ----');

  // parse application/json
  app.use( bodyParser.json() );

  // adding Helmet to enhance your API's security
  //app.use( helmet() );

  // enabling CORS for all requests
  //app.use( cors() );

  // adding morgan to log HTTP requests
  //app.use( morgan('combined') );

}; // export const middleWare = (app, bodyParser, express)=>{



export const startServer = (server, port)=>{ return new Promise(resolve => { log('---- startServer() - Port: ' + port + ' ----');
  server.listen(port, async()=>{ log('Server was started.. Listening on port: ' + port);
    resolve(true);
  }); // server.listen(port, async()=>{
})}; // export const startServer = (server, port)=>{


export const checkRequests = app => { log('---- checkRequests() ----');
  app.use((req, res, next)=>{
    if( path.extname(path.basename(req?.url)) ) log("The file " + path.basename(req?.url) + " was requested.");
    else log("The endpoint " + path.basename(req?.url) + " was requested.");
    next();
  }); // app.use((req, res, next)=>{
}; // export const checkRequests = app => {
