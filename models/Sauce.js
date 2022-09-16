const mongoose = require('mongoose');

/*
* Objectif => Créate model of sauces 
*/

// model of sauces.
const sauceSchema = mongoose.Schema({
  userId: {type: mongoose.Types.ObjectId, ref: "User"},
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default:0},
  dislikes: { type: Number, required: false, default:0},
  usersLiked: { type: [String], required: false},
  usersDisliked: { type: [String], required: false}  
});

module.exports = mongoose.model('Sauce', sauceSchema);