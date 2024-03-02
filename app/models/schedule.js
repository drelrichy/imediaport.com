const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
channel_id: {
type : String,
default :"",
	},
channel_info: {
type : Object,

	},
	schedule_id: {
		type : String,
		unique: true,
		},
		name: {
			type : String,
			unique: true,
			},
	index: {
type : Object,

	},
list : [{
	type : Object,
		
		}],
day: {
 type : String,
 default:'loop'
	},
date: {
		type : Date,
		default : Date.now
	  
	  },
user: {
		type :String,
	},
type: {
type : String,

}
,
created_at : {
type : Date,
 default : Date.now
},
updated_at : {
type : Date,
 default : Date.now
}
});

module.exports = mongoose.model('schedules',scheduleSchema);

//  `day`  ENUM( `monday` , `tuesday` , `wednesday` , `thursday` , `friday` , `saturday`, `sunday`, `holiday` , `everyday` , `special_day` , `anyday` , `someday` , `everyday_odd` , `everyday_even`) NOT NULL DEFAULT `everyday`,loop