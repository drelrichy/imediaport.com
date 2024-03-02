module.exports = app => {
    const schedules = require("../controllers/schedule.controller.js");
  
    var router = require("express").Router();
     // Retrieve all Schedules  by Chanel ID



     router.get("/cid", schedules.findByCid);


     router.get("/cid/:cid", schedules.findByCid);
  
    // Create a new Schedule
    router.post("/", schedules.create);
  
    // Retrieve all Schedules
    router.get("/", schedules.findAll);
     


  
    // Retrieve all published Schedules
    router.get("/published", schedules.findAllPublished);
  
    // Retrieve a single Schedule with id
    router.get("/:id", schedules.findOne);
  
    // Update a Schedule with id
    router.put("/:id", schedules.update);
  
    // Delete a Schedule with id
    router.delete("/:id", schedules.delete);
  
    // Delete all Schedules
    router.delete("/", schedules.deleteAll);

    app.use('/api/schedules', router);
  };
  