
module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedule", {
    id: {
      type: Sequelize.SMALLINT, primaryKey: true
    },
    channel_name: {
        type: Sequelize.STRING,
      },
    channel_id: {
      type: Sequelize.STRING,
    },
   
    channel_info: {
      type: Sequelize.STRING,
    },
    net_id: {
      type: Sequelize.SMALLINT,
    },
    session_index_id: {
      type: Sequelize.SMALLINT,
    },
    day: {
      type: Sequelize.STRING,
    },
    date: {
      type: Sequelize.STRING,
    },
    start_time: {
      type: Sequelize.SMALLINT,
    },
    play_durtion: {
      type: Sequelize.SMALLINT,
    },
     schedulelist: {
      type: Sequelize.STRING,
    }, 
     published: {
        type: Sequelize.BOOLEAN
      }, 
      active: {
        type: Sequelize.BOOLEAN
      }

  });

  return Schedule;
};

/*
schedule_id
channel_name
channel_id
channel_info
net_id
session_index_id
day
date
start_time
play_durtion
schedulelist
published
active

*/



/*
module.exports = (sequelize, Sequelize) => {
  const Schedule = sequelize.define("schedules", {
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