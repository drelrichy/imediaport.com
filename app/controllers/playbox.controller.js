var express = require('express');
var app = express();
const db = require("../models");
const programModel = require("../models/program.model");
const playtime = require("../lib/playtime.lib");
//const ytube= require("../lib/ytube2.lib");
//const pb = require("../lib/playbox.lib");
const Program = db.programs;
const Op = db.Sequelize.Op;

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file
// index page
app.get('/', function(req, res) {
    res.render('public/index');
  });

// Retrieve all Channels from the database.

exports.playByChannel_id= (req, res) =>{
    const channel_id = req.params.channel_id;
    var condition = channel_id? { channel_id: { [Op.like]: `%${channel_id}%` } } : null;

    res.status(200).send({
        message:`Welcome to ${channel_id}  at ${visit.clock} seconds uptime `});


}





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
  