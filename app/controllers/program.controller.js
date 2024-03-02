
const db = require("../models");
const programModel = require("../models/program.model");
const Program = db.programs;
const Op = db.Sequelize.Op;


exports.createbulk = (req, res) => {
// Validate request
  if (!req.body) {
    res.status(200).send({
      message: "Content can not be empty!"
    });
 // return;
  } 

console.log("====================== Create all records =============");

var st =0;
var   longmessage="";
 
const dprograms = req.body
//console.log(dprograms);
  // Save Program in the database
  dprograms.forEach(program => {

    Program.create(program)
    .then(response => {
      
      longmessage =  longmessage + response.data;
      st=1;
      console.log(response);
    })
    .catch(err => {
   console.log(err);
      longmessage =  longmessage + err;
      st=0;
    });

    
  });


    res.status(200).send({
        message: longmessage , status: st
      }); 
  



}




// find all Program by Channel id
exports.findByChannel_id = (req, res) => {

const channel_id = req.params.channel_id;

console.log("we want ..."+channel_id);
Program.findAll({ where: {channel_id: channel_id} })
    .then(data => {
      res.status(200) ;
       res.send(data);
    })
    .catch(error => {
      res.status(200).send({
        message:
          error.message || `Some error occurred while retrieving Programs for channel ${channel_id}. `
      });
    });
};



 
exports.createbulkifnew = (req, res) => {

 



  // Validate request
  if (!req.body) {


    res.status(200).send({
      message: "Content can not be empty!"

    });

  

   // return;
  } 


const  sendxx = {channel_id: 'onetv', listname: 'open', program_name: 'one tv breaker III', video_id: 'H_H91h6-j9o', video_title: 'one tv breaker III', description: '',
  duration: 51,
  play_at: 0,
  play_index: 0,
  video_asset_type: 'youtube',
  thumb_url: 'https://i.ytimg.com/vi/H_H91h6-j9o/default.jpg',
  start: 0,
  stop: 0}




var st =0;
var   longmessage="";
 
const allPrograms = req.body
 
//console.log(dprograms);

  // Save Program in the database
  console.log("====================== Create if really new recordss =============");

  allPrograms.forEach(program => {

    Program.findOne({ where: { channel_id: `${program.channel_id}`, video_id:`${program.video_id}`} })
.then(project=>{ 
  
  console.log("===> |"+project+"|");
  if (project== null) {
 
  Program.create(program) 
  .then(data => {   console.log(data) ;  });


} else {



}});


//console.log(program );

  // let conditions = { where: { play_index:`${program.play_index}` }, defaults: { play_index:`${program.play_index}` , duration:`${program.duration}` , play_at: `${program.play_at}` , channel_id:`${program.channel_id}`, video_id:` ${program.video_id}` } };
  //et conditions =  { where: { play_index:`${program.play_index}`, duration:`${program.duration}` , play_at: `${program.play_at}` , channel_id:`${program.channel_id}`, video_id:` ${program.video_id}` }, defaults:`${program}` }  ;

  // console.log(conditions);

  
 
//end of for each

  });

  


//end function
}



function NoDuplicate (program) {

  var feedback = false;

Program.findOne({ where: { channel_id: `${program.play_index}`, video_id:`${program.video_id}`} })
.then(project=>{  if (project == null) {
 



} else {



}});



}









const checkNew = (program)=>{
     
 
 // Program.findAll( { where: { play_index:` ${program.play_index}` , play_at: ` ${program.play_at}` , channel_id:`${program.channel_id}`, video_id:` ${program.video_id}` } } )
   
 tx = Program.findAll( { where: { play_index:` ${program.play_index}` } } )
   

  .then( result => {

 
         
console.log( "=====================feeding us back 001 =========================");
     
console.log(result.length)
console.log(result)
     
//console.log(result.message);
if (result==[]){
  st=1;
console.log("   ------------------ its is  go ---------------------");

  //result.length
 // console.log( "can add it");
  return true;


} else {
      st=0;

      console.log("=====================feed wahala dey  =========================");
      

        message = ` cant addd --- Program ${program.video_id} is already in ${program.channel_id} channel_id=${program.video_id}. is here already with you cn add it manually if u still want it`;
       console.log(message);
   //console.log(data );
        return false
      }
      } ).catch(err => {

        console.log("=====================feed back error =========================");
       
        console.log(err)

        st=1 ;
      return false

    

    });


    return false;
};





// Create and Save a new Program
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Program
  const program = {
    id: req.body.id,
    channel_info: req.body.channel_info,
    published: req.body.published ? req.body.published : false
  };

  // Save Program in the database
  Program.create(program)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Program."
      });
    });



};

// Retrieve all Programs from the database.
exports.findAll = (req, res) => {
  const id = req.query.id;

  var condition = id ? { title: { [Op.like]: `%${id}%` } } : null;


  Program.findAll({ 
    
    where: condition
 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Programs."
      });
    });
};


// Retrieve all Programs from the database.


exports.findByCid = (req, res) => {

  var ohost = req.get('host');
  console.log(ohost);
  var oorigin = req.get('origin');
  console.log("oorigin ="+oorigin );

    const channel_id = req.paams.cid;
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

    Program.findAll ( { where: { channel_id:`${channel_id}`} } )
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Programs by CID."
      });
    });

  


} else {

    Program.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Programs by CID."
        });
      });
 
    }
 
 
    };
  



// Find a single Program with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Program.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Program with channel_id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Program with Channel_id=" + id
      });
    });
};

// Update a Program by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Program.update(req.body, {
    where: { id: id}
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Program was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Program with id=${id}. Maybe Program was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Program with id=" + id
      });
    });
};

// Delete a Program with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Program.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Program was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Program with id=${id}. Maybe Program was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Program with id=" + id
      });
    });
};

// Delete all Programs from the database.
exports.deleteAll = (req, res) => {
  Program.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Programs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Programs."
      });
    });
};



// find all published Program
exports.findAllPublished = (req, res) => {
  Program.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Programs."
      });
    });
};

exports.findAllActive = (req, res) => {
    Program.findAll({ where: { active: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Programs."
        });
      });
  };
 /* 
 
 */