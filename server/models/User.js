const mongoose = require('mongoose');
//The line under is <=> to const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String, 
    credits: { type : Number, default : 0 }  
});

mongoose.model('users', userSchema);