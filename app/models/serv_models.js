const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");


const servSchema = new mongoose.Schema({
	channel_name : {
		type : String,
		required : true,
	},
	logo_url : {
		type : String,
		required : true,
	},
	channel_id : {
		type : String,
		required : true,
	},
	admin_role : {
		type : Array,
		required : true,
	},	name : {
		type : String,
		required : true,
	},
	imgname : {
		type : String,
		required : true,
	},
	Company : {
		type : String,
		required : true,
	},
	price : {
		type : String,
		required : true,
	},
	date : {
		type : Date,
		default : Date.now
	}
});
module.exports = mongoose.model('servs',servSchema);

// In EmployeeDB, A table was Creaed with name user & these attributes that was given above