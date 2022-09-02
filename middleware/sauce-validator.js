const { check, validationResult } = require("express-validator");
exports.sauceValidator = [
    check("name").isLength({ min:2, max:30}).isEmpty().withMessage("Le nom doit avoir entre 2 et 30 caracteres"),
    check("manufacturer").isLength({ min:2, max:30}).isEmpty().withMessage("Le manufacturer doit avoir entre 2 et 30 caracteres"),
    check("description").isLength({ min:5, max:300}).isEmpty().withMessage("Le description doit avoir entre 5 et 300 caracteres"),
    check("mainPepper").isLength({ min:2, max:30}).isEmpty().withMessage("Le mainPepper doit avoir entre 2 et 30 caracteres"),
];

exports.validate = (req, res, next) => {
    const error = validationResult(req).array();
    console.log(error);

    next()
}



