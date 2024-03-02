
const db = require("../models");
const programModel = require("../models/program.model");
const playtime = require("../lib/playtime.lib");
//const axios = require('axios/dist/node/axios.cjs'); // node

//const ytube= require("../lib/ytube2.lib");
//const pb = require("../lib/playbox.lib");

//const yt = require('youtube-search-without-api-key');
//const youtubesearchapi = require("youtube-search-api");

const ytApi = require("youtube-search-api");

const Program = db.programs;
const Channellist = db.channellists;
const Channel = db.channellists;
const Op = db.Sequelize.Op;
const roles= []
const reel = {

  //program_id:0   net_id    channel_id   play_at  play_index program_name  description duration
     // start  stop video_id  video_title   video_asset_type thumb_url   createdAt
}

// set the view engine to ejs


// use res.render to load up an ejs view file
// index page
// Retrieve all Channels from the database.
exports.login= (req, res) =>{

  loggedIn= false;

  if (loggedIn) {

    res.render("cloud")
    
    

  } else {

    res.render("login")
    

  }


  const channel_id = req.params.channel_id;
  //var condition = channel_id? { channel_id: { [Op.like]: `%${channel_id}%` } } : null;
}

// Retrieve all Channels from the database.
exports.apiByChannel_id= (req, res) =>{
  const channel_id = req.params.channel_id;
  //var condition = channel_id? { channel_id: { [Op.like]: `%${channel_id}%` } } : null;

  Program.findAll({ where: {channel_id: channel_id} })
  .then(data => {
 

cInfo = channelinfo(channel_id,(xInfo)=>{


  console.log(xInfo);

playtime.getNow(data, xInfo)

.then((payload)=>{


  
  //console.log("payload is here ooohh===",payload.programs);

  res.status(200).send(payload);
  

}).catch((error)=>{

 console.log(error);})



}).catch((error)=>{
  
  console.log(error);
});



  })

  .catch(error => {
    res.status(500).send({
      message:
        error || `Some error occurred while retrieving Programs for channel ${channel_id}. `
    });
  });



}


exports.youtubeSearch = (req, res) =>{
const search_params = req.params.search;


/**
 * Given a search query, searching on youtube
 * @ param {string} search value.
 */
//const videos =  youtubeSearch(search_params)

//const videos = playtime.ytSearch(search_params)
const videos = playtime.ytubeSearch (search_params,1)

.then((xvideos)=>{

  //console.log('Videos:');
  //console.log(xvideos);
  res.status(200) ;
  res.send(xvideos);
  

});


 }
 


async function youtubeSearch(search_params){

  //youtubeSearch(search_params);

console.log(search_params);
//youtubesearchapi.GetListByKeyword("<keywords>",[playlist boolean],[limit number],[options JSONArray]
mallam= await ytApi.GetListByKeyword(search_params);
 //mallam = await yt.search(search_params);
 console.log(mallam);

 return mallam;

};


//yt.search(search_params)




exports.playByChannel_id= (req, res) =>{
  const channel_id = req.params.channel_id;

  //var condition = channel_id? { channel_id: { [Op.like]: `%${channel_id}%` } } : null;

  console.log( 'about to play...................>>>..........'.channel_id);

  Program.findAll({ where: {channel_id: channel_id} })
  .then(data => {
 

cInfo = channelinfo(channel_id).


playtime.getNow(data, cInfo)

.then((payload)=>{

  //spayload = JSON.stringify(payload);
  //console.log("payload is here ooohh===",payload.programs);
  res.render('play.view.ejs',{channel_id:channel_id, payload,req});
  //res.status(200).send(payload);
  

});


  



  })

  .catch(error => {
    res.status(500).send({
      message:
        error || `Some error occurred while retrieving Programs for channel ${channel_id}. `
    });
  });



}



exports.playByChannel_id1= (req, res) =>{
  const channel_id = req.params.channel_id;

 //res.render('play.view.ejs',{channel_id:channel_id, req});









 


  //res.status(200).send({ message:`Welcome. Please wait as we playout ${channel_id}  at ${visit.clock} seconds uptime `});


}
// find all Program by Channel id

exports.findByChannel_id = (req, res) => {

  const channel_id = req.params.channel_id;
  
  console.log("we want  to get ..."+channel_id);


  Program.findAll({ where: {channel_id: channel_id} })
      .then(data => {
        res.status(200) ;
         res.send(data);
      })
      .catch(error => {
        res.status(200).send({
          message:
            error.message || `Some error occurred while retrieving Programs for channel ${channel_id}. `
        });
      });
 
 
    };
  


// Retrieve all Channels from the database.
exports.soon = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  
   Program.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Channels."
        });
      });
  };



  async function channelinfo(channel_id, callback){



    //Channellist.findAll({ where: {cid: the_channel_id} })

    //Channellist.findAll()
    Channel.findAll({ where: {channel_id: channel_id} })
    .then(bdata => {
     // console.log("The data->",data);
data=bdata[0].dataValues;

     // console.log("The data->",data);

mxdata =  playtime.setChannel(data)
.then((maxData)=>{

  if(callback)callback(maxData);
  //console.log("MX=",maxData);
  return maxData

});






});




      //res.status(200) ;
 


  


  
   // replace with  load from data base



//const channelToGet = await  getChannelInfo("the_channel_id");




//remove this soon
// /*
const channelToGet = {
name:"OneTV International",
channel_id:"onetv",
info:"",
station_id_logo:"https://onetv.ng/images/id/1tv%20-one.png",
 thumb_url:"",
timeZone: + 1, //utc  or gmt
  
  holding: "",
  id: 0,
  stationStartTime: 0, // in seconds
  stationDurationTime: 0, // in seconds
  stationStart: '06:00:00',
  stationDuration: '06:00:00',
  currentSession: 0, // count starting for 0 for first
  currentSessionTime: 0, // in seconds
  oneDay: 86400, // in seconds
  channel_number:0
  
  };
//  */

   
  };