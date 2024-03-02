module.exports = (sequelize, Sequelize) => {
  const Channel = sequelize.define("channel", {

  
    id :{
      type: Sequelize.SMALLINT
    },		
	channel_id: {
		type:Sequelize.STRING
    }, 	 
	cNumber:{
      type: Sequelize.SMALLINT
    },				 
	cid: {
      type: Sequelize.STRING
    }, 
	cFname: {
      type: Sequelize.STRING
    },  
	cInfo: {
      type: Sequelize.STRING
    },  
	streamUrl: {
      type: Sequelize.STRING
    },  
	streamUrlType: {
      type: Sequelize.STRING
    },  
	streamUrlMore: {
      type: Sequelize.STRING
    }, 	 
	logoUrl: {
      type: Sequelize.STRING
    },  
	thumbUrl: {
      type: Sequelize.STRING
    }, 	 
	cmemo: {
      type: Sequelize.STRING
    }, 	 
	country: {
      type: Sequelize.STRING
    },  
	ctype: {
      type: Sequelize.STRING
    }, 	 
	ckeyword: {
      type: Sequelize.STRING
    }, 	 
	status: {
      type: Sequelize.STRING
    },  
	cbrand: {
      type: Sequelize.STRING
    },  
	timeZone	: {
      type: Sequelize.SMALLINT
    },			 
	StationStartTime	: {
		type: Sequelize.TIME
	  },						 
	StationDurationTime	: {
		type: Sequelize.TIME
	  },				 
	createdAt: {
		type: Sequelize.TIME
	  },

	updatedAt: {
		type: Sequelize.TIME
	  },	



  });
  

  return Channel;
};



