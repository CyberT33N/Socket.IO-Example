'use strict'
/*
███████████████████████████████████████████████████████████████████████████████
██******************** PRESENTED BY t33n Software ***************************██
██                                                                           ██
██                  ████████╗██████╗ ██████╗ ███╗   ██╗                      ██
██                  ╚══██╔══╝╚════██╗╚════██╗████╗  ██║                      ██
██                     ██║    █████╔╝ █████╔╝██╔██╗ ██║                      ██
██                     ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║                      ██
██                     ██║   ██████╔╝██████╔╝██║ ╚████║                      ██
██                     ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝                      ██
██                                                                           ██
███████████████████████████████████████████████████████████████████████████████
████████████████████████████████████████████████████████████████████████████████
.__                              __           .__               .__
|__| _____ ______   ____________/  |_  ______ |  |  __ __  ____ |__| ____   ______
|  |/     \\____ \ /  _ \_  __ \   __\ \____ \|  | |  |  \/ ___\|  |/    \ /  ___/
|  |  Y Y  \  |_> >  <_> )  | \/|  |   |  |_> >  |_|  |  / /_/  >  |   |  \\___ \
|__|__|_|  /   __/ \____/|__|   |__|   |   __/|____/____/\___  /|__|___|  /____  >
         \/|__|                        |__|             /_____/         \/     \/
*/

      const express = require('express'),
                app = express(),

         bodyParser = require('body-parser'),

               port = process.env.PORT || 1337,
          rateLimit = require('express-rate-limit'),
            timeout = require('connect-timeout'),

               http = require('http').createServer(app),

             //helmet = require('helmet'),
             //morgan = require('morgan'),

         controller = require('./controller/controller'),
  controllermongodb = require('./controller/controller-mongodb'),
controllerEndpoints = require('./controller/controller-endpoints'),



               path = require('path'),
                 os = require('os'),
             osHOME = os.homedir(),
         osPLATFORM = os.platform(),

     chalkAnimation = require('chalk-animation'),
           gradient = require('gradient-string'),
              chalk = require('chalk'),

                 fs = require('fs'),
                log = require('fancy-log'),

        json_config = JSON.parse(  fs.readFileSync('./admin/config.json', 'utf8')  ),

              limit = json_config.request_limit;

/*
 ████████████████████████████████████████████████████████████████████████████████
 */
 var ads = gradient('red', 'white').multiline([
        '',
        'Presented by',
        '████████╗██████╗ ██████╗ ███╗   ██╗',
        '╚══██╔══╝╚════██╗╚════██╗████╗  ██║',
        '   ██║    █████╔╝ █████╔╝██╔██╗ ██║',
        '   ██║    ╚═══██╗ ╚═══██╗██║╚██╗██║',
        '   ██║   ██████╔╝██████╔╝██║ ╚████║',
        '   ╚═╝   ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝ Software'
 ].join('\n'));
 console.log(ads);
 console.log( '\nCheck my Github Profile: ' + chalk.white.bgGreen.bold(' github.com/CyberT33N ')  + '\n\n');
 console.log( gradient('white', 'black')('\n\n=======================================\n\n') );














 /*
 -----------------------------------------------------------------------------

 ███████╗████████╗ █████╗ ██████╗ ████████╗    ███████╗ ██████╗██████╗ ██╗██████╗ ████████╗
 ██╔════╝╚══██╔══╝██╔══██╗██╔══██╗╚══██╔══╝    ██╔════╝██╔════╝██╔══██╗██║██╔══██╗╚══██╔══╝
 ███████╗   ██║   ███████║██████╔╝   ██║       ███████╗██║     ██████╔╝██║██████╔╝   ██║
 ╚════██║   ██║   ██╔══██║██╔══██╗   ██║       ╚════██║██║     ██╔══██╗██║██╔═══╝    ██║
 ███████║   ██║   ██║  ██║██║  ██║   ██║       ███████║╚██████╗██║  ██║██║██║        ██║
 ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝       ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝        ╚═╝
 */
log( 'Current working directory: ' + __dirname );



// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);
/*
log( 'rate limit value: ' + limit );
const apiLimiter = rateLimit({
  windowMs: limit,
  message: "Too many POST requests created from this IP, please try again in " + limit + "ms",
  max: 1 //<-- max limit
});
*/



// parse application/json
app.use( bodyParser.json() );

// adding Helmet to enhance your API's security
//app.use( helmet() );

// enabling CORS for all requests
//app.use( cors() );

// adding morgan to log HTTP requests
//app.use( morgan('combined') );

// set chat app website..
app.use(express.static(__dirname + '/website'));










// log all requests..
app.use((req, res, next)=>{

  if( path.extname(path.basename(req.url)) ) log("The file " + path.basename(req?.url) + " was requested.");
  else log("The endpoint " + path.basename(req?.url) + " was requested.");

  next();

}); // app.use((req, res, next)=>{

























  /*
  ███████╗███╗   ██╗██████╗ ██████╗  ██████╗ ██╗███╗   ██╗████████╗███████╗
  ██╔════╝████╗  ██║██╔══██╗██╔══██╗██╔═══██╗██║████╗  ██║╚══██╔══╝██╔════╝
  █████╗  ██╔██╗ ██║██║  ██║██████╔╝██║   ██║██║██╔██╗ ██║   ██║   ███████╗
  ██╔══╝  ██║╚██╗██║██║  ██║██╔═══╝ ██║   ██║██║██║╚██╗██║   ██║   ╚════██║
  ███████╗██║ ╚████║██████╔╝██║     ╚██████╔╝██║██║ ╚████║   ██║   ███████║
  ╚══════╝╚═╝  ╚═══╝╚═════╝ ╚═╝      ╚═════╝ ╚═╝╚═╝  ╚═══╝   ╚═╝   ╚══════╝
  */


// POST request where we take User Token and send back Object with User Details to Client
app.post('/api/getUserDetails', (req, res)=>{(async()=>{  await controllerEndpoints.getUserDetails(req, res);  })().catch((e)=>{  log('ASYNC - POST - Error at /api/getUserDetails - Error: ' + e)  })});

// POST request where we take Room ID and send back Object with Room Details to Client
app.post('/api/getRoomDetails', (req, res)=>{(async()=>{  await controllerEndpoints.getRoomDetails(req, res);  })().catch((e)=>{  log('ASYNC - POST - Error at /api/getRoomDetails - Error: ' + e)  })});


















// start server
http.listen(port, (async()=>{
log('Server was started.. Listening on port: ' + port);

  // connect to MongoDB Database
  if( !await controllermongodb.connectMongoDB() ) return false;
  log( 'Successfully connected to MongoDB Database' );

  // Start Socket.io
  controller.rootConnect(http);

})().catch((e)=>{  log('ASYNC - Error at main function.. Error: ' + e)  }));
