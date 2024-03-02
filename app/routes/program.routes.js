module.exports = app => {
  const programs = require("../controllers/program.controller.js");

  var router = require("express").Router();


  router.get("/cid", programs.findByCid);


  router.get("/cid/:cid", programs.findByCid);

  // Create a new Program
  



   //add  new Program Bulk program using Video ID to check if exist already for same channel same day  
   router.post("/bulkifnew", programs.createbulkifnew);


 //add  new Program Bulk program
  router.post("/bulk", programs.createbulk);

  // Create a new Program
  router.post("/", programs.create);

  // Retrieve all Programs
  router.get("/", programs.findAll);


    // Retrieve all  Program  Programs
    router.get("/channel/:channel_id", programs.findByChannel_id);

     // Retrieve all  Program  Programs by channel ID
     router.get("/:channel_id", programs.findByChannel_id);

  // Retrieve all published Programs
  router.get("/published", programs.findAllPublished);

  // Retrieve a single Program with id
  router.get("/:id", programs.findOne);

  // Update a Program with id
  router.put("/:id", programs.update);

  // Delete a Program with id
  router.delete("/:id", programs.delete);

  // Delete all Programs
  router.delete("/", programs.deleteAll);

  app.use('/api/programs', router);
};
