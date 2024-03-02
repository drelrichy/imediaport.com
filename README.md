# iMediaPORT PlayBOX

    
member router

cloud.controller

/ytsearch/:search

    router.get("/channel/:channel_id", playouts.apiByChannel_id);
 
    router.get("/ytsearch/:search", playouts.youtubeSearch);

    from mount point   /serv 


 home Router -- open
    user.controller

    router.get("/", playouts.login);
  

    router.get("/play/:channel_id", playouts.playByChannel_id);
  
    router.get("/youtube:search", playouts.youtubeSearch);

    /register
    /login
    /


   root mount point  / 


playbox Routers

    // Retrieve all  Program  Programs
     router.get("/:channel_id", playouts.playByChannel_id);
  
    // Retrieve all published Programs
    router.get("/published", playboxs.soon);
  
    app.use('/play', router);


API Router



api/channels Router =====================

  // Create a new Channel
  router.post("/", channels.create);

  // Retrieve all Channels
  router.get("/", channels.findAll);

  // Retrieve all published Channels
  router.get("/published", channels.findAllPublished);

  // Retrieve a single Channel with id
  router.get("/:id", channels.findOne);

  // Update a Channel with id
  router.put("/:id", channels.update);

  // Delete a Channel with id
  router.delete("/:id", channels.delete);

  // Delete all Channels
  router.delete("/", channels.deleteAll);

  app.use('/api/channels', router);




## Project setup
```
npm install
```

### Run
```
node server.js
```
# imediaport
