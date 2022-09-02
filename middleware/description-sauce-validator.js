// import password-validator
const descriptionSauceValidator = require("password-validator");

/*
 * Objectif => creat a schema for description sauce validator
 */
const descriptionSauceValidatorSchema = new descriptionSauceValidator();

// The schema that the validator must follow
descriptionSauceValidatorSchema
// Minimum length 7
.is().min(10, 'Le nom de la sauce doit contenir minimum 10 caractères')  
// Maimum length 20                                 
.is().max(150, 'Le nom de la sauce doit contenir maximum 150 caractères') 
                                


module.exports = (req, res, next) => {
    if (descriptionSauceValidatorSchema.validate(req.body.description)) {
        next();
    } else {
        res.status(400).json({error : `L'un des champs est mal rempli ${descriptionSauceValidatorSchema.validate('req.body.description', { list: true, details: true})}`});
    }
}