//logger = require('basic-logger'),
//logger.setLevel('info')
logger = require('basic-logger');
logger.setLevel('info');

var visit={
    count:0,
    clock:0,
    detail:{},
    request:""
  }

  var customConfig = {
    showMillis: true,
    showTimestamp: true
    }
  //logger = require('basic-logger'),
//logger.setLevel('info')



module.exports = new logger(customConfig);

module.exports =  visit;

