const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

/*
* Objectif => Créate model of user. 
*/

// model of sauces.
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: false},
    password: { type: String, required: true}
});

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema);