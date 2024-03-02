const mongoose = require("mongoose");

 
 

//const URI = 'mongodb://root:atPassat2020@localhost:27017/imediaport?authSource=admin';
//const URI = 'mongodb+srv://root:atPassat2020@imediaport.jkvjx6q.mongodb.net/imediaport?authSource=admin';
const URI = 'mongodb+srv://root:atPassat2020@imediaport.jkvjx6q.mongodb.net/imediax?authSource=admin';
mongoose.connect(URI  , { useNewUrlParser: true ,  useUnifiedTopology: true});


mongoose.connection.on('connected',(message)=>{
	console.log("Mongoose now is Connected ==================!!!", message);
}).catch((error)=>{
	console.log("Mongoose not Connected ==================!!!", error);

});
 
