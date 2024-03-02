const express = require("express");
//var favicon = require('serve-favicon');
const cors = require("cors");
const router = express.Router();

var errorHandler = require('errorhandler');

//const path = require('path');
const mongoose = require("mongoose");
var favicon = require('serve-favicon');
const compression = require("compression");
const csurf = require('csurf');
//var pack = require('package.json');
const cookieparser = require('cookie-parser');
const bodyparser   = require('body-parser');
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");

const buffer = require('buffer');
const latin1Buffer = buffer.transcode(Buffer.from('utf8String'), "utf8", "latin1");
const latin1String = latin1Buffer.toString("latin1");
var fs = require('fs');
var http = require('http');
var https = require('https');



router.use(express.json());
router.use(express.urlencoded({extended : false})); //===============
router.use(cookieparser('secret')); // read cookies (needed for auth)
router.use(bodyparser.urlencoded({extended: false})); // get information from html forms
router.use(bodyparser.json({limit: '100kb'}));
router.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 3600000 }}));
// Passport middleware
var success_msg;
// Connect flash
router.use(flash());
 global.USER = [];
//global variables
router.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});


const env ='development';

/***
 * 
 *  SSLCertificateFile    /etc/ssl/imediaport.com/cert.pem
                SSLCertificateKeyFile /etc/ssl/imediaport.com/privkey.pem
                SSLCertificateChainFile /etc/ssl/imediaport.com/chain.pem


                SSLCertificateFile /etc/letsencrypt/live/imediaport.com-0001/fullchain.pem
SSLCertificateKeyFile /etc/letsencrypt/live/imediaport.com-0001/privkey.pem
 */
//var privateKey  = fs.readFileSync('/etc/ssl/imediaport.com/privkey.pem', 'utf8');
//var certificate = fs.readFileSync('/etc/ssl/imediaport.com/cert.pem', 'utf8');

var privateKey  = fs.readFileSync('/etc/letsencrypt/live/imediaport.com-0001/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/imediaport.com-0001/fullchain.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
const app = express();
const XPORT = 2525;
const XPORTS =4646;
//Connect To DB
require('./config/db.js');
var corsOptions = {
  origin: "*"

};

var corsOptionsx = {
  origin: "https://imediaport.com"


};

var corsOptionss = {
  origin: function (origin, callback) {
    console.log(`Origin ${origin} is being granted CORS access`);
    callback(null, true)
  }
}

app.use(cors(corsOptions));
//app.use(cors(corsOptions));


//passport configuration file
require("./config/passport")(passport);
const path = require('path');

/*const csrfMiddleware = csurf({
  cookie: true



var xxsoptions = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'js','css','txt','png','jpg','html'],
  index: ['index.htm', 'index.html'],
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}
*/

app.use(compression());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(express.static('public', soptions))

//	Set Static Folder
// Compression to increaase the response time
app.set('views', __dirname + '/app/views');
// Use ICON for youe website
app.use(favicon(path.join(__dirname,'/public/img/favicon.png')));
app.engine('ejs', require('ejs-locals',{extname : 'ejs', defaultlayout : 'main',
	layoutDir : './app/views/layouts',	partialsDir  : './app/views/partials'
     }));

app.set('view engine', 'ejs');
/*** 

app.engine('ejs', require('ejs-locals',{extname : 'ejs', defaultlayout : 'main',
	layoutDir : __dirname+'/app/views/layouts',
	partialsDir  : [
        //  path to your partials
        path.join(__dirname, '/app/views/partials'),
    ] }));
*/





//var log = require('./app/lib/logger.lib');
//const visit = import('./app/lib/logger.lib', 'visit');
var visit={
  count:0,
  clock:0,
  detail:{},
  request:""
}
global.visit = visit;
//var visit = log.visit;




//app.use(express.static(path.join(__dirname, "js")));

//app.use(express.static(path.join(__dirname, "js")));
// parse requests of content-type - application/json
//app.use(express.static('public'))


// parse requests of content-type - application/x-www-form-urlencoded


const db = require("./app/models");

db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
/***** 

app.use((req, res, next) => {
  global.visit.count++;

//==================================================== clocking  ===============

 // console.log('Count time',global.visit.count);
 // console.log('clock time',global.visit.clock);
  //console.log('Time:', Date.now())
  next()
})
*/

router.use(passport.initialize());
router.use(passport.session());






require("./app/routes/user.routes")(app);
require("./app/routes/serv.routes")(app);

 
require("./app/routes/program.routes")(app);
require("./app/routes/channel.routes")(app);
require("./app/routes/tutorial.routes")(app);
require("./app/routes/schedule.routes")(app);
//require("./app/routes/playbox.routes")(app);
require("./app/routes/api.routes")(app);

/*


*/


app.get('*', (req, res) => {
  res.redirect('/');
});


setInterval(masterclock,1000);
// set port, listen for requests
const PORT = process.env.PORT || XPORT;
const PORTS = process.env.PORTS || XPORTS;
//app.listen(PORT, () => { console.log(`1Network PlayBOX Server 2.0 Ready on HTTP port ${PORT}.`);});



function masterclock(){

//global.visit.clock++;


};

if( env == 'development')
{
    errorHandler.title = "Ups...";
    app.use(errorHandler());
}
//console.log(`Here now and here`);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);



//httpServer.listen(PORT, () => { console.log(`1Network PlayBOX Server 2.0 Ready on HTTP port ${PORT}.`);});


httpsServer.listen(PORTS, () => {  console.log(`1Network PlayBOX Server 2.0 Ready on HTTPS port ${XPORTS}.`); });

