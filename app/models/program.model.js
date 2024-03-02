
//const { Sequelize, DataTypes, Model } 


module.exports = (sequelize, Sequelize ) => {
  const Program = sequelize.define("programs", {
    program_id: {
      type: Sequelize.SMALLINT, primaryKey: true
    },
    program_name: {
        type: Sequelize.STRING,
      },
    channel_id: {
      type: Sequelize.STRING,
    },
   
   video_id: {
      type: Sequelize.STRING,
    },
    playday: {
      type: Sequelize.STRING,
    },
    play_date: {
      type: Sequelize.DATE,
    },
    listname: {
      type: Sequelize.STRING,
    },
    thumb_url: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    net_id: {
      type: Sequelize.SMALLINT,
    },
    play_at: {
      type: Sequelize.SMALLINT,
    },
    play_index: {
      type: Sequelize.SMALLINT,
    },
    playday: {
      type: Sequelize.ENUM('monday', 'tuesday' , 'wednesday' , 'thursday' , 'friday' , 'saturday', 'sunday', 'holiday' , 'everyday' , 'speacial_day' , 'anyday' , 'someday' , 'everyday_odd' , 'everyday_even'),
    },
    play_date: {
      type: Sequelize.DATE,
    },
    start: {
      type: Sequelize.SMALLINT,
    },
    stop: {
      type: Sequelize.SMALLINT,
    },
   duration: {
      type: Sequelize.SMALLINT,
    },
    	video_asset_type: {
      type: Sequelize.ENUM('youtube','mp4','m3u8','facebook','custom'),
    }, 
    video_title: {
      type: Sequelize.STRING,
    }, 
     published: {
        type: Sequelize.BOOLEAN
      }, 
      active: {
        type: Sequelize.BOOLEAN
      }

  });

  return Program;
};

/*


program_id
‭int‬
net_id
channel_id
play_at
play_index
program_name
description
duration
start
stop
video_id
video_title
video_asset_type
thumb_url
published
createdAt
updatedAt
active


channel_name
channel_id
channel_info
net_id
session_index_id
day
date
start_time
play_durtion
programlist
published
active

*/



/*
module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("programs", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Schedule;
};


*/