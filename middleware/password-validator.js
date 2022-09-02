// import password-validator
const passwordValidator = require("password-validator");

/*
 * Objectif => creat a schema for password validator
 */
const passwordSchema = new passwordValidator();

// The schema that the validator must follow 
passwordSchema
// Minimum length 7
.is().min(7, 'Le mot de passe doit contenir minimum 7 caractères')  
// Maimum length 20                                 
.is().max(20, 'Le mot de passe doit contenir maximum 20 caractères') 
// Must have uppercase letter                                 
.has().uppercase() 
// Must have lowercase letter                            
.has().lowercase()    
// Must have at lest 2 digit                         
.has().digits(2, 'Le mot de passe doit contenir minimum 2 chiffres') 
// Should not have symbols
.has().symbols(1, 'Le mot de passe doit contenir minimum 1 chiffres')   
// Should not have spaces                           
.has().not().spaces()    
// Blacklist these values                      
.is().not().oneOf(['Passw0rd', 'Password123']) 

// V
module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        // TODO préciser dans le message les règles de validation du password
        return res.status(400).json({error : `Le mot de passe n'est pas assez fort...`});
    }
}

// TODO uninstall with => npm uninstall password-validator
