const playtime = require("../lib/playtime.lib");
const ytube = require("../lib/ytube2.lib");
const ytApi = require("youtube-search-api");
const trace=true;

//const playtime = require("../lib/playtime.lib");


const express = require('express');
const bcrypt = require("bcryptjs");
const passport = require("passport");

const cookieparser = require('cookie-parser');
const async = require('async');
const _ =  require('lodash');
const os = require('os');
var speakeasy = require("speakeasy");
const session = require('express-session');
var secret = new Buffer('yoursecret', 'base64');
const jwt = require('jsonwebtoken'); // Import JWT Package
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bodyparser   = require('body-parser');
const flash = require("connect-flash");
const passportLocalMongoose = require("passport-local-mongoose");
var dialog = require('dialog');
const alert =require('alert-node');
const User = require("../models/user");
const Serv = require("../models/serv");
const Schedule = require("../models/schedule");
const Admin = require("../models/admin");

const Usser = require("../models/Usser");
const Comment = require("../models/comment");
const Comment1 = require("../models/comment1");
const Comment2 = require("../models/comment2");
require("../../config/passport")(passport);
const { loginValidation , checkAuthenticated , forwardAuthenticated } = require('../../config/auth');
const { DATE } = require('sequelize');
const app = express();
var user;
const ROLE = {
  SUPER : 'supervise',
  ADMIN: 'admin',
  MANAGE: 'manage',
  EDIT: 'edit',
  BASIC: 'basic',
  SUPER: 'super',
  MASTER:'master'
}




function disDatOr(dis,dat,or){


  if (typeof dis != "undefined" ) {

    return dis;


  }

  if (typeof dat != "undefined" ) {

    return dat;


  }

  if (typeof or != "undefined" ) {

    return or;


  }


}




exports.apiByChannel_id = (req, res) =>{
  
  const channel_id = req.params.channel_id;


  if(channel_id==='new') {return;

  
  }


Serv.findOne({channel_id: channel_id}) .then(data => {
 
   // console.log(" >>>>>>>>>>>>  000 <<<<<<<<<<<<<<<<<<< ",data);


cInfo = station.channelinfo(channel_id,(xInfo)=>{


  console.log(" >>>>>>>>>>>>  001 <<<<<<<<<<<<<<<<<<< ",xInfo);


  res.status(200).send(xInfo);


  })

  .catch(error => {
    res.status(500).send({
      message:
        error || `Some error occurred while retrieving Information for channel ${channel_id}. `
    });

    
  });

});

}



exports.apiPlayByChannel_id = (req, res) =>{
  
  const channel_id = req.params.channel_id;

  console.log(channel_id);



  if(channel_id==='new') {return;

  
  }


  Serv.findOne({channel_id: channel_id}) .then(data => {

    if(data=== null){

      res.status(200).send( {message: "channel "+channel_id+" has no schedule", status:0});
      return;

    }
 
 //console.log(" >>>>>>>>>>>>  0001xx <<<<<<<<<<<<<<<<<<< ","|"+data+"|");

 //res.status(200).send("Result ="+data);
 

cInfo = station.channelinfo(channel_id,(channel)=>{


  //console.log(" >>>>>>>>>>>>  001 <<<<<<<<<<<<<<<<<<< ",xInfo);

  Schedule.findOne({channel_id: channel_id}) .then(schedule => {

    if(schedule=== null){

      res.status(200).send( {message: "channel "+channel_id+" has no schedule", status:0});
      return;

    }


  res.status(200).send({channel, status:1, message:'channel active', data, schedule});
  });


  })

  .catch(error => {
    res.status(500).send({ status:0,
      message:
        error || `Some error occurred while retrieving Information for channel ${channel_id}. `
    });

    
  });






});





}
//Login Function



exports.playByChannel_id = (req, res) =>{
  
  const channel_id = req.params.channel_id;


  console.log("Ready to play ----------------->>",channel_id);

  return;


  if(channel_id==='new') {return;

  
  }


Serv.findOne({channel_id: channel_id}) .then(data => {
 
   // console.log(" >>>>>>>>>>>>  000 <<<<<<<<<<<<<<<<<<< ",data);


cInfo = station.channelinfo(channel_id,(xInfo)=>{


  console.log(" >>>>>>>>>>>>  001 <<<<<<<<<<<<<<<<<<< ",xInfo);


  res.status(200).send(xInfo);


  })

  .catch(error => {
    res.status(500).send({
      message:
        error || `Some error occurred while retrieving Information for channel ${channel_id}. `
    });

    
  });

});

}



//exports.registeruser = async (req,res)=>{};

exports.api = 
{
  
 get: async (req,res)=>{
  
console.log(req.body);
console.log("the work now strts here Wetin dey happen");
    
 },

create: async (req,res)=>{
  //const createquery = req.query.q;
  console.log("U CHANNEL SAVER");

//res.send(req.body);
res.status(200);

 console.log(" we will register a channel ----- 01");
    
   // console.log("user controler .41");
   console.log("u CHANNEL SAVER");


   req.body.channel_id = req.body.channel_id.toLowerCase();
   req.body.channel_id = req.body.channel_id.replace(/[^a-zA-Z0-9 ]/g, '');


    //const { username, name, surname, email, password } = req.body;

    const {channel_id,country ,owner,email,source, channel_name,password, station_start_time, station_duration_time, channel_info,contact_email,telephone_contact,address,city,start_time,timezone,logo,cbrand,thumbnail, adminrole2, adminrole3,adminemail2,adminemail3,ckeyword}  = req.body;
     const admin_roles =[{username: email, role:'admin'}, { username : adminemail2 , role: adminrole2} ,{username: adminemail3 , role: adminrole3}];
     const admin_role = {username: email, role:'admin'};
     const name = owner;
    let err = [];
    const feed_base = req.body;

    const This_user = req.user;

    console.log(This_user,"is our logged in user");
console.log(req.body);
    // username= channel_id;


  /**
     */  



const feedup = {channel_id, country,source ,admin_role,owner,email,channel_name,password, station_start_time, station_duration_time, channel_info,contact_email,telephone_contact,address,city,start_time,timezone,logo,cbrand,thumbnail, admin_roles, ckeyword, ... feed_base} ;
   
console.log("We got", feedup );


feedup.channel_name =(feedup.channel_name==undefined)? feedup.channel_id   :feedup.channel_name;



  if (!channel_id ||!owner || !email || !password ) {
    err = "Please Fill All Fields";
  res.render('cloud/cregister',{user,'err' : err, ...feedup , returned:feedup});
      } else {
      if (owner.length < 5) {
      err = "owner must be at least 5 characters" ;
     return res.render('cloud/cregister',{user,'err' : err,   ...feedup , returned:feedup});
    }
    if (owner.length < 3) {
      err = "owner must be at least 3 characters" ;
     return res.render('cloud/cregister',{user,'err' : err,  ...feedup , returned:feedup});
    }
      if (password.length < 6) {
      err = "Password must be at least 6 characters" ;
     return res.render('cloud/cregister',{user,'err' : err,   ...feedup , returned:feedup});
    }
     if (err.length > 0) {
     return res.render("cloud/cregister", {user, 'err' : err,  ...feedup , returned:feedup});
    } 

  const stationExist = await Serv.findOne({channel_id: req.body.channel_id});
     if (stationExist){
     err = "Channel ID  Already Exist";
    return res.render('cloud/cregister',{user:req.user,'err' : err,   ...feedup , returned:feedup});
   } else {
     const salt = await bcrypt.genSalt(10 );
      const hashpasswd = await bcrypt.hash(req.body.password, salt);
       console.log("The Owner is=|"+req.body.owner+"|");
    
        const serv = new Serv(feedup );

    
 console.log(serv);
    
       sServ = await serv.save().then((error, result)=>{

        console.log("The  Station is Ready to Go ");
    
   // console.log("channel saving ER ="+error, "Result="+result);
    
       }).catch((error)=>{
    
        console.log("channel saving ER =",error);
       })


    
     try {
          
    
    
          //console.log("user before user");
          //console
      const saveServ = await serv.save((error)=>{
    
        //console.log("result  one",result);
    console.log("We got=>",error);
    
        if (error) {
    
          console.log("channel saving  inside two");
          console.log("channel saving Na error be sooooh",err);
    
        }else{
    
      console.log(" channel saving ER = inside three "); 
    
      temporarytoken = jwt.sign({ id: serv._id }, 'shhhhh', { expiresIn: '24h' }); 
    
      serv.temporary = temporarytoken ;
    
       console.log(This_user);
    
      // global.SERV[serv._id]= serv;
    
         // console.log("Na here we dey temporry =", user.temporary );
         // console.log('http://' + req.headers.host + '/activate/' + user.temporary + '\n\n');
    
    
          var smtpTransport = nodemailer.createTransport({
            host: "mail.imediaport.com",
            port: 587,
            auth: {
              user: "renny@imediaport.com",
              pass: "@Pass2021"
            }
          });
    
    
          var mailOptions = {
            to: serv.email,
            from: 'cloud@iMediaPORT.com',
            subject: 'New Channel Confirmation Link',
            text: 
              'Please click on the following link, to Confirm your Channel Account:\n\n' +
              'https://' + req.headers.host + '/activate_channel/' + serv.temporary + '\n\n' +
              'If you did not request this, please ignore this email..\n'
          };
    
          smtpTransport.sendMail(mailOptions, function(err, data) {
    
            console.log('mail sent');
    
            console.log("error=",err);
            console.log("error=",data);
            
          });
    
   return  res.render('cloud/cdone', {user, success_msg :serv.channel_id+' is now created But not yet Activated. channel Confirmation  link  was sent to your ' + serv.email+ ' e-mail.  Please Click on the link to Activate your Channel',callname:'login',callback: 'serv/playcon' });

    //res.render('cloud/cregister',{ user,  ...feedup,success_msg :serv.channel_id+' is now created But not yet Activated. channel Confirmation  link  was sent to your ' + serv.email+ ' e-mail.  Please Click on the link to Activate your Channel'}); 
      
    
    
    
      
              }
    
    
    
      });
    
    
       //return res.redirect('/login');
        
      }catch(err){
    
        res.status(400).send(err);
        
        }
    
    
    
    }
    };
    }
    ,
update: async (req,res)=>{
      //const createquery = req.query.q;
      console.log("U CHANNEL SAVER");
    
    //res.send(req.body);
    res.status(200);
    
     console.log(" we will register a channel ----- 01");
        
       // console.log("user controler .41");
       console.log("u CHANNEL SAVER");
    
    
      
    
    
    
        //const { username, name, surname, email, password } = req.body;
    
        const {channel_id,country ,owner,email,source, channel_name,password, station_start_time, station_duration_time, channel_info,contact_email,telephone_contact,address,city,start_time,timezone,logo,cbrand,thumbnail, adminrole2, adminrole3,adminemail2,adminemail3,ckeyword}  = req.body;
         const admin_roles =[{username: email, role:'admin'}, { username : adminemail2 , role: adminrole2} ,{username: adminemail3 , role: adminrole3}];
         const admin_role = {username: email, role:'admin'};
         const name = owner;
        let err = [];
        const feed_base = req.body;
    
        const This_user = req.user;
    
        console.log(This_user,"is our logged in user");
    console.log(req.body);
        // username= channel_id;
    
    
      /**
         */  
    
    
    
    const feedup = {channel_id, country,source ,admin_role,owner,email,channel_name,password, station_start_time, station_duration_time, channel_info,contact_email,telephone_contact,address,city,start_time,timezone,logo,cbrand,thumbnail, admin_roles, ckeyword, ... feed_base} ;
       
    console.log("We got", feedup );
    
    
    feedup.channel_name =(feedup.channel_name==undefined)? feedup.channel_id   :feedup.channel_name;
    
    
    
      if (!channel_id ||!owner || !email || !password ) {
        err = "Please Fill All Fields";
      res.render('cloud/cupdate',{user,'err' : err, ...feedup , returned:feedup});
          } else {
          if (owner.length < 5) {
          err = "owner must be at least 5 characters" ;
         return res.render('cloud/cupdate',{user,'err' : err,   ...feedup , returned:feedup});
        }
        if (owner.length < 3) {
          err = "owner must be at least 3 characters" ;
         return res.render('cloud/cupdate',{user,'err' : err,  ...feedup , returned:feedup});
        }
          if (password.length < 6) {
          err = "Password must be at least 6 characters" ;
         return res.render('cloud/cupdate',{user,'err' : err,   ...feedup , returned:feedup});
        }
         if (err.length > 0) {
         return res.render("cloud/cupdate", {user, 'err' : err,  ...feedup , returned:feedup});
        } 
    
      const stationExist = await Serv.findOne({channel_id: req.body.channel_id});
         if (!stationExist){
         err = "Station does not Exist, can only update existing channel or create new one";
        return res.render('cloud/cupdate',{user:req.user,'err' : err,   ...feedup , returned:feedup});
       } else {
         const salt = await bcrypt.genSalt(10 );
          const hashpasswd = await bcrypt.hash(req.body.password, salt);
           console.log("The Owner is=|"+req.body.owner+"|");
        
           // const serv = new Serv(feedup );
    
        
    // console.log(serv);
        
        //   sServ = await serv.update()
           
           Serv.updateOne(
            { 'channel_id' : channel_id },
            { $set: feedup }, {upsert: true}
          
          ).then((error, result)=>{
    
            console.log("The  Station is Updated");
        
       // console.log("channel saving ER ="+error, "Result="+result);
        
           }).catch((error)=>{
        
            console.log("channel  Update ER =",error);
           })
    
    
        
  
             
        
        }
        };
        }
        ,
  
  new:(req, res) =>{},

  cregister:(req, res) =>{

    const createQuery = req.query.q;
    if(createQuery){
      if(createQuery=="addnew"){
      
        user =req.user;
        console.log ("-------------------------- add new -------------------------",user);
        err="";
       
      
        return res.render('cloud/cregister',{...feedup , user,owner:"", success_msg:"Great!, Lets Add a New Channel" });
         
      
      }
    }
if(req.user){

      user = req.user;
    
   const aa =  station.getAdmin(user, (ans)=>{

console.log( "and we got ====..>>>>", ans);

   });
   const bb =    station.get_channel_id (user.channel_id);

   console.log ("--------a-------",aa);
   console.log ("---------b------",bb);


const work = station.work(user);
const current_channel_id = station.work(user);

//var report = station.addAdmin(user.channel_id,user.username, role);
//station.USER_addStation( channel_id,username, role);


      //if work ready

        res.render("cloud/cregister",{ user ,username: req.user.username, sess : req.session , subscr : req.sub  });

     //if no channel

    // res.render("cloud/cregister",{ user ,username: req.user.username, sess : req.session , subscr : req.sub  });   



      }
       else {

       

        res.render("login",{user, callback:'channel'});
  return;
       }
    






  },
  
cdone:(req, res) =>{
  //console.log("moving to activation done");

  res.render("cloud/cdone");

},

  } ;
    
 exports.index = async (req,res)=>{

  console.log("Entering server")

  if(user){

      res.render("cloud/index",{user});
    }
     else {
      res.render("login",{user});

     }
    };


exports.channel = async (req,res)=>{

    //  console.log("Now! .... 4 Entering  channel server");
    
  if(req.user){
        user = req.user;
     const aa =  await station.getAdmin(user, (ans)=>{

console.log( "and we got ====..>>>>", ans);

     });
     const bb =  await  station.get_channel_id (user.channel_id);

     console.log ("--------a-------",aa);
     console.log ("---------b------",bb);


const work = station.work(user);
const current_channel_id = station.work(user);

//var report = station.addAdmin(user.channel_id,user.username, role);
//station.USER_addStation( channel_id,username, role);


        //if work ready

          res.render("cloud/channel",{ user ,username: req.user.username, sess : req.session , subscr : req.sub  });

       //if no channel

      // res.render("cloud/cregister",{ user ,username: req.user.username, sess : req.session , subscr : req.sub  });   



        }
         else {

         

          res.render("login",{user, callback:'channel'});
    
         }
        };

exports.cregister = async (req,res)=>{

          console.log("Now! ....register new Entering  channel server");
          
        if(req.user){
              user = req.user;
           const aa =  await station.getAdmin(user, (ans)=>{
      
      console.log( "and we got ==----------103-------------==..>>>>", ans);
      
           });
           const bb =  await  station.get_channel_id (user.channel_id);
      
           console.log ("-----002---a-------",aa);
           console.log ("-----003----b------",bb);
      
      
      const work = station.work(user);
      const current_channel_id = station.work(user);
      
      //var report = station.addAdmin(user.channel_id,user.username, role);
      //station.USER_addStation( channel_id,username, role);
      
      
              //if work ready
    res.render("cloud/cregister",{ user ,username: req.user.username, sess : req.session , subscr : req.sub  });
      
             //if no channel
      
            // res.render("cloud/cregister",{ user ,username: req.user.username, sess : req.session , subscr : req.sub  });   
      
      
      
              }
               else {
      
               
      
                res.render("login",{user, callback:'channel'});
          
               }
              };
      
exports.cupdate = async (req,res)=>{

                console.log("Now! ....register new Entering  channel server");
                
              if(req.user){
                    user = req.user;
                 const aa =  await station.getAdmin(user, (ans)=>{
            
            console.log( "and we got ==----------103-------------==..>>>>", ans);
            
                 });
                 const bb =  await  station.get_channel_id (user.channel_id);
            
                 console.log ("-----002---a-------",aa);
                 console.log ("-----003----b------",bb);
            
            
            const work = station.work(user);
            const current_channel_id = station.work(user);
            
            //var report = station.addAdmin(user.channel_id,user.username, role);
            //station.USER_addStation( channel_id,username, role);
            
            
                    //if work ready
          res.render("cloud/cupdate",{ user ,username: req.user.username, sess : req.session , subscr : req.sub  });
            
                   //if no channel
            
                  // res.render("cloud/cregister",{ user ,username: req.user.username, sess : req.session , subscr : req.sub  });   
            
            
            
                    }
                     else {
            
                     
            
                      res.render("login",{user, callback:'channel'});
                
                     }
                    };

function manai(xx){

          if(req.user){


            console.log("Entering  channel server =================");
    
          res.render('cloud/index', { user : req.user , sess : req.session , subscr : req.sub  });
            } else {
    
              console.log("Entering  c+++++++++++++++++++hannel server");
              res.render('login', { user : req.user , sess : req.session , subscr : req.sub  });
           
    
            }

        }

//Register Funcion
exports.register = (req, res) => res.render("register");


exports.bulkquery = (req, res) => {
  const dataquery = req.query.dataquery;
  // Validate request
    if (!req.body) {
      res.status(200).send({
        message: "Content can not be empty!"
      });
   // return;
    } 
}


exports.bulk = (req, res) => {
  // Validate request
    if (!req.body) {
      res.status(200).send({
        message: "Content can not be empty!"
      });
          return;
    } 
  //  res.status(200);
  console.log("====================== Create all records =============");
  
  var st =0;
  var   longmessage="";
   
  const bulkData= req.body

    // Save Program in the database
  //  work_playlist
  //bulkData.updateAt = DATE;
//console.log(bulkData);
console.log("============    now we are starting ====001=======",bulkData.channel_id);
//console.log("============    now we are starting show all =====002======",bulkData);
/**
 *                 
owner/ name/ user:Object/playlist : [{ Object,	}],type:,date: date

*/

//var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };

var newvalues = {owner: bulkData.channel_id , name: bulkData.name + bulkData.channel_id , user:{usernme: bulkData.username, role: bulkData.role} , playlist : bulkData.playlist,  type: 'backup', date:""};
//Schedule.create( newvalues, function(err, res) {
  Schedule.updateOne({name: newvalues.name },{upsert: true, setDefaultsOnInsert: true}, function(err, res) {
  console.log("1 document updated", res);
//.update({_id: id}, obj, {upsert: true, setDefaultsOnInsert: true}, cb);

  if (err) throw err;

  //console.log("1 document updated");

});


console.log (" about to save in to ",bulkData.channel_id);
//console.log (" about to save in to show all  ",bulkData);


Serv.updateOne(
  { 'channel_id' : bulkData.channel_id },
  { $set: { 'work.playlist': bulkData }}, {upsert: true}

).then((response)=>{

  
 console.log(response);
 res.status(200).send({
  message: response , status: 'done'
}); 

}).catch(error=>{

  console.log(error);
});

/** 
    try {
      console.log("Now trying ==========================");
     Serv.updateOne(
         { 'channel_id' : bulkData.channel_id},
         { $set: { 'work_playlist' : bulkData } }
      );


   } catch (e) {
      //print(e);
      console.log(e);
   }
   
*/
   /***
   
    dprograms.forEach(program => {
  

      Serv.updateOne(program)
      .then(response => {
        
        longmessage =  longmessage + response.data;
        st=1;
        console.log(response);
      })
      .catch(err => {
     console.log(err);
        longmessage =  longmessage + err;
        st=0;
      });
  
      
    });
  
   */

    
  
  
  
  }
  

  exports.putschedules = (req, res) => {
    // Validate request
      if (!req.body) {
        res.status(200).send({
          message: "Content can not be empty!"
        });
            return;
      } 
    //  res.status(200);
    console.log("====================== Create all records =============");
    
    var st =0;
    var   longmessage="";
     
    const bulkData= req.body
  
      
  console.log("============    now we are starting ====001=======",bulkData.channel_id);
  //console.log("============    now we are starting show all =====002======",bulkData);
  /***
  
  var newvalues = {owner: bulkData.channel_id , name: bulkData.name + bulkData.channel_id , user:{usernme: bulkData.username, role: bulkData.role} , playlist : bulkData.playlist,  type: 'backup', date:""};
  //Schedule.create( newvalues, function(err, res) {
    Schedule.updateOne({name: newvalues.name },{upsert: true, setDefaultsOnInsert: true}, function(err, res) {
    console.log("1 document updated", res);
  //.update({_id: id}, obj, {upsert: true, setDefaultsOnInsert: true}, cb);
  
    if (err) throw err;
  
    //console.log("1 document updated");
  
  });
  
  
  console.log (" about to save in to ",bulkData.channel_id);
  //console.log (" about to save in to show all  ",bulkData);
  
  
  Serv.updateOne(
    { 'channel_id' : bulkData.channel_id },
    { $set: { 'work.playlist': bulkData }}, {upsert: true}
  
  ).then((response)=>{
  
    
   console.log(response);
   res.status(200).send({
    message: response , status: 'done'
  }); 
  
  }).catch(error=>{
  
    console.log(error);
  });
   */
  /** 
      try {
        console.log("Now trying ==========================");
       Serv.updateOne(
           { 'channel_id' : bulkData.channel_id},
           { $set: { 'work_playlist' : bulkData } }
        );
  
  
     } catch (e) {
        //print(e);
        console.log(e);
     }
     
  */
     /***
     
      dprograms.forEach(program => {
    
  
        Serv.updateOne(program)
        .then(response => {
          
          longmessage =  longmessage + response.data;
          st=1;
          console.log(response);
        })
        .catch(err => {
       console.log(err);
          longmessage =  longmessage + err;
          st=0;
        });
    
        
      });
    
     */
  
  
    
    }

    exports.getschedules = (req, res) => {
      // Validate request

        if (!req.body) {
          res.status(200).send({
            message: "Content can not be empty!"
          });
              return;
        } 
      //  res.status(200);
     
    const bulkData= req.body
    /** 
    console.log(bulkData.query );
    Schedule.findOne( bulkData.query ).then((response)=>{
    
      console.log(response);
   
     res.status(200).send(response);
        return;
  
    }).catch(error=>{
    
      console.log(error);
    });
    */
      
      }

  exports.putplaylist = (req, res) => {
    // Validate request
      if (!req.body) {
        res.status(200).send({
          message: "Content can not be empty!"
        });
            return;
      } 
   
    var st =0;
    var   longmessage="";
     
    const bulkData= req.body
    const imedia = bulkData.query;

    console.log("------------004-------------::>>",bulkData);
 /** 
  var newvalues = {owner: bulkData.channel_id , name: bulkData.name + bulkData.channel_id , user:{usernme: bulkData.username, role: bulkData.role} , playlist : bulkData.playlist,  type: 'PlaylistA_backup', date:""};
  //Schedule.create( newvalues, function(err, res) {
    Schedule.updateOne({name: newvalues.name },{upsert: true, setDefaultsOnInsert: true}, function(err, res) {
    console.log("1 document updated", res);
  //.update({_id: id}, obj, {upsert: true, setDefaultsOnInsert: true}, cb);
  
    if (err) throw err;
  
    //console.log("1 document updated");
  
  });
  
  
  console.log (" about to save in to ",bulkData.channel_id);
  //console.log (" about to save in to show all  ",bulkData);
  */
  
if(imedia.request=='update_one'){

  Serv.updateOne(
    { 'channel_id' : bulkData.query.channel_id },
    { $set: { 'work.playlist': bulkData }}, {upsert: true}
  
  ).then((response)=>{
  
    
   console.log(response);
   res.status(200).send({
    message: response , status: 'done'
  }); 
  
  }).catch(error=>{
  
    console.log(error);
  });
  


}

console.log("imedia.request=",imedia.request);
if(imedia.request=='playlist_update'){

  console.log("indide =",imedia.request)
  Serv.updateOne(
    { 'channel_id' : bulkData.query.channel_id },
    { $set: { 'work.playlist': bulkData.data }}, {upsert: true}
  
  ).then((response)=>{
  
    
   console.log(response);
   res.status(200).send({
    message: response , status: 'done'
  }); 
  
  }).catch(error=>{
  
    console.log(error);
  });
  


}

console.log("imedia.request=",imedia.request);
if(imedia.request=='schedule_update'){

  console.log("indide =",imedia.request)
 Schedule.updateOne(
    { 'channel_id' : bulkData.query.channel_id, name: bulkData.data.name  },
    { $set: {...bulkData.data }}, {upsert: true}
  
  ).then((response)=>{
  
    
   console.log(response);
   res.status(200).send({
    message: response , status: 'done'
  }); 
  
  }).catch(error=>{
  
    console.log(error);
  });
  


}

if(imedia.request=='searchlist_update'){

  Serv.updateOne(
    { 'channel_id' : bulkData.query.channel_id },
    { $set: { 'work.searchlist': bulkData.data }}, {upsert: true}
  
  ).then((response)=>{
  
    
   console.log(response);
   res.status(200).send({
    message: response , status: 'done'
  }); 
  
  }).catch(error=>{
  
    console.log(error);
  });
  


}
if(imedia.request=='epg_update'){

  Serv.updateOne(
    { 'channel_id' : bulkData.query.channel_id },
    { $set: { 'work.epg': bulkData.data }}, {upsert: true}
  
  ).then((response)=>{
  
    
   console.log(response);
   res.status(200).send({
    message: response , status: 'done'
  }); 
  
  }).catch(error=>{
  
    console.log(error);
  });
  


}

if(imedia.request=='libry_update'){

  Serv.updateOne(
    { 'channel_id' : bulkData.query.channel_id },
    { $set: { 'work.libry': bulkData.data }}, {upsert: true}
  
  ).then((response)=>{
  
    
   console.log(response);
   res.status(200).send({
    message: response , status: 'done'
  }); 
  
  }).catch(error=>{
  
    console.log(error);
  });
  


}
        
    



if(imedia.request=='get_work_searchlist'){

  Serv.findOne( {channel_id: imedia.channel_id} ).then((response)=>{
  
    console.log("------------007-------------::>>",response.work.searchlist);
 
   res.status(200).send(response.work.searchlist);
      return;

  }).catch(error=>{
  
    console.log(error);
  });
  

}

if(imedia.request=='get_work_playlist'){

  Serv.findOne( {channel_id: imedia.channel_id} ).then((response)=>{
  
    console.log("------------007-------------::>>",response.work.playlist);
 
   res.status(200).send(response.work.playlist);
      return;

  }).catch(error=>{
  
    console.log(error);
  });
  

}

if(imedia.request=='get_work_epg'){

  Serv.findOne( {channel_id: imedia.channel_id} ).then((response)=>{
  
    console.log("------------007-------------::>>",response.work.epg);
 
   res.status(200).send(response.work.epg);
      return;

  }).catch(error=>{
  
    console.log(error);
  });
  

}

if(imedia.request=='get_work_libry'){

  Serv.findOne( {channel_id: imedia.channel_id} ).then((response)=>{
  
    console.log("------------007-------------::>>",response.work.libry);
 
   res.status(200).send(response.work.libry);
      return;

  }).catch(error=>{
  
    console.log(error);
  });
  

}

    
    
    };

exports.apiGetByChannel_id= (req, res) => {
  const apiReg= req.body
};

exports.apiPutByChannel_id= (req, res) => {
  const apiReg= req.body.query;
  //query={query:{channel_id:channel_id, reguest: 'get_channel_info'}}

if(apiReg.reguest== 'get_channel_info'){


Serv.findOne({channel_id: apiReg.channel_id }, respones=>{


station.channelinfo(respones, feedback=>{

  console.log ('channel_info feed bck -=---------->', feedback);

res.status(200).send(feedback);

return
}).catch( error=>{

console.log(error);

})



})


}




};

exports.apiGetByChannel= (req, res) => {
  const apiReg= req.body

};

exports.apiPutByChannel = (req, res) => {
  const apiReg= req.body


};


const iPort ={








}




    exports.getChannelById = (req, res) => {
      // Validate request
      const channel_id = req.params.channel_id;
     
    const bulkData= req.body
    
    console.log("------------006-------------::>>",bulkData);
    Serv.findOne( bulkData.query ).then((response)=>{
    
      console.log("------------007-------------::>>",response);
   
     res.status(200).send({data: response});
        return;
  
    }).catch(error=>{
    
      console.log(error);
    });
    
    
      };
   
    

exports.getplaylist = (req, res) => {
    // Validate request
    const channel_id = req.params.channel_id;
   
  const bulkData= req.body;
  
  console.log("------------006-------------::>>",bulkData);
  Serv.findOne( {channel_id: channel_id} ).then((response)=>{
  
    console.log("------------007-------------::>>",response);
 
   res.status(200).send({data: response});
      return;

  }).catch(error=>{
  
    console.log(error);
  });
  
  
    }
 
exports.getdata = (req, res) => {
      // Validate request
        if (!req.body) {
          res.status(200).send({
            message: "Content can not be empty!"
          });
              return;
        } 
      //  res.status(200);
      
    
       
      const bulkData= req.body
    
    
    Schedule.findOne( bulkData.query ).then((response)=>{
     console.log(response);




   
     res.status(200).send(response);
        return;
  
    }).catch(error=>{
    
      console.log(error);
    });
    
      
      }
      

 exports.getdata = (req, res) => {
      // Validate request
        if (!req.body) {
          res.status(200).send({
            message: "Content can not be empty!"
          });
              return;
        } 
      //  res.status(200);
      
    
       
      const bulkData= req.body
    
    
    Schedule.findOne( bulkData.query ).then((response)=>{
     console.log(response);




   
     res.status(200).send(response);
        return;
  
    }).catch(error=>{
    
      console.log(error);
    });
    
      
      }
      


exports.cloud = async (req, res) => {
 var  err="";

  if(req.user){
    err="";

    user = req.user;
    const aa =  await station.getAdmin(user, (auth_admins)=>{
      if (auth_admins.length === 0) {

        err = "You don't have any Channel in this account. Please click channel to create one";
       
        return  res.render('cloud/cdone', {user,err, callname:'Register New Channel',callback: 'cregister' });

      } else {
        err="";

        var channel= auth_admins[0];
        res.redirect('/serv/playcon/'+channel.channel_id);

       // res.render('cloud/cloud'+, { channel, user : req.user , sess : req.session , subscr : req.sub  });
   


      }

//console.log( "and we got ====..>>>>", ans);

    });

    //console.log("103 Entering   Serv Router  channel server =================");

} else {


      console.log("108 Entering Serv Rout  c+++++++++++++++++++hannel server");
      res.render('login', { user : req.user , sess : req.session , subscr : req.sub, callback: 'serv' });
   

    }

      };
// Server side - example is an Express controller

exports.cregisterx = async (req, res) => {
  var  err="";
   //console.log("96 Entering  /  Serv Router ...... channel server");
 
   //console.log(req.user +" and",req.session);
 
   if(req.user){
     err="";
 
     user = req.user;
     const aa =  await station.getAdmin(user, (auth_admins)=>{
       if (auth_admins.length === 0) {
 
         err = "You don't have any Channel in this account. Please click channel to create one";
        
         return  res.render('cloud/cdone', {user,err, callname:'Register New Channel',callback: 'cregister' });
 
       } else {
         err="";

         cons
 
         var channel= auth_admins[0];
         //res.redirect('/serv/'+channel.channel_id);
 
     res.render('cloud/playconsole', { channel, user : req.user , sess : req.session , subscr : req.sub  });
    
 
 
       }
 
 //console.log( "and we got ====..>>>>", ans);
 
     });
 
     //console.log("103 Entering   Serv Router  channel server =================");
 
 } else {
 
 
       console.log("108 Entering Serv Rout  c+++++++++++++++++++hannel server");
       res.render('login', { user : req.user , sess : req.session , subscr : req.sub, callback: 'serv' });
    
 
     }
 
       };


       exports.pcloud = async (req, res) => {
        var  err="";
         //console.log("96 Entering  /  Serv Router ...... channel server");
       
         //console.log(req.user +" and",req.session);
       
         if(req.user){
           err="";
       
           user = req.user;
           const aa =  await station.getAdmin(user, (auth_admins)=>{
             if (auth_admins.length === 0) {
       
               err = "You don't have any Channel in this account. Please click channel to create one";
              
               return  res.render('cloud/cdone', {user,err, callname:'Register New Channel',callback: 'cregister' });
       
             } else {
               err="";
       
               var channel= auth_admins[0];
               //res.redirect('/serv/'+channel.channel_id);
       
           res.render('cloud/playconsole', { channel, user : req.user , sess : req.session , subscr : req.sub  });
          
       
       
             }
       
       //console.log( "and we got ====..>>>>", ans);
       
           });
       
           //console.log("103 Entering   Serv Router  channel server =================");
       
       } else {
       
       
             console.log("108 Entering Serv Rout  c+++++++++++++++++++hannel server");
             res.render('login', { user : req.user , sess : req.session , subscr : req.sub, callback: 'serv' });
          
       
           }
       
             };



exports.cloudWithId= async (req, res) => {
 // const urlParams = new URLSearchParams(window.location.search);
 const calledPage = "./serv"+req.url;
 console.log("The caller .........", calledPage);
  //const myParam = urlParams.get('myParam');
  const channel_id = req.params.channel_id;
        var  err="";
         //console.log("96 Entering  /  Serv Router ...... channel server");
         console.log("channel ID",channel_id ); 
      console.log(req.user +" and",req.session);
       
         if(req.user){
          console.log(">>>>>>>>>>>-----------------ROLE ----->>>","|"+user.role+"|");
           err="";
        var myadmin=[];
        var  channel={};
           user = req.user;
           const aa =  await station.getAdmin(user, (auth_admins)=>{
             if (auth_admins.length === 0) {
         
               err = "You don't have any Channel in this account. Please click channel to create one";
              
               return  res.render('cloud/cdone', {user,err, callname:'Register New Channel',callback: 'cregister' });
       
             } else {
               err="";
             
               if (auth_admins.length > 1){
                auth_admins.forEach((chan,i)=>{
                

                  if(chan.channel_id){
                let  lookcan = chan.channel_id.toLowerCase();
                myadmin.push(lookcan);
                let  channelid = channel_id.toLowerCase();
          if(lookcan == channelid)  channel= auth_admins[i];

}
        //  console.log("------------------- you want ---------", channelid);
         // console.log("------------------- we hve ---------", lookcan);
       //   console.log("------------------- our store hs ---------", auth_admins);
          
          

                })


               } else {

lookcan = auth_admins[0].channel_id.toLowerCase();
                channel= auth_admins[0];

               myadmin.push(lookcan);
               }





      console.log("--------------------channel-----------------",channel);
    //  console.log("--------------------admin list-----------------", auth_admins);
               //res.redirect('/serv/'+channel.channel_id);
 res.render('cloud/playconsole', { channel, myadmin, adminroles:auth_admins,  user : req.user , sess : req.session , subscr : req.sub , basechannel:channel });
          
       
       
             }
       
       //console.log( "and we got ====..>>>>", ans);
       
           });
       
           //console.log("103 Entering   Serv Router  channel server =================");
       
       } else {
       



       
             console.log("108 Entering Serv Rout  c+++++++++++++++++++hannel server");
             res.render('login', { user : req.user , sess : req.session , subscr : req.sub, callback: 'serv' });
          
       
           }
       
             };
exports.logger = function(req, res) {
  var log_user = {
    agent: req.header('user-agent'), // User Agent we get from headers
    referrer: req.header('referrer'), //  Likewise for referrer
    ip: req.header('x-forwarded-for') || req.connection.remoteAddress, // Get IP - allow for proxy
    screen: { // Get screen info that we passed in url post data
      width: req.param('width'),
      height: req.param('height')
    }
  };
  console.log(log_user);
  // Store the user in your database
  // User.create(log_user)...
  res.end();
}

exports.registeruser = async (req,res)=>{
console.log("Wetin dey happen");



const { username, name, surname, email, password } = req.body;
 let err = [];
 if (!username ||!name || !email || !password ) {
  err = "Please Fill All Fields";
res.render('register',{'err' : err, 'email' : email , 'name' : name , username, surname,  'password' : password});
    } else {
    if (name.length < 5) {
    err = "Name must be at least 5 characters" ;
   return res.render('register',{'err' : err, 'email' : email , 'name' : name , username, surname,  'password' : password});
  }
  if (name.length < 3) {
    err = "Name must be at least 3 characters" ;
   return res.render('register',{'err' : err, 'email' : email , 'name' : name , username, surname,  'password' : password});
  }
    if (password.length < 6) {
    err = "Password must be at least 6 characters" ;
   return res.render('register',{'err' : err, 'email' : email , 'name' : name , username, surname,  'password' : password});
  }
   if (err.length > 0) {
   return res.render("register", { 'err' : err});
  } 
const emailExist = await User.findOne({email : req.body.email});
   if (emailExist){
   err = "Email Already Exist";
  return res.render('register',{'err' : err, 'email' : email , 'name' : name , username, surname,  'password' : password});
 } else {
 	const salt = await bcrypt.genSalt(10 );
    const hashpasswd = await bcrypt.hash(req.body.password, salt);
   // const user = new User(); // Create new User object
	//user.name = req.body.name; // Save username from request to User object
  //user.role = ROLE.BASIC;
	//user.email = req.body.email; // Save email from request to User object
  //user.hostname = os.hostname();
	//user.password = hashpasswd;
  /*user : _.pick(user, 'id')*/
  /*id: user._id*/
  //temporarytoken = jwt.sign({ id: user._id }, 'shhhhh', { expiresIn: '24h' }); 
	//user.temporary = temporarytoken ;

   console.log("The Name is=|"+req.body.name+"|");

    const user = new User({
      username : req.body.username,
      name: req.body.name, 
      surname: req.body.surname,
      role : ROLE.BASIC,
      email : req.body.email,
      hostname : os.hostname(),
      password : hashpasswd

    });

   // console.log(user)

   sUser = await user.save().then((error, result)=>{

console.log("ER="+error, "Result="+result);

   }).catch((error)=>{

    console.log(error);
   })

 try {
      


      //console.log("user before user");
      //console
  const saveUser = await user.save((error)=>{

    //console.log("result  one",result);
console.log("We got=>",error);

    if (error) {

      console.log("user inside two");
      console.log("Na error be sooooh",err);

    }else{

  console.log("user inside three "); 

  temporarytoken = jwt.sign({ id: user._id }, 'shhhhh', { expiresIn: '24h' }); 

   user.temporary = temporarytoken ;

   console.log(user);

   global.USER[user._id]= user;

     // console.log("Na here we dey temporry =", user.temporary );
     // console.log('http://' + req.headers.host + '/activate/' + user.temporary + '\n\n');


      var smtpTransport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
    port: 465,
    secure: true,
   service : 'gmail',
        auth:   { user: 'onetv.ng@gmail.com',
        pass: 'avyfuzccdkbcfhrc'
      }

      });


      var mailOptions = {
        to: user.email,
        from: 'onetv.ng@gmail.com',
        subject: 'Account Confirmation Link',
        text: 
          'Please click on the following link, to Confirm your Account:\n\n' +
          'http://' + req.headers.host + '/activate/' + user.temporary + '\n\n' +
          'If you did not request this, please ignore this email..\n'
      };

      smtpTransport.sendMail(mailOptions, function(err, data) {

        console.log('mail sent');

        console.log("error=",err);
        console.log("error=",data);
        
      });


res.render('register',{ success_msg :'Account Registered But not yet Activated. Account Confirmation link sent to your ' + user.email + ' Please Click on the link to Activate your account'}); 
  



  
          }



  });


   //return res.redirect('/login');
    
  }catch(err){

    res.status(400).send(err);
    }



    /** 
      user.save(function(err) {
      	
        if (err) {
      		console.log("Na error be sooooh",err);
      	}else{
			  var smtpTransport = nodemailer.createTransport({
			        host: 'smtp.gmail.com',
					port: 465,
					secure: true,
			   service : 'gmail',
			        auth: {
			          user: 'onetv.ng@gmail.com', 
			        pass: 'avyfuzccdkbcfhrc'
			        }

			      });


			      var mailOptions = {
			        to: user.email,
			        from: 'Localhost Staff,onetv.ng@gmail.com',
			        subject: 'Account Confirmation Link',
			        text: 
			          'Please click on the following link, to Confirm your Account:\n\n' +
			          'http://' + req.headers.host + '/activate/' + user.temporary + '\n\n' +
			          'If you did not request this, please ignore this email..\n'
			      };

			      smtpTransport.sendMail(mailOptions, function(err) {
			        console.log('mail sent');
              
			      });
			res.render('register',{ success_msg :'Account Registered But not yet Activated. Account Confirmation link sent to your ' + user.email + ' Please Click on the link to Activate your account'}); 
      	
    
    }



				});
*/

}
};
};


exports.loginuser =  async (req,res,next) => {
  const { error } = loginValidation(req.body);
  if (error) return    res.status(400).send(error.details[0].message);
//  Check if user is  exist in database or not
User.findOne({email : req.body.email} , async function(err,user){
	if (!user) {
		   err = "Email or Password is Incorrect";
   		res.render('login',{'err' : err});
	}
	if (user) {
		if (!user.active) {
				err = "Account is Not yet Activated, Check your email to activate your account.";
		   		res.render('login',{'err' : err});
			}
			if(user.active){
				//  Its's Only Matched the Encrypted Password....
				  const validPass = await bcrypt.compare(req.body.password,user.password);
				  if (!validPass) {
				  	err = "Email or Password is Incorrect";
			   		res.render('login',{'err' : err});
			   		}
			   	if (validPass) {
            const hoste = user._id;
            const moon = os.hostname();
            const mooni = moon.toString();
            console.log("DB ID : " +hoste);
            console.log("Hostname : " + mooni);
            const muchi = { hostname : { $elemMatch : { $in: [ moon ] } } } ;

     User.findOne({ hostname : { $elemMatch : { $in: [ moon ] } } }, function(err,wow){
              console.log("what is : "+ wow);
              if (wow) {
                console.log("Is Empty : "+wow);
               console.log("Is Empty : "+!wow);
                passport.authenticate('local', {
                            successRedirect: "/index",
                            failureRedirect: "/login",
                            failureFlash: true,
                          })(req, res, next);
              }
              if (!wow) {
                var secret = speakeasy.generateSecret({length: 20});
                    var token = speakeasy.totp({ secret: req.body.secret, encoding: 'base32' });
                    const verifytoken = jwt.sign({ password : req.body.password  }, 'shhhhh', { expiresIn: '24h' }); 
                    const verified_token = jwt.verify(verifytoken, 'shhhhh');
     /*               console.log(secret);
                    console.log(token);
                    console.log(verifytoken);
                    console.log(verified_token);*/
                    var smtpTransport = nodemailer.createTransport({
                          host: 'smtp.gmail.com',
                          port: 465,
                          secure: true,
                          service : 'gmail',
                          auth: {
                            user: 'onetv.ng@gmail.com', 
                          pass: 'avyfuzccdkbcfhrc'
                          }
                        });
                        var mailOptions = {
                          to: user.email,
                          from: 'Localhost Staff, usmanarshad864@gmail.com',
                          subject: 'Device Verification',
                          text: 
                            'Hey '+ user.name +'!\n'+
                            'A sign in attempt requires further verification because we did not recognize your device. To complete the sign in, enter the verification code on the unrecognized device.\n'+
                            'Device : '+ os.hostname() + '\n'+
                            'Verification Code : ' + token + '\n'+
                            'If you did not attempt to sign in to your account, your password may be compromised.'
                        };
                        smtpTransport.sendMail(mailOptions, function(err) {
                          console.log('mail sent');
                          
                        });
                    res.render("device_verify",{ user : user , verified_token , sess : req.session , success_msg :'Device Verification Code send to your Email : '+ user.email+' Check Your email account to get the verification Code..'});
              }
/*        				if (os.hostname() != moon ) {
                    
                  }
                  if (os.hostname() == wow) {
                            passport.authenticate('local', {
                            successRedirect: "/index",
                            failureRedirect: "/login",
                            failureFlash: true,
                          })(req, res, next);
                  }*/
      /*});*/ } );
					    }
			   		}
	}
});
};

exports.verify_token = async (req, res,next) => {
  var tokenValidates = speakeasy.totp.verify({
                  secret: req.body.secret,
                  encoding: 'base32',
                  token: req.body.anyword,
                  window: 6
                });

              const show_body =  req.body ;
              console.log("--------------------------------------------------->",{show_body});
          if (tokenValidates == true) {
            
           User.findOne({username : req.body.email} , async function(err,user){

            console.log(user);
              if (err) throw err;
              if (user) { 
               const hoste = os.hostname(); 
                User.findOneAndUpdate({ username : req.body.email },{ $push: { "hostname": hoste }},{new: true, upsert: true },function(err,wow){ 
                  passport.authenticate('local', {
                            successRedirect: "/serv/",
                            failureRedirect: "/login/",
                            failureFlash: true,
                          })(req, res, next);
                });
                }else{
                      res.render("login",{ err :'Incorrect Information..!'});
                    }
         })
     }
          if (tokenValidates == false) {
            res.render("device_verify",{ err :'Verification Code in invalid Or Session has been expired.'});
          }
}

exports.AllJson = async (req, res) => {
  const Comments = await Comment.find();
  if (Comments) {
    console.log(Comments);
   return res.render('partials/ajax_comment_load',{ comment : Comments });
    /*res.status(200).send({ Comments });*/
  }else{
    console.log(Comments);
    console.log("Error");
    res.status(200).send({ Comments });
  }
};

exports.AllJson1 = async (req, res) => {
  const Comments = await Comment1.find();
  if (Comments) {
    console.log(Comments);
   return res.render('partials/ajax_comment_load1',{ comment : Comments });
    /*res.status(200).send({ Comments });*/
  }else{
    console.log(Comments);
    console.log("Error");
    res.status(200).send({ Comments });
  }
};

exports.AllJson2 = async (req, res) => {
  const Comments = await Comment2.find();
  if (Comments) {
    console.log(Comments);
   return res.render('partials/ajax_comment_load2',{ comment : Comments });
    /*res.status(200).send({ Comments });*/
  }else{
    console.log(Comments);
    console.log("Error");
    res.status(200).send({ Comments });
  }
};

exports.comment = (req,res) => {

    User.findOne(req.user,(err)=>{
    if (err) throw err;
    if (req.user) {
      const nammee = req.user.name;
        const { commentTxt } = req.body;
        const coo = new Comment();
        coo.name = nammee;
        coo.commentTxt = req.body.commentTxt;
        coo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { subscr : req.sub , user : req.user , sess : req.session , comment : coo});
            console.log(coo);
            console.log(req.sub);
          }
        });
    }
    else if (!req.user ) {
        const { commentTxt } = req.body;
        const coo = new Comment();
        coo.name = "Random User";
        coo.commentTxt = req.body.commentTxt;
        console.log(req.body.commentTxt);
        coo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { subscr : req.sub , user : req.user , sess : req.session , comment : coo});
            /*res.send(coo);*/
            console.log(coo);
          }
        });
  };
});
};
exports.comment1 = (req,res) => {

    User.findOne(req.user,(err,result)=>{
    if (err) throw err;
    /*console.log(result);*/
    if (req.user) {
      const nammee = req.user.name;
        const { commentTxt } = req.body;
        const cooo = new Comment1();
        cooo.name = nammee;
        cooo.commentTxt = req.body.commentTxt;
        cooo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { subscr : req.sub , user : req.user , sess : req.session , comment : cooo});
            console.log(cooo);
          }
        });
    }
    else if (!req.user ) {
        const { commentTxt } = req.body;
        const cooo = new Comment1();
        cooo.name = "Random User";
        cooo.commentTxt = req.body.commentTxt;
        cooo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { user : req.user , sess : req.session , comment : cooo , subscr : req.sub});
            console.log(cooo);
          }
        });
  };
});
};

exports.comment2 = (req,res) => {

    User.findOne(req.user,(err,result)=>{
    if (err) throw err;
    /*console.log(result);*/
    if (req.user) {
      const nammee = req.user.name;
        const { commentTxt } = req.body;
        const coo = new Comment2();
        coo.name = nammee;
        coo.commentTxt = req.body.commentTxt;
        coo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { user : req.user , sess : req.session , comment : coo , subscr : req.sub});
            console.log(coo);
          }
        });
    }
    else if (!req.user ) {
        const { commentTxt } = req.body;
        const coo = new Comment2();
        coo.name = "Random User";
        coo.commentTxt = req.body.commentTxt;
        coo.save(function(err){
          if (err) {
            console.log(err);
          }else{
            res.render("index", { user : req.user , sess : req.session , comment : coo , subscr : req.sub});
            console.log(coo);
          }
        });
  };
});
};

exports.Newletter = (req,res)=>{
  User.findOne(req.user,(err,resulttt)=>{
    if (err) throw err;
    if (req.user) {
      const name = req.user.name;
      const emaillee = req.user.email;
      const email = req.body.email;
       if (emaillee == email ) {
        User.findOne({ email: req.body.email }, function(err, user) {
            user.Subscribed = true ;
            user.save();
        Usser.findOne({ email: req.body.email }, function(err, resultt) {
              if (resultt) {
                err = "You Have Already Subscribed..";
               res.render("error",{'err' : err});
              }
               if (!resultt) {
                  const sub = new Usser();
                    sub.name = req.body.name;
                    sub.email = req.body.email;
                    sub.Subscribed = true ;
                    sub.save(function(err){
                      if (err) {
                        console.log(err);
                      }else{  
                        var smtpTransport = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                         port: 465,
                          secure: true,
                          service : 'gmail',
                          auth: {
                            user: 'onetv.ng@gmail.com', 
                            pass: 'avyfuzccdkbcfhrc'
                            }
                          });
                          var mailOptions = {
                            to: req.body.email,
                            from: 'onetv.ng@gmail.com',
                            subject: 'Subcription Email',
                            text: 'You Have SuccessFully Subscribed the Electro Store Site'
                          };
                          smtpTransport.sendMail(mailOptions, function(err) {
                            console.log('mail sent');
                            //console.log(subscr);
                           done(err, 'done');
                          });
                        }
                            });
                    
                        res.redirect("/index");
                      }
                  });
         });
      } if (emaillee != email ) {
              Usser.findOne({ email: req.body.email }, function(err, resultt) {
              if (resultt) {
                err = "You Have Already Subscribed..";
               res.render("error",{'err' : err});
              }
               if (!resultt) {
                  const sub = new Usser();
                    sub.name = req.body.name;
                    sub.email = req.body.email;
                    sub.Subscribed = true ;
                    sub.save(function(err){
                      if (err) {
                        console.log(err);
                      }else{  
                        var smtpTransport = nodemailer.createTransport({
                        host: 'smtp.gmail.com',
                         port: 465,
                          secure: true,
                          service : 'gmail',
                          auth: {
                            user: 'onetv.ng@gmail.com', 
                            pass: 'avyfuzccdkbcfhrc'
                            }
                          });
                          var mailOptions = {
                            to: req.body.email,
                            from: 'onetv.ng@gmail.com',
                            subject: 'Subcription Email',
                            text: 'You Have SuccessFully Subscribed the Electro Store Site'
                          };
                          smtpTransport.sendMail(mailOptions, function(err) {
                            console.log('mail sent');
                            //console.log(subscr);
                           done(err, 'done');
                          });
                        }
                            });
                    
                        res.redirect("/index");
                      }
                  });
      }
    }else{
      if (!req.user) {
        const name = req.body.name;
        const email = req.body.email;
      Usser.findOne({ email: req.body.email }, function(err, resultt) {
      if (resultt) {
        err = "You Have Already Subscribed..";
       res.render("error",{'err' : err});
      }
       if (!resultt) {
          const sub = new Usser();
            sub.name = req.body.name;
            sub.email = req.body.email;
            sub.Subscribed = true ;
            sub.save(function(err){
              if (err) {
                console.log(err);
              }else{  
                var smtpTransport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                 port: 465,
                  secure: true,
                  service : 'gmail',
                  auth: {
                    user: 'onetv.ng@gmail.com', 
                  pass: 'avyfuzccdkbcfhrc'
                  }
                });
                var mailOptions = {
                  to: req.body.email,
                  from: 'onetv.ng@gmail.com',
                  subject: 'Subcription Email',
                  text: 'You Have SuccessFully Subscribed the Electro Store Site'
                };
                smtpTransport.sendMail(mailOptions, function(err) {
                  console.log('mail sent');
                  //console.log(subscr);
                 done(err, 'done');
                });
              }
            });
    
        res.redirect("/index");
      }
    });
    }
}
});
};

exports.unsubscribe = (req,res)=>{
     const name = req.body.name;
      const email = req.body.email;
      Usser.findOne({ email: req.body.email }, function(err, resultt) {
      if (resultt) {
        err = "You Have Already Subscribed..";
       res.render("error",{'err' : err});
      }
});
    };
/*app.get('/index',checkAuthenticated,(req,res)=>{
  res.render('index',{user : req.user });
  console.log(req.user);
});*/

// Logout
//router.get('/logout', userController.logout);
exports.logout = (req,res)=>{
  /* req.logout();*/
   req.session.destroy((err) => {
    if(err) {
        return console.log(err);
      }
  res.redirect("/index");
});
};


exports.forget = (req, res, next) => {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
       //if (user.name ) user.username = user.name;
       
      // if (user.username )user.name=user.username;

        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forget');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 36000000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
     var smtpTransport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
			 port: 465,
		secure: true,
        service : 'gmail',
        auth: {
          user: 'onetv.ng@gmail.com', 
        pass: 'avyfuzccdkbcfhrc'
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'onetv.ng@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'Hi '+user.name+', You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/newpass/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        //req.flash('success_msg', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.render('pass-reset1');
  });
};


/*============================================================================================================*/


exports.newpass =  function(req, res) {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.render('forget');
    }
    res.render('newpass', {token: req.params.token});
  });
};
/*============================================================================================================*/
exports.newpasss =  async (req, res) => {
User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } } , async (err, user) => {
      if (err) throw err; // Throw error if cannot connect
      if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.render('newpass');
        }
      if (req.body.password == null || req.body.C_password == '') {
        req.flash('error', 'Password not Provided');
          return res.render('newpass');
      } else {
    const salt = await bcrypt.genSalt(10 );
    const hashpasswd = await bcrypt.hash(req.body.password, salt);
            user.password = hashpasswd; // Save user's new password to the user object
           
            user.active = true;
            user.temporary = false;

            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
        //user.resettoken = false; // Clear user's resettoken 
        // Save user's new data
       const saveUser = await user.save(function(err) {
          if (err) {
            res.json({ success: false, message: err });
          } else {
           var smtpTransport = nodemailer.createTransport({
              host: "mail.imediaport.com",
              port: 587,
              auth: {
                user: "renny@imediaport.com",
                pass: "@Pass2021"
              }
            });
      
      
            var mailOptions = {
              to: user.username,
              from: 'cloud@iMediaPORT.com',
              to: user.email,
              subject: 'Reset Password',
              text: 'Hello ' + user.name + ', This e-mail is to notify you that your password was recently reset at localhost.com',
              html: 'Hello<strong> ' + user.name + '</strong>,<br><br>This e-mail is to notify you that your password was recently reset at localhost.com'
            }
            console.log(email);
            // Function to send e-mail to the user
            smtpTransport.sendMail(email, function(err) {
              req.flash('success_msg', 'Success! Your password has been changed.');
              done(err);
            });
           /* res.json({ success: true, message: 'Password has been reset!' }); // Return success message*/
            res.redirect('/login');
          }
        })
      }
    });
}

exports.send_msg = (req,res)=>{
  const email = req.body.email;
  const admin = 'admin@imediaport.com';
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Surname: ${req.body.surnme}</li>
      <li>Userame: ${req.body.username}</li>
      <li>Email: ${email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  var smtpTransport = nodemailer.createTransport({
    host: "mail.imediaport.com",
    port: 587,
    auth: {
      user: "renny@imediaport.com",
      pass: "@Pass2021"
    }
  });
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" admin@imediaport.com', // sender address
      to: email , admin , // list of receivers
      subject: 'Node Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {user : req.user , msg:'Email has been sent'});
  });
  };

exports.activate = async function(req, res) {

  const token = req.params.temporarytoken;
  console.log(token);
  /*const { user : { id }} =*/ 
  jwt.verify(token, 'shhhhh', async (err, decoded) => {

//User.findOne({ temporary : req.params.temporarytoken } , async function (err, user) {

  console.log ("This is decod ==>",decoded);
  console.log ("This is err ==>",err);

 User.findById(decoded.id,async function (err, user) {
 // User.findOne(

//console.log(token);
///*const { user : { id }} =*/ jwt.verify(token, 'shhhhh', async (err, decoded) => {
      if (err) {
          console.log(err);
          err = "Activation Token is Invalid or Expired...";
            res.render('register', {'err' : err});
      }
        if (!token) {
          console.log(token);
          err = "Activation Token is Invalid or Expired...";
            res.render('register', {'err' : err});
      }
      if (!user) {
          console.log(token);
          err = "Activation Token is Invalid or Expired...";
            res.render('register', {'err' : err});
      }
      if (!decoded) {
        console.log(decoded);
          err = "Activation Token is Invalid or Expired...";
            res.render('register', {'err' : err});
            // Token may be valid but does not match any user in the database
      }if (decoded){
     //user =  global.USER[decoded.id];

        console.log("user=",user);
        console.log("decoded=",decoded);
        console.log("decoded.id=",decoded.id);
         user.active = true;
         user.temporary = false;
        /*await User.update({ active : true , temporary : false} , { where : { idd } });*/
          user.save(function(err) {
            if (err) {
              console.log(err); // If unable to save user, log error info to console/terminal
            } else {
                const smtpTransport = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                    service : 'gmail',
                    auth: {
                      user: 'onetv.ng@gmail.com', 
                    pass: 'avyfuzccdkbcfhrc'
                    }
                  });
              // If save succeeds, create e-mail object
              var email = {
                from: 'iMediaPORT, admin@imediaport.com',
                to: user.email,
                subject: 'Localhost Account Activated',
                text: 'Hello ' + user.name + ', Your account ' + user.username + 'has been successfully activated!',
                html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Your account has been successfully activated!'
              };

              // Send e-mail object to user
               smtpTransport.sendMail(email, function(err) {
                if (err) console.log(err); // If unable to send e-mail, log error info to console/terminal
              });
                res.render('login',{ success_msg :'Account activated!.. Please Login'});  
            }
          });
      }
        });
      });
};

exports.activate_channel = async function(req, res) {

  const token = req.params.temporarytoken;
  console.log(token);
  /*const { user : { id }} =*/ 
  jwt.verify(token, 'shhhhh', async (err, decoded) => {

//User.findOne({ temporary : req.params.temporarytoken } , async function (err, user) {

  console.log ("This is decod ==>",decoded);
  console.log ("This is err ==>",err);

if(typeof decoded=='undefined') return {error:"Expired"};

 Serv.findById(decoded.id,async function (err, serv) {
 // User.findOne(

//console.log(token);
///*const { user : { id }} =*/ jwt.verify(token, 'shhhhh', async (err, decoded) => {
      if (err) {
          console.log(err);
          err = "Activation Token is Invalid or Expired...";
            res.render('cloud/cdone', {'err' : err});
      }
        if (!token) {
          console.log(token);
          err = "Activation Token is Invalid or Expired...";
            res.render('cloud/cdone', {'err' : err});
      }
      if (!serv) {
          console.log(token);
          err = "Activation Token is Invalid or Expired...";
            res.render('cloud/cdone', {'err' : err});
      }
      if (!decoded) {
        console.log(decoded);
          err = "Activation Token is Invalid or Expired...";
            res.render('cloud/cdone', {'err' : err});
            // Token may be valid but does not match any user in the database
      }if (decoded){
     //user =  global.USER[decoded.id];

        console.log("user=",user);
        console.log("decoded=",decoded);
        console.log("decoded.id=",decoded.id);
         serv.active = true;
         serv.temporary = false;
        /*await User.update({ active : true , temporary : false} , { where : { idd } });*/
         serv.save(function(err) {
            if (err) {
              console.log(err); // If unable to save user, log error info to console/terminal
            } else {
                              var smtpTransport = nodemailer.createTransport({
                    host: "mail.imediaport.com",
                    port: 587,
                    auth: {
                      user: "renny@imediaport.com",
                      pass: "@Pass2021"
                    }
                  });
            
            
                  var mailOptions = {
                    to: serv.email,
                    from: 'cloud@iMediaPORT.com',
        
                subject: 'Channel Account Activated',
                text: 'Hello ' + serv.owner + ', Your Channel(s): ' + serv.channel_id+ 'has been successfully activated!',
                html: 'Hello<strong> ' + serv.owner + '</strong>,<br><br>Your account has been successfully activated!'
              };

              // Send e-mail object to user
               smtpTransport.sendMail(mailOptions, function(err) {
                if (err) console.log(err); // If unable to send e-mail, log error info to console/terminal
              });



    const getAdmin =  User.findOne({channel_id: req.body.channel_id},(err,getAdmin )=>{

      if (getAdmin ){
        // err = "Channel ID  Already Exist";
       // return res.render('cloud/cregister',{user:req.user,'err' : err,   ...feedup , returned:feedup});
     console.log("================== Loaded is =====================",getAdmin);

     /***
      * //updateOne
       //  User.findOneAndUpdate({ email : req.body.email },{ $push: { "adminchannel":serv.channel_id }},{new: true, upsert: true },function(err,wow){ 
          User.updateOne({ email : req.body.email },{ $push: { "adminchannel":serv.channel_id }},{new: true, upsert: true },function(err,wow){ 
          
       passport.authenticate('local', {
                     successRedirect: "/play_man",
                     failureRedirect: "/login/",
                     failureFlash: true,
                   })(req, res, next);
         });
*/

        }

      
    });
              if (getAdmin ){
             // err = "Channel ID  Already Exist";
            // return res.render('cloud/cregister',{user:req.user,'err' : err,   ...feedup , returned:feedup});
          console.log("================== Loaded is =====================",getAdmin);

          /***
           * //updateOne
            //  User.findOneAndUpdate({ email : req.body.email },{ $push: { "adminchannel":serv.channel_id }},{new: true, upsert: true },function(err,wow){ 
               User.updateOne({ email : req.body.email },{ $push: { "adminchannel":serv.channel_id }},{new: true, upsert: true },function(err,wow){ 
               
            passport.authenticate('local', {
                          successRedirect: "/play_man",
                          failureRedirect: "/login/",
                          failureFlash: true,
                        })(req, res, next);
              });
 */

  }  
         res.render('cloud/cdone',{success_msg:'Account activated!.. Please Login'});

               // res.redirect('./cdone?success_msg=Account activated!.. Please Login');  

            }
          });
      }
        });
      });
};


const station = {
...iPort,
  name: "",
    channel_id: "",
    info: "",
    station_id_logo: "",
    thumb_url: "",
    timeZone: + 1,
    holding: "",
    buffer :15,
    id: 0,
    stationStartTime:21600, // in seconds
    stationDurationTime: 21600, // in seconds
    stationStart: '06:00:00',
    stationDuration: '06:00:00',
    currentSession: 0, // count starting for 0 for first
    currentSessionTime: 0, // in seconds
    oneDay: 86400, // in seconds
    assetList: [],
    baseList: [],
    sessionPaDay: 0,
    playIndex: 0,
    AssetPlayTime: 0,
    basePlayTime: 0,
    xplay: null,
    xlist: "",
    isPlay: false,

   YOUR_API_KEY:`AIzaSyCW2pN3FIDIcCNiLjoHFLIzjbp7mRFLAMI`,
   maxResults : 10,
   playlist : 'PLBrVE3sZeUAeMNYDN-Hr9q4Y5H-ctVbt9',
    
 maxrs:`&maxResults=${this.maxResults}`,
   youtubeURL :'https://www.googleapis.com/youtube/v3/',
  playlistsearch : 'playlistItems?part=snippet,status,contentDetails'+this.maxrs,
   videoidsearch :`videos?part=snippet,contentDetails,status,statistics`,
   ols :`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=`,
    
  

    client_id:'AIzaSyC_Np_qFsUC1YvnxJAr5-YNFVMzLPREp-s',


 channelinfo: async function (channel_id, callback){

  //console.log("The channel_id------------ channel_id ----------->",channel_id);

    //Channellist.findAll({ where: {cid: the_channel_id} })

    //Channellist.findAll()
   Serv.findOne( {channel_id: channel_id})
    .then(data => {
    //console.log("The data------------ see data----------->",data);

mxdata =  station.setChannelSession(data)
.then((maxData)=>{

  if(callback)callback(maxData);
  //console.log("MX=",maxData);
  return maxData

});






});



   
  },
  setChannel: async  function (nCH){

return await station.setChannelSession(nCH) ;


  },
  
  
  befor:()=>{

    /***
     * The data-> {
id: 207,
channel_id: 'onetv',
cNumber: 78,
cid: 'onetv',
cFname: '1tv one channel',
cInfo: 'onetv lifestyle channel',
streamUrl: '#onetv',
streamUrlType: 'httpS',
streamUrlMore: '',
logoUrl: 'https://onetv.ng/images/id/1tv-home.png',
thumbUrl: '',
cmemo: '',
country: 'Nigeria|Rivers',
ctype: 'Lifestyle',
ckeyword: '',
status: '',
cbrand: 'same',
timeZone: '+01:00',
StationStartTime: '06:00:00',
StationDurationTime: '06:00:00',
createdAt: 2023-05-26T20:43:32.000Z,
updatedAt: 2023-05-26T20:43:32.000Z
}
     */


    station_name = this.name = nCH.channel_name|| this.name;

    channel_id = this.channel_id = nCH.channel_id || this.channel_id;

// this.info = nCH.info|| this.info;
    info = this.info = nCH.channel_info || this.info;
    channel_id = this.channel_id = nCH.channel_id || this.channel_id;
    station_id_logo = this.station_id_logo = nCH.logo || this.station_id_logo;
    thumb_url = this.thumb_url = nCH.thumbnail || this.thumb_url;
    timeZone = this.timeZone = parseInt(nCH.timezone )|| this.timeZone;
   
    if(trace) console.log("time Zone",timeZone);

    this.stationStart = stationStart = nCH.station_start_time;
    this.stationDuration= stationDuration = nCH.station_duration_time;
    //this.stationStart = stationStart = playtime.secondsToClock(nCH.StationStartTime);
    //this.stationDuration= stationDuration = playtime.secondsToClock(nCH.StationDurationTime);
    const stationDurationTime = this.stationDurationTime = playtime.secondsToClock(nCH.station_duration_time);
    const stationStartTime    = this.stationStartTime    = playtime.secondsToClock(nCH.station_start_time);
    
   this.sessionPaDay = (this.oneDay /nCH.station_duration_time);

    zoneSeconds = this.timeZone * 3600;
    //this.stationStartTime = stationStartTime = stationStartTime;//+ zoneSeconds;
    if(trace)console.log("station duration", stationDurationTime);

   
    const d = new Date();

    if(trace) console.log("zone compensation",playtime.secondsToClock(zoneSeconds));
    const seconds = d.getTime() + zoneSeconds;
    if(trace) console.log("T now",playtime.secondsToClock(seconds));

    holdtime = new Date(seconds).toISOString().slice(11, 19);

    c = holdtime.split(":");
    this.currentTime =  currentTime = (+ c[0]) * 60 * 60 + (+ c[1]) * 60 + (+ c[2]);
    this.serverZoneTime= serverZoneTime = currentTime + zoneSeconds;
    this.serverZTime = serverZTime = serverZoneTime;
    if(trace)console.log("currentTime",playtime.secondsToClock(currentTime));
    if(trace) console.log("ServerZoneTime",playtime.secondsToClock(serverZTime));
    sessionPaDay = this.getSessionPaDay;
    serverTime = currentTime;



    if (trace) {
        console.log("stationDurationTime=" + stationDurationTime);
    }
    if (trace) {
        console.log(" stationStartTime=" + stationStartTime);
    }
    if (trace) {
        console.log("currentTime=" + currentTime);
    }
    if (trace) {
        console.log("session pa day=" + sessionPaDay);
    }

// getStationStart;
compansate = stationStart;
if (serverZoneTime < stationStart) {

compansate = this.oneDay + stationStart;
if (trace) {
    console.log("next comp=" + compansate);
}

}

sessionstart = (serverZoneTime + compansate) - stationDuration;

sessionCount = 0;


while (sessionstart > stationDuration) {
sessionstart = sessionstart - stationDuration;


sessionCount = sessionCount + 1;
}

currentSessionTime = sessionstart;

    if (trace) {
        console.log("currentSessionTime=" + currentSessionTime);
    }
    if (trace) {
        console.log("sessionCount=" + sessionCount);
    };

// console.log( " Locale time" , playtime.calcTime('Lagos', '+1'));
this.currentSessionTime=  this.sessionTime  = currentSessionTime;

// station_name channel_id, info , station_id_logo thumb_url  timeZone holding,
    const sessionTime = currentSessionTime;
    if(trace)console.log("currentSessionTime",playtime.secondsToClock( currentSessionTime));
    return {
        sessionTime,
        sessionCount,
        stationDurationTime,
        stationStartTime,
        stationStart,
        stationDuration,
        station_name,
        channel_id,
        info,
        station_id_logo,
        thumb_url,
        timeZone,
        serverZTime ,
        serverTime
    };

},
setChannelSession: async  function (nCH, callbacl) {

  //console.log(">-----------cCH find name ------------->>",nCH);
  station_name = this.name = nCH.channel_name|| this.name;

  channel_id = this.channel_id = nCH.channel_id || this.channel_id;

// this.info = nCH.info|| this.info;
  info = this.info = nCH.channel_info || this.info;
  channel_id = this.channel_id = nCH.channel_id || this.channel_id;
  station_id_logo = this.station_id_logo = nCH.logo || this.station_id_logo;
  thumb_url = this.thumb_url = nCH.thumbnail || this.thumb_url;
  timeZone = this.timeZone = parseInt(nCH.timezone )|| this.timeZone;
 
  if(trace) console.log("time Zone",timeZone);

  this.stationStart = stationStart = nCH.station_start_time;
  this.stationDuration= stationDuration = nCH.station_duration_time;
  //this.stationStart = stationStart = playtime.secondsToClock(nCH.StationStartTime);
  //this.stationDuration= stationDuration = playtime.secondsToClock(nCH.StationDurationTime);
  const stationDurationTime = this.stationDurationTime = playtime.secondsToClock(nCH.station_duration_time);
  const stationStartTime    = this.stationStartTime    = playtime.secondsToClock(nCH.station_start_time);
  
 this.sessionPaDay = (this.oneDay /nCH.station_duration_time);

  zoneSeconds = this.timeZone * 3600;
  //this.stationStartTime = stationStartTime = stationStartTime;//+ zoneSeconds;
  if(trace)console.log("station duration", stationDurationTime);

 
  const d = new Date();

  if(trace) console.log("zone compensation",playtime.secondsToClock(zoneSeconds));
  const seconds = d.getTime() + zoneSeconds;
  if(trace) console.log("T now",playtime.secondsToClock(seconds));

  holdtime = new Date(seconds).toISOString().slice(11, 19);

  c = holdtime.split(":");
  this.currentTime =  currentTime = (+ c[0]) * 60 * 60 + (+ c[1]) * 60 + (+ c[2]);
  this.serverZoneTime= serverZoneTime = currentTime + zoneSeconds;
  this.serverZTime = serverZTime = serverZoneTime;
  if(trace)console.log("currentTime",playtime.secondsToClock(currentTime));
  if(trace) console.log("ServerZoneTime",playtime.secondsToClock(serverZTime));
  sessionPaDay = this.getSessionPaDay;
  serverTime = currentTime;



  if (trace) {
      console.log("stationDurationTime=" + stationDurationTime);
  }
  if (trace) {
      console.log(" stationStartTime=" + stationStartTime);
  }
  if (trace) {
      console.log("currentTime=" + currentTime);
  }
  if (trace) {
      console.log("session pa day=" + sessionPaDay);
  }

// getStationStart;
compansate = stationStart;
if (serverZoneTime < stationStart) {

compansate = this.oneDay + stationStart;
if (trace) {
  console.log("next comp=" + compansate);
}

}

sessionstart = (serverZoneTime + compansate) - stationDuration;

sessionCount = 0;


while (sessionstart > stationDuration) {
sessionstart = sessionstart - stationDuration;


sessionCount = sessionCount + 1;
}

currentSessionTime = sessionstart;

  if (trace) {
      console.log("currentSessionTime=" + currentSessionTime);
  }
  if (trace) {
      console.log("sessionCount=" + sessionCount);
  };

// console.log( " Locale time" , playtime.calcTime('Lagos', '+1'));
this.currentSessionTime=  this.sessionTime  = currentSessionTime;

// station_name channel_id, info , station_id_logo thumb_url  timeZone holding,
  const sessionTime = currentSessionTime;
  if(trace)console.log("currentSessionTime",playtime.secondsToClock( currentSessionTime));


  if(callbacl)callback ({
    sessionTime,
    sessionCount,
    stationDurationTime : stationDuration,
    stationStartTime : stationStart,
    stationDurationClock : stationDurationTime,
    stationStartClock : stationStartTime,
    channel_name:station_name,
    channel_id,
    info,
    station_id_logo,
    thumb_url,
    timeZone,
    serverZTime ,
    serverTime
});



  return {
      sessionTime,
      sessionCount,
      stationDurationTime : stationDuration,
      stationStartTime : stationStart,
      stationDurationClock : stationDurationTime,
      stationStartClock : stationStartTime,
      channel_name:station_name,
      channel_id,
      info,
      station_id_logo,
      thumb_url,
      timeZone,
      serverZTime ,
      serverTime
  };

},

ifIs:(station)=>{

//station


return {status:true, info:" yes ooh without check"};
//return true;

  },

  get getSessionPaDay() {

    day1 = this.oneDay;

    //dtx 
    dayc= this.stationDuration;

    //dayc = station.setTimeToSeconds(dtx);

    this.sessionPaDay = (day1 / dayc);
    if (trace) {
        console.log("sessions a day =" + this.sessionPaDay + " a day=" + day1 + "  lent=" + dayc);
    }
    return this.sessionPaDay;

},
get getStationStart() {
// stationStart:
// sstime
    //text = this.stationStart;
   // a = text.split(":");
    //stationStartTime = (+ a[0]) * 60 * 60 + (+ a[1]) * 60 + (+ a[2]);

    this.stationStartTime = this.stationStart;
    //stationStartTime;
    //return stationStartTime;

    return this.stationStart;

},

setTimeToSeconds: function (time) {

  a = time.split(":");
  return stationDurationTime = (+ a[0]) * 60 * 60 + (+ a[1]) * 60 + (+ a[2]);

},
setClockToSeconds: function (time) {

  a = time.split(":");
  return stationDurationTime = (+ a[0]) * 60 * 60 + (+ a[1]) * 60 + (+ a[2]);

},
get getCurrentTime() {
// stationStart:
// sstime
  text = this.stationStart;
  ray = text.split(":");
  sstime = (+ a[0]) * 60 * 60 + (+ a[1]) * 60 + (+ a[2]);


  return sstime;

},
get showClock() {
  zone = this.timeZone * 3600 * 1000;
  const d = new Date();
  const seconds = d.getTime() + zone;
  return new Date(seconds).toISOString().slice(11, 19);
},

playTimeClock: function (xplay) {
  return playtime.formatTime(xplay.getCurrentTime());
},

playTime: function (xplay) {
  return xplay.getCurrentTime();
},

// =================================== player elpesed  count down  opposite of playtime ================== codes

playLeftClock: function (xplay) {
  ttime = xplay.getDuration() - xplay.getCurrentTime();

  return playtime.formatTime(ttime);
//
// new Date(ttime).toISOString().slice(11, 19);
},

playLapsed: function (xplay) {
  ttime = "";
  if (playtime.isPlay) {
      ttime = xplay.getDuration() - xplay.getCurrentTime();
  }
  return Math.round(ttime);
//
// new Date(ttime).toISOString().slice(11, 19);

},

durationClock: function (xplay) {
  return playtime.formatTime(xplay.getDuration());
},

duration: function (xplay) {
  return xplay.getDuration();
},

formatTime: function (time) {
  time = Math.round(time);

  var minutes = Math.floor(time / 60),
      seconds = time - minutes * 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;

  return minutes + ":" + seconds;
},

settime: function () { // return this.firstName + " " + this.lastName;
},

fullName: function () { // sreturn this.firstName + " " + this.lastName;
},

secondsToClock: function (secs) {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes, seconds].map((v) => (v < 10 ? "0" + v : v)).filter((v, i) => v !== "00" || i > 0).join(":");
},


secondsToClockM: function (secs) {
  var sec_num = parseInt(secs, 10);
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor(sec_num / 60) % 60;
  var seconds = sec_num % 60;

  return [hours, minutes].map((v) => (v < 10 ? "0" + v : v)).filter((v, i) => v !== "00" || i > 0).join(":");
},
startClock: function () {
  return setInterval(playtime.inClock, 1000);
},

inClock: function () {
  playtime.iclockWork();
// =================================== internal clock ================== codes

// $("#cuecd").html(playtime.secondsToClock(playtime.playLapsed(player)));


// ===================================================================Automatiion engine ===========================================================


// clockWork();   //================ for extarnal  appps

},

get getStationDuration() {
  // stationStart:
  // sstime
      text = this.stationDuration;
      a = text.split(":");
      stationDurationTime = (+ a[0]) * 60 * 60 + (+ a[1]) * 60 + (+ a[2]);
  
      this.stationDurationTime = stationDurationTime;
      return stationDurationTime;
  
  },
  
  work:async (user)=>{
  
  
  
  }
  ,
  
  
  current_channel_id :async (station)=>{
  const foundStation = await Serv.findOne({channel_id: station})
  
  
  }
  ,
  
  
  get_channel_id :async (station, callback)=>{
  
  const foundStation = await Serv.findOne({'channel_id': station}).then((done)=>{
    //const foundStation = await Serv.findOne().then((done)=>{
   
    //console.log(">>>>>>>done 1487>>>>>>>>",done);
  
  if(callback){ callback(done)} ;
  
  
  
  }).catch(error=>{
  
  console.log(error)
  
  })
  //console.log(">>>>>>>foundStation 1504>>>>>>>>",foundStation);
  return foundStation;
  
  }
  ,
  addAdmin: async (channel_id,username, role)=>{
  
  }
  ,
  getAdmin:async (usaa,callback)=>{


    console.log(">>>-------------->>>>>>>>>>>>>>>>>>>>>---->", usaa);
    username = usaa.username;
    isAdmin = (user.role ==='admin')?  true: false;
  like =  `{$regex : /${username}/i}`;
  
  
  //adminFor = await Serv.find({'admin_roles': like});
  
  //console.log(" we are starting... with..==>",username);
  
  
  //db.student.find({"student_detail.name": "Andy"}) 
  //let adminFor = await Serv.find({admin_roles:{$elemMatch:{username:username}}}).then((ans)=>{
squery = (isAdmin)? {}:{'admin_roles.username' : username };

    let adminFor = await Serv.find(squery).then((ans)=>{
  user_admin=[];
  

      ans.forEach((station)=>{
   madmin={};

   console.log("XXXXXXXXXXXX XX XX XX XX XX XXX",station.channel_id);
if(isAdmin){


  madmin.channel_id = station.channel_id;
  madmin.channel_name = station.channel_name;
  madmin.logo = station.logo;
  user_admin.push(madmin);



} else{


     let admin_roles = station.admin_roles;

     admin_roles.forEach(admin=>{

//  if(admin.username == username || isAdmin ){

  if(admin.username == username  ){
    admin.channel_id = station.channel_id;
    admin.channel_name = station.channel_name;
    admin.logo = station.logo;
  user_admin.push(admin);
  }


     })
  
  }


  
      })




      //console.log(" WOOW!  The search of..==>",username);
  
     // console.log(" Got.===========>",ans);
  
  if(callback ) callback(user_admin);
  return user_admin;sx
  });
  
  //console.log(">>>>>>> rtesult adminfor 1522>>>>>>>>",adminFor);
  
  
  }
  
  
  
  }
  
  
  exports.imediaYTSearch = (req, res) =>{
    
  
    // Validate request
    if (!req.body) {
      res.status(200).send({
        message: "Content can not be empty!"
      });
          return;
    } 
  //  res.status(200);
  console.log("====================== Create all records =============");
  
  var st =0;
  var   longmessage="";
   
  const bulkData= req.body
  
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
     
    
  
  
  
  /***
   * 
   * const work = station.work(user);
  const current_channel_id = station.work(user);
  
  station.addAdmin(channel_id,username, role);
  
  [{username:'admin1@onetv.ng', role:'admin'},{username:'jessy@onetv.ng', role:'edit'},{username:'admin1@onetv.ng', role:'supervise'}]
  
  (callback ) callback(user_admin);
  return user_admin;sx
  });
  
  //console.log(">>>>>>> rtesult adminfor 1522>>>>>>>>",adminFor);
  
  
  }
  
  
  
  }
   */
  
  exports.imediaYTSearch = (req, res) =>{
    
  
    // Validate request
    if (!req.body) {
      res.status(200).send({
        message: "Content can not be empty!"
      });
          return;
    } 
  //  res.status(200);
  console.log("====================== Create all records =============");
  
  var st =0;
  var   longmessage="";
   
  const bulkData= req.body
  
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
     
    
  
  
  
  /***
   * 
   * const work = station.work(user);
  const current_channel_id = station.work(user);
  
  station.addAdmin(channel_id,username, role);
  
  [{username:'admin1@onetv.ng', role:'admin'},{username:'jessy@onetv.ng', role:'edit'},{username:'admin1@onetv.ng', role:'supervise'}]
  
   st current_channel_id = station.work(user);
  
  station.addAdmin(channel_id,username, role);
  
  [{username:'admin1@onetv.ng', role:'admin'},{username:'jessy@onetv.ng', role:'edit'},{username:'admin1@onetv.ng', role:'supervise'}]
  
  */