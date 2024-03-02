module.exports = app => {
  const channels = require("../controllers/channel.controller.js");
  const Servs = require("../controllers/serv.controller.js");
  
  var router = require("express").Router();


  const express = require('express');
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
  
  /*// Handle All Invalid Routes
  router.get(‘*’, function(req, res){
   res.render("error");
  });*/
  
  
  router.post("/comment",userController.comment );
  router.post("/comment1",userController.comment1 );
  router.post("/comment2",userController.comment2 );


  router.get("/:channel_id", Servs.channel);


  router.get("/", Servs.channel);

 

  // Create a new Channel
  router.post("/", channels.create);



  // Retrieve all published Channels
  router.get("/published", channels.findAllPublished);


  app.use('/channels', router);
};
