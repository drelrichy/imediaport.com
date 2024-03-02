const express = require("express");
const cors = require("cors");


const buffer = require('buffer');
const latin1Buffer = buffer.transcode(Buffer.from('utf8String'), "utf8", "latin1");
const latin1String = latin1Buffer.toString("latin1");
var fs = require('fs');
var http = require('http');
var https = require('https');

/***
 * 
 *  SSLCertificateFile    /etc/ssl/imediaport.com/cert.pem
                SSLCertificateKeyFile /etc/ssl/imediaport.com/privkey.pem
                SSLCertificateChainFile /etc/ssl/imediaport.com/chain.pem
 */
var privateKey  = fs.readFileSync('/etc/ssl/imediaport.com/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/ssl/imediaport.com/cert.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
const app = express();
const XPORT = 2525;
const XPORTS =4646;

const path = require('path');
var soptions = {
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

//app.use(express.static('public', soptions))



app.set('view engine', 'ejs')
app.set('views', './app/views')
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



var corsOptions = {
  origin: "https://imediaport.com"
};
app.use(cors(corsOptions));


//app.use(express.static('public'))
app.use('/public', express.static('public'));
//app.use(express.static(path.join(__dirname, "js")));

//app.use(express.static(path.join(__dirname, "js")));
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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


app.use((req, res, next) => {
  global.visit.count++;

//==================================================== clocking  ===============

 // console.log('Count time',global.visit.count);
 // console.log('clock time',global.visit.clock);
  //console.log('Time:', Date.now())
  next()
})

require("./app/routes/user.routes")(app);
require("./app/routes/serv.routes")(app);
require("./app/routes/program.routes")(app);
require("./app/routes/channel.routes")(app);
require("./app/routes/tutorial.routes")(app);
require("./app/routes/schedule.routes")(app);
//require("./app/routes/playbox.routes")(app);
require("./app/routes/api.routes")(app);

setInterval(masterclock,1000);
// set port, listen for requests
const PORT = process.env.PORT || XPORT;
const PORTS = process.env.PORTS || XPORTS;
//app.listen(PORT, () => { console.log(`1Network PlayBOX Server 2.0 Ready on HTTP port ${PORT}.`);});



function masterclock(){

global.visit.clock++;


};

console.log(`Here now and here`);

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);



httpServer.listen(PORT, () => { console.log(`1Network PlayBOX Server 2.0 Ready on HTTP port ${PORT}.`);});


httpsServer.listen(PORTS, () => {  console.log(`1Network PlayBOX Server 2.0 Ready on HTTPS port ${XPORTS}.`); });

