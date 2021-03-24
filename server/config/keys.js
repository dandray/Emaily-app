//Keys.js - Figure out which set of keys to be used 
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}else{
    module.exports = require('./dev');
}
