const express = require('express');
// import auth for road's secure.
const auth = require('../middleware/auth');
// import multer for image's gestion.
const multer = require('../middleware/multer-config');
// import express-validator for validate all writing fields.
const { body } = require('express-validator');
const { finalValidation } = require('../middleware/final-validation')


const router = express.Router();

const sauce = require('../controllers/sauce');


// costum multer to handle errors.
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

/*
* Objectif => define a router and middleware for the differente requete's methodes.
*/

router.post(
    '/',
    auth, 
    customMulter,
    (req, res, next) => {
        req.body = JSON.parse(req.body.sauce);
        next();
    },
    body('name')
        .isLength({ min: 2, max: 20 })
        .withMessage("Le nom doit contenir min 2 caractères et maximum 20 caractères")
        .not().isEmpty()
        .withMessage("Le nom ne doit pas être vide.")
        .escape(),
    body('manufacturer')
        .isLength({ min: 2, max: 20 })
        .withMessage("Manufacturer doit contenir min 2 caractères et maximum 20 caractères")
        .not().isEmpty()
        .withMessage("Manufacturer ne doit pas être vide.")
        .escape(),
    body('description')
        .isLength({ min: 5, max: 300 })
        .withMessage("La description doit contenir min 5 caractères et maximum 20 caractères")
        .not().isEmpty()
        .withMessage("La description ne doit pas être vide.")
        .escape(),
    body('mainPepper')
        .isLength({ min: 2, max: 20 })
        .withMessage("MainPepper doit contenir min 2 caractères et maximum 20 caractères")
        .not().isEmpty()
        .withMessage("MainPepper ne doit pas être vide.")
        .escape(),    
    finalValidation,
    sauce.createSauce
    );
router.put(
    '/:id', 
    auth, 
    customMulter,
    body('name')
        .isLength({ min: 2, max: 20 })
        .withMessage("Le nom doit contenir min 2 caractères et maximum 20 caractères")
        .not().isEmpty()
        .withMessage("Le nom ne doit pas être vide.")
        .escape(),
    body('manufacturer')
        .isLength({ min: 2, max: 20 })
        .withMessage("Manufacturer doit contenir min 2 caractères et maximum 20 caractères")
        .not().isEmpty()
        .withMessage("Manufacturer ne doit pas être vide.")
        .escape(),
    body('description')
        .isLength({ min: 5, max: 300 })
        .withMessage("La description doit contenir min 5 caractères et maximum 20 caractères")
        .not().isEmpty()
        .withMessage("La description ne doit pas être vide.")
        .escape(),
    body('mainPepper')
        .isLength({ min: 2, max: 20 })
        .withMessage("MainPepper doit contenir min 2 caractères et maximum 20 caractères")
        .not().isEmpty()
        .withMessage("MainPepper ne doit pas être vide.")
        .escape(),    
    finalValidation, 
    sauce.modifySauce
    );
router.delete('/:id', auth, sauce.deleteSauce)
router.get('/:id', auth, sauce.getOneSauce);
router.get('/', auth, sauce.getAllSauce);
router.post('/:id/like', auth, sauce.likeSauce);

module.exports = router;