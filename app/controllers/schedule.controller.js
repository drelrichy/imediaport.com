
const db = require("../models");
const Schedule = db.schedules;
const Op = db.Sequelize.Op;

// Create and Save a new Schedule
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Schedule
  const schedule = {
    id: req.body.id,
    channel_info: req.body.channel_info,
    published: req.body.published ? req.body.published : false
  };

  // Save Schedule in the database
  Schedule.create(schedule)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Schedule."
      });
    });
};

// Retrieve all Schedules from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;

  var condition = id ? { title: { [Op.like]: `%${id}%` } } : null;


  Schedule.findAll({ 
    
    where: condition
 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Schedules."
      });
    });
};


// Retrieve all Schedules from the database.


exports.findByCid = (req, res) => {

  var ohost = req.get('host');
  console.log(ohost);
  var oorigin = req.get('origin');
  console.log("oorigin ="+oorigin );

    const channel_id = req.params.cid;
    var condition = channel_id ? { channel_id : channel_id  } : null;
    //const bchannel_id = req.body.cid;

    console.log('channel_id='+channel_id);
    //console.log('bchannel_id '+bchannel_id );
  
    //var condition = channel_id ? { channel_id: { [Op.like]: `%${channel_id}%` } } : null;
   
    //var condition = channel_id ? { where: {channel_id { [Op.like]: `%${channel_id}%` } } : null;
    //where: condition
  console.log("condition = "+JSON.stringify(condition));

    console.log('channel_id='+channel_id);

if(channel_id){

    Schedule.findAll ( { where: { channel_id:`${channel_id}`} } )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Schedules by CID."
      });
    });

  


} else {

    Schedule.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Schedules by CID."
        });
      });
 
    }
 
 
    };
  




// Find a single Schedule with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Schedule.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Schedule with channel_id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Schedule with Channel_id=" + id
      });
    });
};

// Update a Schedule by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Schedule.update(req.body, {
    where: { id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Schedule was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Schedule with id=${id}. Maybe Schedule was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Schedule with id=" + id
      });
    });
};

// Delete a Schedule with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Schedule.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Schedule was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Schedule with id=${id}. Maybe Schedule was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Schedule with id=" + id
      });
    });
};

// Delete all Schedules from the database.
exports.deleteAll = (req, res) => {
  Schedule.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Schedules were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Schedules."
      });
    });
};

// find all published Schedule
exports.findAllPublished = (req, res) => {
  Schedule.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Schedules."
      });
    });
};

exports.findAllActive = (req, res) => {
    Schedule.findAll({ where: { active: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Schedules."
        });
      });
  };
 /* 
 
 */