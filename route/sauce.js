const express = require('express');
// import auth for road's secure
const auth = require('../middleware/auth');
// import multer for image's gestion
const multer = require('../middleware/multer-config');
const router = express.Router();
const { sauceValidator, validate } = require('../middleware/sauce-validator');
const Joi = require('joi');



/*
* Objectif => define a router for the differente requete's methodes.
*/

const sauce = require('../controllers/sauce');


const customMulter = (req, res, next) => {
    multer(req, res, function(err) {
        if (req.body.image === '') {
            res.status(400).json({
                message: "no file included, file is required here"
            });
            return;
        }
        else if (err) {
            res.status(400).json({
                message: "bad request, check your input file"
            });
            return;
        }
        next();
    }) 
};



router.post('/', sauceValidator, validate, auth, customMulter, sauce.createSauce);
router.put('/:id', auth, customMulter, sauce.modifySauce);
router.delete('/:id', auth, sauce.deleteSauce)
router.get('/:id', auth, sauce.getOneSauce);
router.get('/', auth, sauce.getAllSauce);
router.post('/:id/like', auth, sauce.likeSauce);

module.exports = router;