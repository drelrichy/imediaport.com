module.exports = app => {
    const playouts = require("../controllers/playout.controller.js");
    const Users = require("../controllers/user.controller.js");
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
    //logger
    router.get("/cdone", Servs.api.cdone);

    router.get("/logger", Servs.logger);
    router.post("/comment",userController.comment );
    router.post("/comment1",userController.comment1 );
    router.post("/comment2",userController.comment2 );


    router.get("/channel/:channel_id", Servs.channel);


    router.post("/create_channel", Servs.api.create);


    router.get("/channel", Servs.channel);

    router.get("/", Users.login);

    router.get("/login", Users.login);

  
   
    router.post("/login", Users.loginPage);

    router.get("/cregister", Servs.cregister);
    
 
    router.get('/register',userController.register);
    
    // Register
    router.post('/register', Users.registeruser);
   
    // Logout
    router.get('/logout',userRole, userController.logout);
    
    router.get('/forget', (req, res) =>{
      res.render('forget');
      });
      
    
    router.post('/forget',userController.forget);
    
    router.get('/newpass/:token',userController.newpass);
    router.post('/newpasss/:token',userController.newpasss);
    
    router.get('/send_msg',userRole,(req,res)=>{ 
      res.render('contact',{user : req.user , msg:''});
    });
    router.post('/send_msg',userController.send_msg);
    
    //router.get('/activate/:temporarytoken',userController.activate);

    router.get('/activate/:temporarytoken',userController.activate);


    router.get('/activate_channel/:temporarytoken',Servs.activate_channel);
    
    router.post('/device_verify_token',Servs.verify_token)
    
    module.exports = router;



   // router.get("/cid", playboxs.findByCid);
  
  
   // router.get("/cid/:cid", playboxs.findByCid);
  
    // Create a new Program
    
  
  
  
     //add  new Program Bulk program using Video ID to check if exist already for same channel same day  
    // router.post("/bulkifnew", programs.createbulkifnew);
  
  
   //add  new Program Bulk program
    //router.post("/bulk", programs.createbulk);
  
    // Create a new Program
   // router.post("/", programs.create);


//login attempts
    


   router.post("/register", Users.registeruser);

    // Retrieve all Programs
    router.get("/register", Users.register);

    //router.get("/index", (req,res)=>{ res.render('/serv'); });

    //router.get("/password", Users.password);

    router.get("/activate:temporarytoken", Users.activate);

  //router.get("/contact", Users.contact);


    //router.get("/", playboxs.findAll);
  
    router.get("/play:channel_id", playouts.playByChannel_id);
  
      
    // Delete a Program with id
    router.get("/youtube:search", playouts.youtubeSearch);
  
  
  
    app.use('/', router);

  };
  