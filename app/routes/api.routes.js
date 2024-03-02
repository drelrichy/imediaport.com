module.exports = app => {
  const playouts = require("../controllers/playout.controller.js");
  const Users = require("../controllers/user.controller.js");
  //const Servs = require("../controllers/serv.controller.js");

    const servs     = require("../controllers/serv.controller.js");
    const {api }   = require("../controllers/serv.controller.js");
  //const api = servs.api;
  const express = require('express');

  //console.log(api);
    
    var router = require("express").Router();
  
  
  
    //const router = express.Router();
    const userController = require("../controllers/user.controller.js");
    const cookieparser = require('cookie-parser');
    const bodyparser   = require('body-parser');
    const session = require("express-session");
    const flash = require("connect-flash");
    const passport = require("passport");
    const csurf = require('csurf');
    
    // Load User model
    const User = require("../models/user");
    require("../../config/passport")(passport);
    const { userRole , checkAuthenticated , forwardAuthenticated } = require('../../config/auth');
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
    // Create a new Station
   router.post("/create", api.create);


   router.post("/update", api.update);
router.post("/iserv/", (req,res)=>{
  res.status(200).send("Welcome !!!!");

  console.log("iiiiiiii===>",req.body);


});




router.get("/iserv/", (req,res)=>{


  res.status(200).send("Welcome !!!!");
  console.log("iiiiiiii===>",req.body);


});


  /// router.get("/serv", api.get);
  //router.post("/serv", servs.new);

router.get("/serv/bulk/", servs.bulk);
router.post("/serv/bulk/", servs.bulk);
router.put("/serv/bulk/", servs.bulk);
router.put("/serv/schedule/", servs.putschedules);
router.get("/serv/schedule/", servs.getschedules);


router.put("/serv/playlist/", servs.putplaylist);
router.get("/serv/playlist/", servs.getplaylist);



router.get("/serve/", servs.apiByChannel_id);
router.get("/serve/:channel_id", servs.apiByChannel_id);


router.get("/serv/bulk/:bulkdata", servs.bulkquery);





router.get("/serve/:channel_id", servs.apiByChannel_id);



router.get("/play/:channel_id", servs.apiPlayByChannel_id);
  /**** 


    // Retrieve all Programs
    router.get("/serv", api.getall);

    //router.get("/", playboxs.findAll);
    router.get("/serv:channel_id", api.getone);
  
    // Update a Program with id
    router.put("/serv:channel_id", api.updateone);
 
    // Delete obe Programs
    router.delete("/serv:channel_id", api.deleteone);

     // Delete all Programs
     router.delete("/serv", api.deleteall);
  


  */


      // Retrieve all  Program  Programs
     router.get("/console/:channel_id", servs.apiByChannel_id);
     router.put("/console/:channel_id", servs.apiByChannel_id);

  
    // Delete a Program with id
    router.get("/youtube/:search", playouts.youtubeSearch);



    router.get("/channel/:channel_id", servs.apiByChannel_id);
  
    //router.get("/youtube", playouts.youtubeSearch);
    // Delete all Programs
    router.delete("/", playouts.soon);
  
    app.use('/api', router);
  };
  