module.exports = app => {

    const playboxs = require("../controllers/playbox.controller.js");
    const Playouts = require("../controllers/playout.controller.js");
    const Servs = require("../controllers/serv.controller.js");
    const {api }   = require("../controllers/serv.controller.js");
    var router = require("express").Router();
  
  
  
    const express = require('express');
    //const router = express.Router();
    const userController = require("../controllers/serv.controller.js");
    const cookieparser = require('cookie-parser');
    const bodyparser   = require('body-parser');
    const session = require("express-session");
    const flash = require("connect-flash");
    const passport = require("passport");
    const csurf = require('csurf');
    
    // Load User model
    const User = require("../models/user");
    require("../../config/passport")(passport);
    var path = require('path');
//var utils = require('../lib/utils.js');
//var config = require('../../config.json');

var MongoClient = require('mongodb').MongoClient;
    //const { userRole , checkAuthenticated , forwardAuthenticated } = require('../../config/auth');
    const { userRole,checkAuthenticated , forwardAuthenticated } = require('../../config/auth');
    /*const csrfMiddleware = csurf({
      cookie: true
    });
    router.use(csrfMiddleware);*/
    router.use(express.json());
    router.use(express.urlencoded({extended : false})); //===============
    router.use(cookieparser('secret')); // read cookies (needed for auth)
    router.use(bodyparser.urlencoded({extended: false})); // get information from html forms
    router.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', cookie: { maxAge: 3600000 }}));
    // Passport middleware
    router.use(passport.initialize());
    router.use(passport.session());
    // Connect flash
    router.use(flash());
    // Global variables

    router.use(function(req, res, next) {
      res.locals.success_msg = req.flash("success_msg");
      res.locals.error_msg = req.flash("error_msg");
      res.locals.error = req.flash("error");


      next();
    });


    router.get('/cregister/',userRole, Servs.cregister);
    router.get('/cupdate/',userRole, Servs.cupdate);

    router.get("/xxcregister",userRole, api.cregister);
    
      router.get('/',userRole, Servs.cloud);

      router.get('/:channel_id',userRole, Servs.cloud);


      router.get('/playcon/',userRole, Servs.pcloud);

      router.get('/playcon/:channel_id/',userRole, Servs.cloudWithId);
      
  
     
  
      //router.get("/channel/:channel_id",userRole, Servs.channel);


      //router.get("/channel",userRole, Servs.channel);
      // Retrieve all  Program  Programs
      


     router.get('/old',userRole,(req, res) => {
      console.log("96 Entering  /  Serv Router ...... channel server");

      console.log(req.user +" and",req.session);

      if(req.user){


        console.log("103 Entering   Serv Router  channel server =================");

      res.render('cloud/index', { user : req.user , sess : req.session , subscr : req.sub  });
        } else {

          console.log("108 Entering Serv Rout  c+++++++++++++++++++hannel server");
          res.render('login', { user : req.user , sess : req.session , subscr : req.sub  });
       

        }
    
          });



     //later
     //router.get("/", Servs.index);

     //Server home Page


     
  
    // Delete a Program with id
    router.get("/ytsearch/:search", Playouts.youtubeSearch);
  
   
  
    app.use('/serv', router);
  };
  


