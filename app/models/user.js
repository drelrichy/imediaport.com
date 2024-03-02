const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT Package
const { constant } = require('async');
const userSchema = new mongoose.Schema({
	username : {
		type : String,
		required : true,
		min: 5
	},	name : {
		type : String,
		required : true,
		min: 5
	},
	surname : {
		type : String,
		
	},
		role : {
		type : String,
		required : true,
	},
	hostname : [{
		type : [String],
		required : true,
	}],
	adminchannel : {
		type : [Object]
	}
	,
	adminindex: {
		type : String
	
	},
	file : {
		type : String,
		required : false,
		max : 500,
		min : 6
	},
	password : {
		type : String,
		required : true,
		max : 200,
		min : 6
	},
	resetPasswordToken: String,
    resetPasswordExpires: Date,
    active : { type : Boolean,required:true , default:false},
    Subscribed : { type : Boolean,required:true , default:false},
    temporary : String,
	date : {
		type : Date,
		default : Date.now
	}
});


userSchema.pre('save', function(next) {



    const user = this;
 //temporarytoken = jwt.sign({ id: user._id }, 'shhhhh', { expiresIn: '24h' }); 
 //user.temporary = temporarytoken ;


	//console.log(" its is here =>",user);

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {

		console.log("The salt is", salt);
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash) {

		console.log("The hash is", hash);
            if (err) return next(err);
            user.password = hash;
            next();
        });

		return next();
    });


});


userSchema.methods.comparePassword = function(candidatePassword, callback) {
	//console.log(" its is here =>",user);
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};

userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('users',userSchema);

// In EmployeeDB, A table was Creaed with name user & these attributes that was given above