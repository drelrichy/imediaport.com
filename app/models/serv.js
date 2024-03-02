const mongoose = require('mongoose');
//const passportLocalMongoose = require("passport-local-mongoose");


const servSchema = new mongoose.Schema({
	channel_name : {
		type : String,
		default :"",
	},
	admin_roles : {
		type : Array,
	},
	activity : [{
		type : Object,
	

	}],
	source : [{
		type : Object,
	

	}],
	work : {
		type : Object,
		default :{channel_id:'new',playlist:'', searchlist:'',library:'', epg:'',source:{}},

	},
	logo : {
		type : String,
		required : true,
		default:"https://imediaport.com/assets/img/logo_hold.png",
	},
	station_start_time : {
		type : Number,
		default :21600
	},
	station_duration_time : {
		type : Number,
		default :21600
	},
email : {
		type : String,
		required : true,
	},
serv_audio : {
	type : Boolean,
		default :false,

	},
	serv_video : {
		type : String,
		default :"",

	},
	serv_port : {
		type : Boolean,
		default :false,

	},
	serv_radio: {
		type : Boolean,
		default :false,

	},
	serv_tv : {
		type : Boolean,
		default :false,

	},
	channel_info : {
		type : String,
		default :"",

	},
	cbrand : {
		type : String,
		default :"none",

	},
thumbnail : {
		type : String,
	
		default :"",

	},
address : {
		type : String,
	},
telephone : {
			type : String,
		},
		contact_email : {
				type : String,
			},
	channel_id : {
		type : String,
		required : true,
	},
	admin_role : {
		type : Array,
		required : true
	},	
	name : {
		type : String
	
	},
	Work_playlist: {
		type : Object
	
	},
	playlists : [{
		type : Object,
	
	}],
country : {
		type : String,
		required : true,
	},
state : {
		type : String,
	
	},
city : {
		type : String,
	
	},
timezone : {
		type : String,
		default :"UTC",
		required : true,
	},
	owner : {
		type : String,
		required : true,
	},
	payed : {
		type : String,
		required : true,
	},
	active : {
		type : String,
		default :false,
		required : true,
	},
	server_tv: {
		type : String,

	},
	server_radio : {
		type : String,
	
	},
	server_audio_cast : {
		type : String,

	},
	server_video_cast : {
		type : String,

	},
	payed : {
		type : String,

	},

	admin2: {
		type : String,

	},
role2 : {
		type : String,
	
	},
admin3 : {
		type : String,

	},
role3: {
		type : String,
	
	},
	created_at : {
		type : Date,
		default : Date.now
	},
	updated_at : {
		type : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('servs',servSchema);

// In EmployeeDB, A table was Creaed with name user & these attributes that was given above