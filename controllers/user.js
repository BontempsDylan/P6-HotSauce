require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const {sendServerErrorResponse, sendUnauthorizedResponse} = require("./../error-handlers");

/*
* Objectif => Create account. 
*/
exports.signup = (req, res, next) => {
  
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({ error }));   
        })
        .catch(error => res.status(500).json({ error }));
    
};

/*
* Objective => allow account login. 
*/
exports.login = async (req, res, next) => {
    let user;

    try {
        user = await User.findOne({email: req.body.email});
    } catch(error) {
        sendServerErrorResponse(res);
        return;
    }

    if(user === null) {
        res.status(404).json({message: "utilisateur non trouvé"});
        return;
    } 

    try {
        const passwordComparisonIsValid = await bcrypt.compare(req.body.password, user.password);
        if(!passwordComparisonIsValid) {
            sendUnauthorizedResponse(res);
        } else {
            res.status(200).json({
                userId: user._id,
                token: jwt.sign(
                    { userId: user._id},
                    process.env.SECRET_TOKEN,
                    { expiresIn: '24h'}
                )
            });
        }
    } catch(error) {
        console.error(error);
        console.error("BCRYPT COMPARE ERROR");
        sendServerErrorResponse(res);
    }
};