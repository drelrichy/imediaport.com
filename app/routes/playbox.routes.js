module.exports = app => {
    const playboxs = require("../controllers/playbox.controller.js");
    const playouts = require("../controllers/playout.controller.js");
  
    var router = require("express").Router();
  
  
  
      // Retrieve all  Program  Programs
     router.get("/:channel_id", playouts.playByChannel_id);
  
    // Retrieve all published Programs
    router.get("/published", playboxs.soon);
  
    app.use('/play', router);
  };
  