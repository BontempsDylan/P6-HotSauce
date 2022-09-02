const express = require('express');
const { body, validationResult } = require('express-validator');

const userCtrl = require('../controllers/user');
// const email = require('../middleware/email-validator');
// const password = require('../middleware/password-validator')

const router = express.Router();

/*
* Objectif => define a router for the differente requete's methodes.
*/

// router.post('/signup', password, email, userCtrl.signup);
router.post(
    '/signup', 
    body('password')
        .isLength({ min: 5, max: 20 })
        .withMessage("votre mot de passe doit contenir min 5 caractères et maximum 20 caractères")
        .trim()
        .matches(/[!@#%^&*_+\-:?~]/)
        .withMessage("votre mot de passe doit contenir au moins un symbole parmi !@#%^&*_+\-:?~")
        .matches(/\d{2,}/)
        .withMessage("votre mot de passe doit contenir au moins 2 chiffres")
        .escape(),
    body('password').custom(pwd => {
        const validated = pwd.toLowerCase() !== pwd && pwd.toUpperCase() !== pwd;
        if (!validated) {
            throw new Error("votre mot de passe doit contenir au moins une lettre en minuscule et au moins une lettre en majuscule");
        } else {
            return true;
        }
    }),
    body('email').isEmail(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        } else {
            next();
        }
    },
    userCtrl.signup
);
// TODO minimal validation here
router.post('/login', userCtrl.login);

module.exports = router;