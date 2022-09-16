// Package file system for modify the system of data for delete function.
const fs = require('fs');
// import of model's sauces.
const Sauce = require('../models/Sauce');
const { json } = require('express');
require('dotenv').config();

/*
 * objectif => create sauce with the model of sauce.
 */

exports.createSauce = (req, res, next) => {
    const sauceObject = req.body;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    
    sauce.save()
      .then(() => { res.status(201).json({ sauce })})
      .catch(error => { res.status(400).json({ error })});
    
};

/*
 * objectif => modify sauce.
 */

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
      ...json.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }

    delete sauceObject._userId
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
          Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
          .then(() => res.status(200).json({message: 'Objet modifié!'}))
          .catch(error => res.status(401).json({ error }));       
      })
      .catch(error => res.status(400).json({ error }));
}

/*
 * objectif => delete one sauce.
 */

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
      .then(sauce => {
          const filename = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({_id: req.params.id})
              .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
              .catch(error => res.status(401).json({ error }));
          });
        })     
}

/*
 * objectif => get one sauce.
 */

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => res.status(200).json(sauce))
      .catch(error => res.status(404).json({ error }));
}

/*
 * objective => get all sauces.
 */

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then((sauces) => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }));
}

/*
* Objectif => liked sauce 
*/

exports.likeSauce = (req, res, next) => {
  switch (req.body.like) {
    //likes = 0 to cancel the like or dislike.
    //uptade the sauce, send message/error
    case 0:
      Sauce.findOne({ _id: req.params.id})
        .then((sauce) =>{
          if (sauce.usersLiked.find(user => user === req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id}, {
              $inc: { likes: -1 },
              $pull: { usersLiked: req.body.userId},
              _id: req.params.id
            })
            .then(() => { res.status(200).json({ message: "Votre avis sur la sauce a été pris en compte." });})
            .catch((error) => { res.status(400).json({ error: error });});
          } if (sauce.usersDisliked.find(user => user === req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, {
              $inc: { dislikes: -1 },
              $pull: { usersDisliked: req.body.userId },
              _id: req.params.id
            })
              .then(() => { res.status(201).json({ message: "Votre avis sur la sauce a été pris en compte." }); })
              .catch((error) => { res.status(400).json({ error: error }); });
          } else {
            return res.status(404).json({ message: "Vous n'avez pas encore like ou dislike cette sauce." })
          }
        })
        .catch((error) => { res.status(404).json({ error: error });});
        break;
    //likes = 1 for liked sauce.
    //uptade the sauce, send message/error    
    case 1:
      Sauce.findOne({ _id: req.params.id})
        .then((sauce) =>{
          Sauce.findOne({ _id: req.params.id})       
            if (sauce.usersLiked.find(user => user === req.body.userId)) {
              return res.status(404).json({ message: "Vous avez déjà like cette sauce."})
            } else {
              Sauce.updateOne({ _id: req.params.id }, {
                $inc: { likes: 1 },
                $push: { usersLiked: req.body.userId },
                _id: req.params.id
              })
              .then(() => { res.status(201).json({ message: "Votre like a été pris en compte!" }); })
              .catch((error) => { res.status(400).json({ error: error }); });
            }
        })
        .catch((error) => { res.status(404).json({ error: error });
        });        
      break;
    //likes = -1 for disliked sauce.
    //uptade the sauce, send message/error
    case -1:
      Sauce.findOne({ _id: req.params.id})
        .then((sauce) =>{
          Sauce.findOne({ _id: req.params.id})       
            if (sauce.usersDisliked.find(user => user === req.body.userId)) {
              return res.status(404).json({ message: "Vous avez déjà dislike cette sauce."})
            } else {
              Sauce.updateOne({ _id: req.params.id }, {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: req.body.userId },
                _id: req.params.id
              })
                .then(() => { res.status(201).json({ message: "Votre dislike a été pris en compte." }); })
                .catch((error) => { res.status(400).json({ error: error }); });
            }
        })
        .catch((error) => { res.status(404).json({ error: error });});
      break;
    default:
      console.error("not today : mauvaise requête");
  }
};
